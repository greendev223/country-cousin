TRUNCATE TABLE "Countries", "Recipes", "Movies", "Musics" RESTART IDENTITY;

INSERT INTO "Countries" ("DateAdded", "Name", "PhotoUrl", "FlagUrl")
VALUES ('2022-05-21 14:28:01', 'Bolivia', 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/01/shutterstock_276872759-e1516063096495.jpg', 'https://www.worldatlas.com/r/w960-q80/img/flag/bo-flag.jpg');

INSERT INTO "Recipes" ("DateAdded", "Name", "Url", "PhotoUrl", "Description", "CountryId")
VALUES ('2022-05-21 14:28:01', 'Picante de Pollo', 'https://boliviancookbook.com/2012/04/01/picante-de-pollo/', 'https://boliviancookbook.files.wordpress.com/2012/04/plato-2.jpg?w=450&h=600', 'Spicy sauce with chicken', 1);

INSERT INTO "Movies" ("DateAdded", "Title", "Description", "Url", "CountryId")
VALUES ('2022-05-21 14:28:01', 'Tu Me Manques', 'A father travels from Bolivia to New York City to confront his dead son''s boyfriend, and continues to find it difficult to confront his sexuality.', 'https://www.imdb.com/title/tt7144186/', 1);

INSERT INTO "Musics" ("DateAdded", "Artist", "Description", "Url", "CountryId")
VALUES ('2022-05-21 14:28:01', 'Zulma Yugar', 'Bolivian classical folk singer', 'https://open.spotify.com/artist/4P6BbGD4vPfePNs4iPKVcF?autoplay=true', 1);
