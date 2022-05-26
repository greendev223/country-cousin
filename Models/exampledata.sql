TRUNCATE TABLE "Countries", "Recipes", "Movies", "Musics" RESTART IDENTITY;

INSERT INTO "Countries" ("DateAdded", "Name", "PhotoUrl", "FlagUrl")
VALUES ('2022-05-21 14:28:01', 'Bolivia', 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/01/shutterstock_276872759-e1516063096495.jpg', 'https://www.worldatlas.com/r/w960-q80/img/flag/bo-flag.jpg');
INSERT INTO "Countries" ("DateAdded", "Name", "PhotoUrl", "FlagUrl")
VALUES ('2022-05-21 14:50:01', 'Denmark', 'https://www.commonwealthfund.org/sites/default/files/styles/countries_hero_desktop/public/country_image_Denmark.jpg?h=fa1c963e&itok=h7srHtpK', 'https://www.worldatlas.com/r/w960-q80/img/flag/dk-flag.jpg');
INSERT INTO "Countries" ("DateAdded", "Name", "PhotoUrl", "FlagUrl")
VALUES ('2022-05-21 15:18:01', 'Rwanda', 'https://deih43ym53wif.cloudfront.net/cityscape-things-to-do-in-kigali-rwanda_44e57bd0bf.jpeg', 'https://www.worldatlas.com/r/w960-q80/img/flag/rw-flag.jpg');
INSERT INTO "Countries" ("DateAdded", "Name", "PhotoUrl", "FlagUrl")
VALUES ('2022-05-24 14:15:01', 'Uzbekistan', 'https://cdn.britannica.com/01/137501-050-B02429E9/madrasa-Shirdar-Rigestan-Square-Samarkand-Uzbekistan.jpg?w=690&h=388&c=crop', 'https://www.worldatlas.com/r/w960-q80/img/flag/uz-flag.jpg');

INSERT INTO "Recipes" ("DateAdded", "Name", "Url", "PhotoUrl", "Description", "CountryId")
VALUES ('2022-05-21 14:28:01', 'Picante de Pollo', 'https://boliviancookbook.com/2012/04/01/picante-de-pollo/', 'https://boliviancookbook.files.wordpress.com/2012/04/plato-2.jpg?w=450&h=600', 'Spicy sauce with chicken', 1);
INSERT INTO "Recipes" ("DateAdded", "Name", "Url", "PhotoUrl", "Description", "CountryId")
VALUES ('2022-05-21 14:50:01', 'Vaniljekranse (Danish Butter Cookies)', 'https://nordicfoodliving.com/danish-butter-cookies-vaniljekranse/', 'https://nordicfoodliving.com/wp-content/uploads/2018/12/Recipe-for-Danish-Butter-Cookies-6-805x1024.jpg', 'Christmas butter cookie', 2);
INSERT INTO "Recipes" ("DateAdded", "Name", "Url", "PhotoUrl", "Description", "CountryId")
VALUES ('2022-05-21 15:18:01', 'Igisafuliya', 'https://togetherwomenrise.org/recipes/igisafuliya/', 'https://togetherwomenrise.org/wp-content/uploads/2019/06/RECIPE-Sustained-grantee-Igisafuliya.jpeg', 'A chicken stew with plantain, vegetables, and salt and pepper.', 3);
INSERT INTO "Recipes" ("DateAdded", "Name", "Url", "PhotoUrl", "Description", "CountryId")
VALUES ('2022-05-24 14:15:01', 'Plov', 'https://momsdish.com/recipe/222/uzbek-plov', 'https://cdn.momsdish.com/wp-content/uploads/2021/06/Uzbek-Plov-Recipe-03-1200x800.jpg', 'Plov is a very popular, historic Uzbek dish. Its made up of long grain rice, tender chunks of meat, onions, and carrots.', 4);

INSERT INTO "Movies" ("DateAdded", "Title", "Description", "Url", "PhotoUrl", "CountryId")
VALUES ('2022-05-21 14:28:01', 'Tu Me Manques', 'A father travels from Bolivia to New York City to confront his dead sons boyfriend, and continues to find it difficult to confront his sexuality.', 'https://www.imdb.com/title/tt7144186/', 'https://imgsrc.cineserie.com/2019/07/1756177.jpg?ver=1', 1);
INSERT INTO "Movies" ("DateAdded", "Title", "Description", "Url", "PhotoUrl", "CountryId")
VALUES ('2022-05-21 14:50:01', 'Another Round', 'Four high-school teachers consume alcohol on a daily basis to see how it affects their social and professional lives.', 'https://www.imdb.com/title/tt10288566/?ref_=nv_sr_srsg_0', 'https://m.media-amazon.com/images/M/MV5BYzE5MGRjMjUtYzQwYy00NGU2LTk2ZjYtMDJhNDM0MmQ3MTc0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', 2);
INSERT INTO "Movies" ("DateAdded", "Title", "Description", "Url", "PhotoUrl", "CountryId")
VALUES ('2022-05-21 15:18:01', 'Trees of Peace', 'In April of 1994, four women from different backgrounds and beliefs are trapped and hiding during the genocide against the Tutsi in Rwanda. Their fight for survival against all odds unites the women in an unbreakable sisterhood.', 'https://www.imdb.com/title/tt11316680/?ref_=kw_li_tt', 'https://ksr-ugc.imgix.net/assets/036/815/011/21f59adea46ed89e17d11f9936e52810_original.jpg?ixlib=rb-4.0.2&w=700&fit=max&v=1648572285&auto=format&frame=1&q=92&s=da62fa5638498c58ed6f3be06cc2c9fe', 3);
INSERT INTO "Movies" ("DateAdded", "Title", "Description", "Url", "PhotoUrl", "CountryId")
VALUES ('2022-05-24 14:15:01', 'To the Ends of the Earth', 'A young Japanese woman finds her cautious and insular nature tested when she travels to Uzbekistan to shoot the latest episode of her travel variety show.', 'https://www.imdb.com/title/tt8681422/?ref_=nv_sr_srsg_1', 'https://www.trigon-film.org/en/movies/Ends_of_the_Earth/flyer_large.jpg', 4);

INSERT INTO "Musics" ("DateAdded", "Artist", "Description", "Url", "PhotoUrl", "CountryId")
VALUES ('2022-05-21 14:28:01', 'Zulma Yugar', 'Bolivian classical folk singer', 'https://open.spotify.com/artist/4P6BbGD4vPfePNs4iPKVcF?autoplay=true', 'https://e.snmc.io/i/1200/s/66ee5464412e7270a5b682d49632d6bf/8195191', 1);
INSERT INTO "Musics" ("DateAdded", "Artist", "Description", "Url", "PhotoUrl", "CountryId")
VALUES ('2022-05-21 14:50:01', 'Agnes Obel', 'Danish singer-songwriter', 'https://open.spotify.com/album/6QvHf4M3JDX90qtX3XclDb?si=iMljkIDLSEa5pSnYIA8l8g', 'https://media.npr.org/assets/img/2017/02/22/agnes-obel-credit-alex-br-el-flagstad_slide-2774acd62615bce836561bdf123167802f37a19c.jpg', 2);
INSERT INTO "Musics" ("DateAdded", "Artist", "Description", "Url", "PhotoUrl", "CountryId")
VALUES ('2022-05-21 15:18:01', 'Bruce Melodie', 'Rwandan artist and songwriter', 'https://open.spotify.com/artist/2esEiOAGqbIDlRwwUK2wnP?si=xYlZxiNkRh6sEVgFyMzDCQ', 'https://yegob.rw/wp-content/uploads/2021/02/bruce_melody-6.jpg', 3);
INSERT INTO "Musics" ("DateAdded", "Artist", "Description", "Url", "PhotoUrl", "CountryId")
VALUES ('2022-05-24 14:15:01', 'Sevara Nazarkhan', 'Uzbek singer, songwriter & musician', 'https://open.spotify.com/album/1lg4Lhcg4UMiNDUL5btlIR?si=erjWpDcxRQWMs-iIYpe22g', 'https://i1.sndcdn.com/avatars-000004717519-c5s0eh-t500x500.jpg', 4);
