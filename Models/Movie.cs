using System;

namespace CountryCuisine.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string PhotoUrl {get; set;}

        public int CountryId { get; set; }

        public Country Country { get; set; }
    }
}