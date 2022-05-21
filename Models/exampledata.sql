TRUNCATE TABLE "Countries" RESTART IDENTITY;

INSERT INTO "Countries" ("Name", "PhotoUrl", "FlagUrl", "RecipeName", "RecipeUrl", "Movie", "MovieDescription", "Musician", "MusicianDescription")
VALUES ('Bolivia', 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/01/shutterstock_276872759-e1516063096495.jpg', 'https://www.worldatlas.com/r/w960-q80/img/flag/bo-flag.jpg');

INSERT INTO "Recipes" ("Name", "Url", "PhotoUrl", "Description", "CountryId")
VALUES ('Picante de Pollo', 'https://boliviancookbook.com/2012/04/01/picante-de-pollo/', 'https://boliviancookbook.files.wordpress.com/2012/04/plato-2.jpg?w=450&h=600', "Spicy Sauce with chicken", 1);

INSERT INTO "Movies" ("Title", "Description", "Url", "CountryId")
VALUES ('Tu Me Manques', "A father travels from Bolivia to New York City to confront his dead son's boyfriend, and continues to find it difficult to confront his sexuality.", 'https://www.imdb.com/title/tt7144186/', 1);

INSERT INTO "Musics" ("Artist", "Description", "Url", "CountryId")
VALUES ('Zulma Yugar', "Bolivia’s most famous female classical folk singer, Zulma Yugar has received international recognition for her strong vocal range that swings between impossibly high and low notes, almost reminiscent of European opera. Born in Oruro in the 1950s, her songs mostly deal with love and broken relationships. She later went on to become Bolivia’s Minister of Culture and lobbied for UNESCO to recognize Oruro’s carnival as international cultural heritage.", 'https://open.spotify.com/artist/4P6BbGD4vPfePNs4iPKVcF?autoplay=true', 1);
