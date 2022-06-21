using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;


namespace CountryCuisine.Models
{
    public class User
    {
        
        public int Id {get; set;}

        [Required(ErrorMessage = "You must provide your first name. ")]
        public string FirstName {get; set; }

        [Required(ErrorMessage = "You must provide your email. ")]
        public string Email {get; set;}

        [JsonIgnore]
        public string HashedPassword {get; set;}
        public string PhotoUrl{get; set;}

        public List<Country> Countries {get; set;} 
        // public Country Country { get; set; }

        public string Password
        {
            set
            {
                this.HashedPassword = new PasswordHasher<User>().HashPassword(this, value);
            }
        }

        public bool IsValidPassword(string password)
        {
            var passwordVerification = new PasswordHasher<User>().VerifyHashedPassword(this, this.HashedPassword, password);
       
        return passwordVerification == PasswordVerificationResult.Success;
        }
    }
}