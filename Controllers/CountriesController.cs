using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CountryCuisine.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using CountryCuisine.Models;

namespace CountryCuisine.Controllers
{
    // All of these routes will be at the base URL:     /api/Countries
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case CountriesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public CountriesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Countries
        //
        // Returns a list of all your Countries
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries(string filter)
        {
            // Uses the database context in `_context` to request all of the Countries, sort
            // them by row id and return them as a JSON array.
            if (filter == null)
            {
                return await _context.Countries.OrderBy(row => row.Id).Include(country => country.Movies).Include(country => country.Musics).Include(country => country.Recipes).ToListAsync();
            }
            else
            {
                return await _context.Countries.OrderBy(row => row.Id).
                Where(country => country.Name.ToLower().Contains(filter.ToLower())).Include(country => country.Movies).Include(country => country.Musics).Include(country => country.Recipes).
                ToListAsync();
            }
        }

        // return await _context.Pets.OrderBy(row => row.Id).Include(pet => pet.Playtimes).Include(pet => pet.Feedings).Include(pet => pet.Scoldings).ToListAsync();

        // GET: api/Countries/5
        //
        // Fetches and returns a specific country by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetCountry(int id)
        {
            // Find the country in the database using `FindAsync` to look it up by id
            var country = await _context.Countries.
            Where(country => country.Id == id)
            .Include(country => country.Musics)
            .Include(country => country.Recipes)
            .Include(country => country.Movies).FirstOrDefaultAsync();
            

            // If we didn't find anything, we receive a `null` in return
            if (country == null)
            {
                // Return a `404` response to the client indicating we could not find a country with this id
                return NotFound();
            }

            //  Return the country as a JSON object.
            return country;
        }

        // PUT: api/Countries/5
        //
        // Update an individual country with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Country
        // variable named country. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Country POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCountry(int id, Country country)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != country.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in country to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from country
            _context.Entry(country).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!CountryExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(country);
        }

        // POST: api/Countries
        //
        // Creates a new country in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Country
        // variable named country. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Country POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Country>> PostCountry(Country country)
        {
            // Set the UserID to the current user id, this overrides anything the user specifies.
            country.UserId = GetCurrentUserId();

            // Indicate to the database context we want to add this new record
            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetCountry", new { id = country.Id }, country);
        }

        // DELETE: api/Countries/5
        //
        // Deletes an individual country with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            // Find this country by looking for the specific id
            var country = await _context.Countries.FindAsync(id);
            if (country == null)
            {
                // There wasn't a country with that id so return a `404` not found
                return NotFound();
            }

               if (country.UserId != GetCurrentUserId())
            {
                // Make a custom error response
                var response = new
                {
                    status = 401,
                    errors = new List<string>() { "You are not Authorized to delete this country!" }
                };

                // Return our error with the custom response
                return Unauthorized(response);
            }

            // Tell the database we want to remove this record
            _context.Countries.Remove(country);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(country);
        }

        [HttpPost("{id}/Recipes")]
        public async Task<ActionResult<Recipe>> CreateRecipeForCountry(int id, Recipe country)
        {
            {
                var recipeCountry = await _context.Countries.FindAsync(id);
                if (recipeCountry == null)
                {
                    return NotFound();
                }
                country.CountryId = recipeCountry.Id;

                _context.Recipes.Add(country);
                await _context.SaveChangesAsync();

                return Ok(country);
            }
        }

        [HttpPost("{id}/Movies")]
        public async Task<ActionResult<Movie>> CreateMovieForCountry(int id, Movie country)
        {
            {
                var movieCountry = await _context.Countries.FindAsync(id);
                if (movieCountry == null)
                {
                    return NotFound();
                }
                country.CountryId = movieCountry.Id;

                _context.Movies.Add(country);
                await _context.SaveChangesAsync();

                return Ok(country);
            }
        }

        [HttpPost("{id}/Musics")]
        public async Task<ActionResult<Music>> CreateMusicForCountry(int id, Music country)
        {
            {
                var musicCountry = await _context.Countries.FindAsync(id);
                if (musicCountry == null)
                {
                    return NotFound();
                }
                country.CountryId = musicCountry.Id;

                _context.Musics.Add(country);
                await _context.SaveChangesAsync();

                return Ok(country);
            }
        }

        // Private helper method that looks up an existing country by the supplied id
        private bool CountryExists(int id)
        {
            return _context.Countries.Any(country => country.Id == id);
        }
        
        // Private helper method to get the JWT claim related to the user ID
        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}
