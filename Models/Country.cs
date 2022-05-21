using System;
using System.Collections.Generic;

namespace CountryCuisine.Models
{
    public class Country
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public string FlagUrl { get; set; }

        public List<Recipe> Recipes { get; set; }
        public List<Movie> Movies { get; set; }
        public List<Music> Musics { get; set; }
    }
}