//createSequence method creates a new sequence
createSequence(
    'gl', //Sequence language
    'Conversor de unidades tradicionais de superficie de Galicia', //Sequence title
    'Convirte o valor introducido a distintas unidades de superficie', //Sequence info
    'stepando', //Sequence author
    'contact@stepando.com', //Sequence author email
    '0.1', //Sequence last version
    '11/11/2013', //Sequence last review date
 ['1DXmFrR6wGf7y3oeLyZvLWZC7QQtTvaMHX', 'stepando', 'lampantino', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XDW597BZDGYU6'], //Sequence donation adresses
    'Información obtida de <a href="http://www.mftopografia.com/f02_unidades.php" target="_blank">MF Topografía</a>' //Sequence result information
);

var provincias = ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'];

var coruna_concellos = ['A Baña', 'A Coruña', 'Abegondo', 'Ames', 'Aranga', 'Ares', 'Arzua', 'As Pontes', 'Arteixo', 'Bergondo', 'Betanzos', 'Boimorto', 'Boiro', 'Boqueixón', 'Brión', 'Cabana', 'Camariñas', 'Cambre', 'Capela', 'Carballo', 'Cariño', 'Carnota', 'Carral', 'Cedeira', 'Cee', 'Cerdeda', 'Cerdido', 'Cesuras', 'Coiros', 'Corcubión', 'Coristanco', 'Cullerodo', 'Dodro', 'Dunbría', 'Enfesta', 'Ferrol', 'Fisterra', 'Frades', 'Irixoa', 'Laracha', 'Laxe', 'Lousame', 'Malpica', 'Mañón', 'Mazaricos', 'Melide', 'Mesía', 'Miño', 'Moeche', 'Monfero', 'Mugardos', 'Muros', 'Muxía', 'Narón', 'Neda', 'Negreira', 'Noia', 'Oleiros', 'Ordes', 'Oroso', 'Ortigueira', 'Outes', 'Oza dos Ríos', 'Paderne', 'Padrón', 'Pino', 'Pobra do Caramiñal', 'Ponteceso', 'Pontedeume', 'Porto do Son', 'Rianxo', 'Ribeira', 'Rois', 'Sada', 'Sadurniño', 'Santiago', 'Santiso', 'Sobrado', 'Somoza', 'Sta.Comba', 'Teixeiro', 'Teo', 'Toques', 'Tordoia', 'Touro', 'Trazo', 'Val do Dudra', 'Valdomiño', 'Vedra', 'VIlamaior', 'Vilasantar', 'Vimianzo', 'Zas'];

var lugo_concellos = ['A Fonsagrada', 'A Pastoriza', 'A Pobra de Brollón', 'A Pontenova', 'Adabín', 'Alfoz', 'Antas de Ulla', 'As Nogais', 'Baleira', 'Barreiros', 'Begonte', 'Bercerreá ', 'Bóveda', 'Carballedo', 'Castro de Rei', 'Castroverde', 'Cervantes', 'Cervo', 'Chantada', 'Cospeiro', 'Courel(Folgoso)', 'Foz', 'Friol', 'Guntín', 'Láncara', 'Lourenzá ', 'Lugo', 'Meira', 'Mondoñedo', 'Monforte', 'Monterroso', 'Muras', 'Navia de Suarna', 'Negreira de Muñiz', 'Neira de Xusa', 'O Corgo', 'O Incio', 'O Saviñao', 'O Valadouro', 'Ourol', 'Outeiro de Rei', 'Palas de Reis', 'Pantón', 'Paradela', 'Páramo', 'Pedrafita', 'Pol', 'Portomarín', 'Quiroga', 'Rábade', 'Ribadeo', 'Ribas do Sil', 'Ribeira de Piquín', 'Riotorto', 'Samos', 'Sarria', 'Sober', 'Taboada', 'Trabada', 'Triacastela', 'Vicedo', 'Vilalba', 'Viveiro', 'Xermade', 'Xove'];

var pontevedra_concellos = ['A Cañiza', 'A Estrada', 'A Lama', 'Agolada', 'Arbo', 'As Neves', 'Baiona', 'Bueu', 'Caldas de Reis', 'Cambados', 'Campolameiro', 'Cangas', 'Catoira', 'Cerdedo', 'Crecemte', 'Cuntis', 'Dozón', 'Forcarei', 'Fornelos de Montes', 'Gondomar', 'Lalín', 'Marín', 'Marín', 'Meaño', 'Meis', 'Moaña', 'Mondariz', 'Moraña', 'Mos', 'Nigran', 'O Covelo', 'O Grove', 'O Porriño', 'Oia', 'Pazos de Borbén', 'Poio', 'Ponteareas', 'Pontecaldelas', 'Pontecesures', 'Pontesampaio', 'Pontevedra', 'Portas', 'Redondela', 'Ribadumia', 'Rodeiro', 'Salvaterra', 'Sanxenxo', 'Silleda', 'Soutomaior', 'Tomiño', 'Tui', 'Valga', 'Vigo', 'Vila de Cruces', 'Vilaboa', 'Vilagarcia', 'Vilanova de Arousa', 'Vilaxoan'];

var fanega = [2112.00, 1776.00, 1744.00, 2556.00, 1744.00, 2192.00, 2144.00, 2192.00, 1776.00, 1744.00, 1744.00, 2144.00, 1936.00, 2556.00, 2000.00, 2096.00, 1696.00, 1776.00, 2192.00, 2096.00, 1776.00, 1600.00, 1776.00, 2036.00, 1744.00, 2556.00, 2036.00, 1744.00, 1744.00, 1696.00, 2096.00, 1776.00, 1680.00, 1696.00, 2556.00, 2036.00, 1696.00, 2544.00, 1744.00, 2096.00, 2096.00, 1680.00, 2096.00, 2192.00, 1696.00, 2144.00, 2412.00, 2192.00, 2036.00, 2192.00, 2192.00, 1340.00, 1696.00, 2036.00, 2036.00, 2112.00, 1680.00, 1776.00, 2556.00, 2556.00, 1776.00, 1584.00, 1744.00, 1744.00, 1680.00, 2144.00, 1936.00, 2096.00, 2192.00, 1920.00, 1936.00, 1936.00, 1696.00, 1744.00, 2036.00, 2556.00, 2144.00, 2144.00, 2036.00, 2112.00, 2144.00, 2556.00, 2144.00, 2556.00, 2144.00, 2560.00, 2560.00, 2036.00, 2556.00, 2192.00, 2144.00, 1696.00, 1696.00, 2028.00, 2016.00, 1860.00, 2016.00, 2016.00, 2856.00, 2416.00, 2484.00, 2856.00, 2856.00, 2100.00, 2312.00, 1956.00, 2516.00, 2516.00, 1984.00, 2212.00, 2900.00, 2516.00, 2100.00, 1744.00, 2856.00, 1744.00, 1744.00, 2516.00, 2552.00, 1744.00, 2056.00, 2448.00, 1956.00, 2416.00, 2192.00, 2600.00, 2028.00, 2440.00, 1744.00, 2236.00, 2236.00, 2856.00, 2192.00, 1744.00, 2416.00, 1956.00, 2236.00, 2236.00, 2312.00, 1984.00, 2684.00, 1860.00, 1744.00, 2448.00, 1860.00, 2056.00, 2016.00, 2236.00, 2516.00, 1936.00, 2416.00, 2552.00, 1720.00, 2192.00, 2184.00, 2192.00, 2100.00, 2900.00, 2516.00, 1748.00, 2516.00, 868.00, 2144.00, 1748.00, 2516.00, 2156.00, 1888.00, 2688.00, 2516.00, 2516.00, 1888.00, 2516.00, 2112.00, 1748.00, 2516.00, 2144.00, 2000.00, 296.00, 2164.00, 2144.00, 2016.00, 1888.00, 2516.00, 2516.00, 1888.00, 1728.00, 2592.00, 1988.00, 2164.00, 1056.00, 2516.00, 1988.00, 1608.00, 296.00, 2516.00, 1748.00, 2516.00, 1680.00, 2516.00, 2516.00, 2516.00, 276.00, 2516.00, 2144.00, 1748.00, 2516.00, 2144.00, 256.00, 2516.00, 1988.00, 2516.00, 2164.00, 2144.00, 2516.00, 2180.00, 2688.00, 2412.00
];

var ferrado = [528.00, 444.00, 436.00, 639.00, 436.00, 548.00, 536.00, 548.00, 444.00, 436.00, 436.00, 536.00, 484.00, 639.00, 500.00, 524.00, 424.00, 444.00, 548.00, 524.00, 444.00, 400.00, 444.00, 509.00, 436.00, 639.00, 509.00, 436.00, 436.00, 424.00, 524.00, 444.00, 420.00, 424.00, 639.00, 509.00, 424.00, 636.00, 436.00, 524.00, 524.00, 420.00, 524.00, 548.00, 424.00, 536.00, 603.00, 548.00, 509.00, 548.00, 548.00, 335.00, 424.00, 509.00, 509.00, 528.00, 420.00, 444.00, 639.00, 639.00, 444.00, 396.00, 436.00, 436.00, 420.00, 536.00, 484.00, 524.00, 548.00, 480.00, 484.00, 484.00, 424.00, 436.00, 509.00, 639.00, 536.00, 536.00, 509.00, 528.00, 536.00, 639.00, 536.00, 639.00, 536.00, 640.00, 640.00, 509.00, 639.00, 548.00, 536.00, 424.00, 424.00, 507.00, 504.00, 465.00, 504.00, 504.00, 714.00, 604.00, 621.00, 714.00, 714.00, 525.00, 578.00, 489.00, 629.00, 629.00, 496.00, 553.00, 725.00, 629.00, 525.00, 436.00, 714.00, 436.00, 436.00, 629.00, 638.00, 436.00, 514.00, 612.00, 489.00, 604.00, 548.00, 650.00, 507.00, 610.00, 436.00, 559.00, 559.00, 714.00, 548.00, 436.00, 604.00, 489.00, 559.00, 559.00, 578.00, 496.00, 671.00, 465.00, 436.00, 612.00, 465.00, 514.00, 504.00, 559.00, 629.00, 484.00, 604.00, 638.00, 430.00, 548.00, 546.00, 548.00, 525.00, 725.00, 629.00, 437.00, 629.00, 217.00, 536.00, 437.00, 629.00, 539.00, 472.00, 672.00, 629.00, 629.00, 472.00, 629.00, 528.00, 437.00, 629.00, 536.00, 500.00, 74.00, 541.00, 536.00, 504.00, 472.00, 629.00, 629.00, 472.00, 432.00, 648.00, 497.00, 541.00, 264.00, 629.00, 497.00, 402.00, 74.00, 629.00, 437.00, 629.00, 420.00, 629.00, 629.00, 629.00, 69.00, 629.00, 536.00, 437.00, 629.00, 536.00, 64.00, 629.00, 497.00, 629.00, 541.00, 536.00, 629.00, 545.00, 672.00, 603.00
];

var tega = [264.00, 222.00, 218.00, 319.50, 218.00, 274.00, 268.00, 274.00, 222.00, 218.00, 218.00, 268.00, 242.00, 319.50, 250.00, 262.00, 212.00, 222.00, 274.00, 262.00, 222.00, 200.00, 222.00, 254.50, 218.00, 319.50, 254.50, 218.00, 218.00, 212.00, 262.00, 222.00, 210.00, 212.00, 319.50, 254.50, 212.00, 318.00, 218.00, 262.00, 262.00, 210.00, 262.00, 274.00, 212.00, 268.00, 301.50, 274.00, 254.50, 274.00, 274.00, 167.50, 212.00, 254.50, 254.50, 264.00, 210.00, 222.00, 319.50, 319.50, 222.00, 198.00, 218.00, 218.00, 210.00, 268.00, 242.00, 262.00, 274.00, 240.00, 242.00, 242.00, 212.00, 218.00, 254.50, 319.50, 268.00, 268.00, 254.50, 264.00, 268.00, 319.50, 268.00, 319.50, 268.00, 320.00, 320.00, 254.50, 319.50, 274.00, 268.00, 212.00, 212.00, 253.50, 252.00, 232.50, 252.00, 252.00, 357.00, 302.00, 310.50, 357.00, 357.00, 262.50, 289.00, 244.50, 314.50, 314.50, 248.00, 276.50, 362.50, 314.50, 262.50, 218.00, 357.00, 218.00, 218.00, 314.50, 319.00, 218.00, 257.00, 306.00, 244.50, 302.00, 274.00, 325.00, 253.50, 305.00, 218.00, 279.50, 279.50, 357.00, 274.00, 218.00, 302.00, 244.50, 279.50, 279.50, 289.00, 248.00, 335.50, 232.50, 218.00, 306.00, 232.50, 257.00, 252.00, 279.50, 314.50, 242.00, 302.00, 319.00, 215.00, 274.00, 273.00, 274.00, 262.50, 362.50, 314.50, 218.50, 314.50, 108.50, 268.00, 218.50, 314.50, 269.50, 236.00, 336.00, 314.50, 314.50, 236.00, 314.50, 264.00, 218.50, 314.50, 268.00, 250.00, 37.00, 270.50, 268.00, 252.00, 236.00, 314.50, 314.50, 236.00, 216.00, 324.00, 248.50, 270.50, 132.00, 314.50, 248.50, 201.00, 37.00, 314.50, 218.50, 314.50, 210.00, 314.50, 314.50, 314.50, 34.50, 314.50, 268.00, 218.50, 314.50, 268.00, 32.00, 314.50, 248.50, 314.50, 270.50, 268.00, 314.50, 272.50, 336.00, 301.50
];

var cunca = [44.00, 37.00, 36.33, 53.25, 36.33, 45.67, 44.67, 45.67, 37.00, 36.33, 36.33, 44.67, 40.33, 53.25, 41.67, 43.67, 35.33, 37.00, 45.67, 43.67, 37.00, 33.33, 37.00, 42.42, 36.33, 53.25, 42.42, 36.33, 36.33, 35.33, 43.67, 37.00, 35.00, 35.33, 53.25, 42.42, 35.33, 53.00, 36.33, 43.67, 43.67, 35.00, 43.67, 45.67, 35.33, 44.67, 50.25, 45.67, 42.42, 45.67, 45.67, 27.92, 35.33, 42.42, 42.42, 44.00, 35.00, 37.00, 53.25, 53.25, 37.00, 33.00, 36.33, 36.33, 35.00, 44.67, 40.33, 43.67, 45.67, 40.00, 40.33, 40.33, 35.33, 36.33, 42.42, 53.25, 44.67, 44.67, 42.42, 44.00, 44.67, 53.25, 44.67, 53.25, 44.67, 53.33, 53.33, 42.42, 53.25, 45.67, 44.67, 35.33, 35.33, 42.25, 42.00, 38.75, 42.00, 42.00, 59.50, 50.33, 51.75, 59.50, 59.50, 43.75, 48.17, 40.75, 52.42, 52.42, 41.33, 46.08, 60.42, 52.42, 43.75, 36.33, 59.50, 36.33, 36.33, 52.42, 53.17, 36.33, 42.83, 51.00, 40.75, 50.33, 45.67, 54.17, 42.25, 50.83, 36.33, 46.58, 46.58, 59.50, 45.67, 36.33, 50.33, 40.75, 46.58, 46.58, 48.17, 41.33, 55.92, 38.75, 36.33, 51.00, 38.75, 42.83, 42.00, 46.58, 52.42, 40.33, 50.33, 53.17, 35.83, 45.67, 45.50, 45.67, 43.75, 60.42, 52.42, 36.42, 52.42, 18.08, 44.67, 36.42, 52.42, 44.92, 39.33, 56.00, 52.42, 52.42, 39.33, 52.42, 44.00, 36.42, 52.42, 44.67, 41.67, 6.17, 45.08, 44.67, 42.00, 39.33, 52.42, 52.42, 39.33, 36.00, 54.00, 41.42, 45.08, 22.00, 52.42, 41.42, 33.50, 6.17, 52.42, 36.42, 52.42, 35.00, 52.42, 52.42, 52.42, 5.75, 52.42, 44.67, 36.42, 52.42, 44.67, 5.33, 52.42, 41.42, 52.42, 45.08, 44.67, 52.42, 45.42, 56.00, 50.25
];

var cuartillo = [22.00, 18.50, 18.17, 26.63, 18.17, 22.83, 22.33, 22.83, 18.50, 18.17, 18.17, 22.33, 20.17, 26.63, 20.83, 21.83, 17.67, 18.50, 22.83, 21.83, 18.50, 16.67, 18.50, 21.21, 18.17, 26.63, 21.21, 18.17, 18.17, 17.67, 21.83, 18.50, 17.50, 17.67, 26.63, 21.21, 17.67, 26.50, 18.17, 21.83, 21.83, 17.50, 21.83, 22.83, 17.67, 22.33, 25.13, 22.83, 21.21, 22.83, 22.83, 13.96, 17.67, 21.21, 21.21, 22.00, 17.50, 18.50, 26.63, 26.63, 18.50, 16.50, 18.17, 18.17, 17.50, 22.33, 20.17, 21.83, 22.83, 20.00, 20.17, 20.17, 17.67, 18.17, 21.21, 26.63, 22.33, 22.33, 21.21, 22.00, 22.33, 26.63, 22.33, 26.63, 22.33, 26.67, 26.67, 21.21, 26.63, 22.83, 22.33, 17.67, 17.67, 21.13, 21.00, 19.38, 21.00, 21.00, 29.75, 25.17, 25.88, 29.75, 29.75, 21.88, 24.08, 20.38, 26.21, 26.21, 20.67, 23.04, 30.21, 26.21, 21.88, 18.17, 29.75, 18.17, 18.17, 26.21, 26.58, 18.17, 21.42, 25.50, 20.38, 25.17, 22.83, 27.08, 21.13, 25.42, 18.17, 23.29, 23.29, 29.75, 22.83, 18.17, 25.17, 20.38, 23.29, 23.29, 24.08, 20.67, 27.96, 19.38, 18.17, 25.50, 19.38, 21.42, 21.00, 23.29, 26.21, 20.17, 25.17, 26.58, 17.92, 22.83, 22.75, 22.83, 21.88, 30.21, 26.21, 18.21, 26.21, 9.04, 22.33, 18.21, 26.21, 22.46, 19.67, 28.00, 26.21, 26.21, 19.67, 26.21, 22.00, 18.21, 26.21, 22.33, 20.83, 3.08, 22.54, 22.33, 21.00, 19.67, 26.21, 26.21, 19.67, 18.00, 27.00, 20.71, 22.54, 11.00, 26.21, 20.71, 16.75, 3.08, 26.21, 18.21, 26.21, 17.50, 26.21, 26.21, 26.21, 2.88, 26.21, 22.33, 18.21, 26.21, 22.33, 2.67, 26.21, 20.71, 26.21, 22.54, 22.33, 26.21, 22.71, 28.00, 25.13
];

var estadal = [5.28, 4.44, 4.36, 6.39, 4.36, 5.48, 5.36, 5.48, 4.44, 4.36, 4.36, 5.36, 4.84, 6.39, 5.00, 5.24, 4.24, 4.44, 5.48, 5.24, 4.44, 4.00, 4.44, 5.09, 4.36, 6.39, 5.09, 4.36, 4.36, 4.24, 5.24, 4.44, 4.20, 4.24, 6.39, 5.09, 4.24, 6.36, 4.36, 5.24, 5.24, 4.20, 5.24, 5.48, 4.24, 5.36, 6.03, 5.48, 5.09, 5.48, 5.48, 3.35, 4.24, 5.09, 5.09, 5.28, 4.20, 4.44, 6.39, 6.39, 4.44, 3.96, 4.36, 4.36, 4.20, 5.36, 4.84, 5.24, 5.48, 4.80, 4.84, 4.84, 4.24, 4.36, 5.09, 6.39, 5.36, 5.36, 5.09, 5.28, 5.36, 6.39, 5.36, 6.39, 5.36, 6.40, 6.40, 5.09, 6.39, 5.48, 5.36, 4.24, 4.24, 5.07, 5.04, 4.65, 5.04, 5.04, 7.14, 6.04, 6.21, 7.14, 7.14, 5.25, 5.78, 4.89, 6.29, 6.29, 4.96, 5.53, 7.25, 6.29, 5.25, 4.36, 7.14, 4.36, 4.36, 6.29, 6.38, 4.36, 5.14, 6.12, 4.89, 6.04, 5.48, 6.50, 5.07, 6.10, 4.36, 5.59, 5.59, 7.14, 5.48, 4.36, 6.04, 4.89, 5.59, 5.59, 5.78, 4.96, 6.71, 4.65, 4.36, 6.12, 4.65, 5.14, 5.04, 5.59, 6.29, 4.84, 6.04, 6.38, 4.30, 5.48, 5.46, 5.48, 5.25, 7.25, 6.29, 4.37, 6.29, 2.17, 5.36, 4.37, 6.29, 5.39, 4.72, 6.72, 6.29, 6.29, 4.72, 6.29, 5.28, 4.37, 6.29, 5.36, 5.00, 0.74, 5.41, 5.36, 5.04, 4.72, 6.29, 6.29, 4.72, 4.32, 6.48, 4.97, 5.41, 2.64, 6.29, 4.97, 4.02, 0.74, 6.29, 4.37, 6.29, 4.20, 6.29, 6.29, 6.29, 0.69, 6.29, 5.36, 4.37, 6.29, 5.36, 0.64, 6.29, 4.97, 6.29, 5.41, 5.36, 6.29, 5.45, 6.72, 6.03
];

var vara = [0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70
];

var posicion_inicial;
var posicion_final;

var superficie_unidades = ['ferrado', 'cunca', 'fanega', 'tega', 'cuartillo', 'estadal', 'vara', 'km²', 'hectárea', 'área', 'centiárea', 'm² (S.I.)', 'dm²', 'cm²', 'mm²', 'milla²', 'acre', 'yarda²', 'pie²', 'polgada² (galega)', 'polgada² (inglesa)'];
var superficie_conversion = [1, 1, 1, 1, 1, 1, 1, 1000000, 10000, 100, 1, 1, 0.01, 0.0001, 0.000001, 2589987.83, 4046.8544812, 0.8361273924, 0.0929030436, 0.00054289, 0.00064516];



//PASOS

//addStep methods creates new steps and adds them to the sequence
addStep(
    'valor', //Step reference
    'Introduza o valor a convertir', //Step question
    'Input', //Step type
    'Float', //Step option
    'superficie_inicial', //Next step
    'Introduza un número' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'superficie_inicial', //Step reference
    'Seleccione a unidade do valor introducido', //Step question
    'Select', //Step type
    superficie_unidades, //Step option
    '', //Next step
    'O resultado convertirá o valor á unidade seleccionada' //Step info
);

//XXX_nextStep method is used to define multiple targets for one step
var superficie_inicial_nextStep = function () {
    var unidade = getAnswer('superficie_inicial');
    if (unidade === 'fanega' || unidade === 'ferrado' || unidade === 'tega' || unidade === 'cunca' || unidade === 'cuartillo' || unidade === 'estadal' || unidade === 'vara') {
        return 'provincia_inicial';
    } else {
        return 'superficie_final';
    }
};

//addStep methods creates new steps and adds them to the sequence
addStep(
    'provincia_inicial', //Step reference
    'Seleccione a provincia', //Step question
    'Select', //Step type
    provincias, //Step option
    '', //Next step
    'Seleccione a provincia á que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosCoruna_inicial', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    coruna_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosLugo_inicial', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    lugo_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosPontevedra_inicial', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    pontevedra_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

//XXX_nextStep method is used to define multiple targets for one step
var provincia_inicial_nextStep = function () {
    var provincia = getAnswer('provincia_inicial');
    var nextStep;
    switch (provincia) {
    case 'A Coruña':
        nextStep = 'concellosCoruna_inicial';
        break;
    case 'Lugo':
        nextStep = 'concellosLugo_inicial';
        break;
    case 'Ourense':
        nextStep = 'superficie_final';
        posicion_inicial = 158;
        break;
    case 'Pontevedra':
        nextStep = 'concellosPontevedra_inicial';
        break;
    }
    return nextStep;
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosCoruna_inicial_nextStep = function () {
    var concellosCoruna = getAnswer('concellosCoruna_inicial');
    for (var i = 0; i < coruna_concellos.length; i++) {
        if (concellosCoruna === coruna_concellos[i]) {
            posicion_inicial = i;
        }
    }
    return 'superficie_final';
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosLugo_inicial_nextStep = function () {
    var concellosLugo = getAnswer('concellosLugo_inicial');
    for (var i = 0; i < lugo_concellos.length; i++) {
        if (concellosLugo === lugo_concellos[i]) {
            posicion_inicial = i + 93;
        }
    }
    return 'superficie_final';
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosPontevedra_inicial_nextStep = function () {
    var concellosPontevedra = getAnswer('concellosPontevedra_inicial');
    for (var i = 0; i < pontevedra_concellos.length; i++) {
        if (concellosPontevedra === pontevedra_concellos[i]) {
            posicion_inicial = i + 159;
        }
    }
    return 'superficie_final';
};







//addStep methods creates new steps and adds them to the sequence
addStep(
    'superficie_final', //Step reference
    'Seleccione a unidade á que quere convertir o valor introducido', //Step question
    'Select', //Step type
    superficie_unidades, //Step option
    '', //Next step
    'O resultado convertirá o valor á unidade seleccionada' //Step info
);

//XXX_nextStep method is used to define multiple targets for one step
var superficie_final_nextStep = function () {
    var unidade = getAnswer('superficie_final');
    if (unidade === 'fanega' || unidade === 'ferrado' || unidade === 'tega' || unidade === 'cunca' || unidade === 'cuartillo' || unidade === 'estadal' || unidade === 'vara') {
        return 'provincia_final';
    } else {
        return 'result';
    }
};

//addStep methods creates new steps and adds them to the sequence
addStep(
    'provincia_final', //Step reference
    'Seleccione a provincia', //Step question
    'Select', //Step type
    provincias, //Step option
    '', //Next step
    'Seleccione a provincia á que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosCoruna_final', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    coruna_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosLugo_final', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    lugo_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosPontevedra_final', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    pontevedra_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

//XXX_nextStep method is used to define multiple targets for one step
var provincia_final_nextStep = function () {
    var provincia = getAnswer('provincia_final');
    var nextStep;
    switch (provincia) {
    case 'A Coruña':
        nextStep = 'concellosCoruna_final';
        break;
    case 'Lugo':
        nextStep = 'concellosLugo_final';
        break;
    case 'Ourense':
        nextStep = 'result';
        posicion_final = 158;
        break;
    case 'Pontevedra':
        nextStep = 'concellosPontevedra_final';
        break;
    }
    return nextStep;
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosCoruna_final_nextStep = function () {
    var concellosCoruna = getAnswer('concellosCoruna_final');
    for (var i = 0; i < coruna_concellos.length; i++) {
        if (concellosCoruna === coruna_concellos[i]) {
            posicion_final = i;
        }
    }
    return 'result';
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosLugo_final_nextStep = function () {
    var concellosLugo = getAnswer('concellosLugo_final');
    for (var i = 0; i < lugo_concellos.length; i++) {
        if (concellosLugo === lugo_concellos[i]) {
            posicion_final = i + 93;
        }
    }
    return 'result';
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosPontevedra_final_nextStep = function () {
    var concellosPontevedra = getAnswer('concellosPontevedra_final');
    for (var i = 0; i < pontevedra_concellos.length; i++) {
        if (concellosPontevedra === pontevedra_concellos[i]) {
            posicion_final = i + 159;
        }
    }
    return 'result';
};




//sequenceResult function contains the sequence logic and returns the result
function sequenceResult() {
    var unidade_inicial = getAnswer('superficie_inicial');
    var provincia_inicial = getAnswer('provincia_inicial');

    var unidade_final = getAnswer('superficie_final');
    var valor_inicial = getAnswer('valor');
    var valor_final;

    var resultado = '';

    var getConcello = function (posicion, unidade) {
        var concello;

        if (unidade !== 'fanega' && unidade !== 'ferrado' && unidade !== 'tega' && unidade !== 'cunca' && unidade !== 'cuartillo' && unidade !== 'estadal' && unidade !== 'vara') {
            concello = '';
        } else if (posicion < 93) {
            concello = 'de ' + coruna_concellos[posicion] + ' (A Coruña)';
        } else if (posicion >= 93 && posicion < 158) {
            posicion = posicion - 93;
            concello = 'de ' + lugo_concellos[posicion] + ' (Lugo)';
        } else if (posicion == 158) {
            concello = 'de Ourense';
        } else if (posicion > 158) {
            posicion = posicion - 159;
            concello = 'de ' + pontevedra_concellos[posicion] + ' (Pontevedra)';
        }

        return concello;
    };



    var getFactor = function (unidade, posicion) {
        var factor;
        switch (unidade) {
        case 'fanega':
            factor = fanega[posicion];
            break;
        case 'ferrado':
            factor = ferrado[posicion];
            break;
        case 'tega':
            factor = tega[posicion];
            break;
        case 'cunca':
            factor = cunca[posicion];
            break;
        case 'cuartillo':
            factor = cuartillo[posicion];
            break;
        case 'estadal':
            factor = estadal[posicion];
            break;
        case 'vara':
            factor = vara[posicion];
            break;
        default:
            for (var i = 0; i < superficie_unidades.length; i++) {
                if (unidade === superficie_unidades[i]) {
                    factor = superficie_conversion[i];
                }
            }
        }
        return factor;
    };

    var factor_inicial = getFactor(unidade_inicial, posicion_inicial);
    var factor_final = getFactor(unidade_final, posicion_final);
    valor_final = valor_inicial * factor_inicial / factor_final;

    var formatNumber = function (number) {
        if (number < 0.001 || number > 1000000) {
            number = number.toExponential(3);
        } else if (number % 1 !== 0) {
            number = number.toFixed(3);
        }
        number = number.toString().replace('.',',');
        return number;
    };

    valor_inicial = formatNumber(parseFloat(valor_inicial));
    valor_final = formatNumber(parseFloat(valor_final));

    resultado += valor_inicial + ' ' + unidade_inicial + ' ' + getConcello(posicion_inicial, unidade_inicial) + ' = ' + valor_final + ' ' + unidade_final + ' ' + getConcello(posicion_final, unidade_final);

    return resultado;
}