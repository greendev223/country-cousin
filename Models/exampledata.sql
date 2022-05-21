TRUNCATE TABLE "Countries" RESTART IDENTITY;

INSERT INTO "Countries" ("Name", "PhotoUrl", "FlagUrl", "RecipeName", "RecipeUrl", "Movie", "MovieDescription", "Musician", "MusicianDescription")
VALUES ('Bolivia', 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/01/shutterstock_276872759-e1516063096495.jpg', 'https://www.worldatlas.com/r/w960-q80/img/flag/bo-flag.jpg',
'Picante de Pollo', 'https://boliviancookbook.com/2012/04/01/picante-de-pollo/', '')
    --  public int Id { get; set; }
    --     public string Name { get; set; }
    --     public string PhotoUrl { get; set; }
    --     public string FlagUrl { get; set; }
    --     public string RecipeName { get; set; }
    --     public string RecipeUrl { get; set; }
    --     public string Movie { get; set; }
    --     public string MovieDescription { get; set; }
    --     public string Musician { get; set; }
    --     public string MusicianDescription { get; set; }