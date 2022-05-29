using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CountryCuisine.Models
{
    public class Country
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
       
       [Required(ErrorMessage = "You must provide a country name. ")]
        public string Name { get; set; }

       [Required(ErrorMessage = "You must provide a flag image url. ")]
        public string FlagUrl { get; set; }

        public List<Recipe> Recipes { get; set; }
        public List<Movie> Movies { get; set; }
        public List<Music> Musics { get; set; }
    }
}