using System;

namespace CountryCuisine.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public string Name { get; set; }
        public string Url { get; set; }

        public int CountryId { get; set; }

        public Country Country { get; set; }
    }
}