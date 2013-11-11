//createSequence method creates a new sequence
createSequence(
    'gl', //Sequence language
    'Conversor de unidades tradicionais de superficie de Galicia', //Sequence title
    'Convirte o valor introducido a distintas unidades de superficie', //Sequence info
    'Lampantino', //Sequence author
    'sre.quereck@gmail.com', //Sequence author email
    '0.1', //Sequence last version
    '11/11/2013', //Sequence last review date
 ['12Kaia98xJdD3u683jEpgkm6JGtkBkATcw', 'lampantino', 'lampantino', 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=sre%2equereck%40gmail%2ecom&lc=ES&item_name=Stepando&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest'], //Sequence donation adresses
    'Información obtida de <a href="http://www.mftopografia.com/f02_unidades.php" target="_blank">MF Topografía</a>' //Sequence result information
);

var provincias = ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'];

var coruna_concellos = ['A Baña',	'A Coruña',	'Abegondo',	'Ames',	'Aranga',	'Ares',	'Arzua',	'As Pontes',	'Ateixo',	'Bergondo',	'Betanzos',	'Boimorto',	'Boiro',	'Boqueixón',	'Brión',	'Cabana',	'Camariñas',	'Cambre',	'Capela',	'Carballo',	'Cariño',	'Carnota',	'Carral',	'Cedeira',	'Cee',	'Cerdeda',	'Cerdido',	'Cesuras',	'Coiros',	'Corcubión',	'Coristanco',	'Cullerodo',	'Dodro',	'Dunbría',	'Enfesta',	'Ferrol',	'Fisterra',	'Frades',	'Irixoa',	'Laracha',	'Laxe',	'Lousame',	'Malpica',	'Mañón',	'Mazaricos',	'Melide',	'Mesía',	'Miño',	'Moeche',	'Monfero',	'Mugardos',	'Muros',	'Muxía',	'Narón',	'Neda',	'Negreira',	'Noia',	'Oleiros',	'Ordes',	'Oroso',	'Ortigueira',	'Outes',	'Oza dos Ríos',	'Paderne',	'Padrón',	'Pino',	'Pobra do Caramiñal',	'Ponteceso',	'Pontedeume',	'Porto do Son',	'Rianxo',	'Ribeira',	'Rois',	'Sada',	'Sadurniño',	'Santiago',	'Santiso',	'Sobrado',	'Somoza',	'Sta.Comba',	'Teixeiro',	'Teo',	'Toques',	'Tordoia',	'Touro',	'Trazo',	'Val do Dudra',	'Valdomiño',	'Vedra',	'VIlamaior',	'Vilasantar',	'Vimianzo',	'Zas'];

var lugo_concellos = ['A Fonsagrada',	'A Pastoriza',	'A Pobra de Brollón',	'A Pontenova',	'Adabín',	'Alfoz',	'Antas de Ulla',	'As Nogais',	'Baleira',	'Barreiros',	'Begonte',	'Bercerreá ',	'Bóveda',	'Carballedo',	'Castro de Rei',	'Castroverde',	'Cervantes',	'Cervo',	'Chantada',	'Cospeiro',	'Courel(Folgoso)',	'Foz',	'Friol',	'Guntín',	'Láncara',	'Lourenzá ',	'Lugo',	'Meira',	'Mondoñedo',	'Monforte',	'Monterroso',	'Muras',	'Navia de Suarna',	'Negreira de Muñiz',	'Neira de Xusa',	'O Corgo',	'O Incio',	'O Saviñao',	'O Valadouro',	'Ourol',	'Outeiro de Rei',	'Palas de Reis',	'Pantón',	'Paradela',	'Páramo',	'Pedrafita',	'Pol',	'Portomarín',	'Quiroga',	'Rábade',	'Ribadeo',	'Ribas do Sil',	'Ribeira de Piquín',	'Riotorto',	'Samos',	'Sarria',	'Sober',	'Taboada',	'Trabada',	'Triacastela',	'Vicedo',	'Vilalba',	'Viveiro',	'Xermade',	'Xove'];

var pontevedra_concellos = ['A Cañiza',	'A Estrada',	'A Lama',	'Agolada',	'Arbo',	'As Neves',	'Baiona',	'Bueu',	'Caldas de Reis',	'Cambados',	'Campolameiro',	'Cangas',	'Catoira',	'Cerdedo',	'Crecemte',	'Cuntis',	'Dozón',	'Forcarei',	'Fornelos de Montes',	'Gondomar',	'Lalín',	'Marín',	'Marín',	'Meaño',	'Meis',	'Moaña',	'Mondariz',	'Moraña',	'Mos',	'Nigran',	'O Covelo',	'O Grove',	'O Porriño',	'Oia',	'Pazos de Borbén',	'Poio',	'Ponteareas',	'Pontecaldelas',	'Pontecesures',	'Pontesampaio',	'Pontevedra',	'Portas',	'Redondela',	'Ribadumia',	'Rodeiro',	'Salvaterra',	'Sanxenxo',	'Silleda',	'Soutomaior',	'Tomiño',	'Tui',	'Valga',	'Vigo',	'Vila de Cruces',	'Vilaboa',	'Vilagarcia',	'Vilanova de Arousa',	'Vilaxoan'];

var posicion;

var superficie_unidades = ['km²', 'hectárea', 'área', 'm² (S.I.)', 'dm²', 'cm²', 'mm²', 'milla²', 'acre', 'yarda²', 'pie²', 'pulgada²'];
var superficie_conversion = [1000000, 10000, 100, 1, 0.01, 0.0001, 0.000001, 2589987.83, 4046.8544812, 0.8361273924, 0.0929030436, 0.00064516];

//addStep methods creates new steps and adds them to the sequence
addStep(
    'provincia', //Step reference
    'Seleccione a provincia', //Step question
    'Select', //Step type
    provincias, //Step option
    '', //Next step
    'Seleccione a provincia á que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosCoruna', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    coruna_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosLugo', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    lugo_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'concellosPontevedra', //Step reference
    'Seleccione o concello', //Step question
    'Select', //Step type
    pontevedra_concellos, //Step option
    '', //Next step
    'Seleccione o concello ó que pertence a localidade na que quere consultar a medida' //Step info
);

var formatText = function (text) {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < from.length; i++) {
        var char_from = from.charAt(i);
        var char_to = to.charAt(i);
        eval('text = text.replace(/' + char_from + '/g, "' + char_to + '")');
    }
    return text.toLowerCase();
}

//XXX_nextStep method is used to define multiple targets for one step
var provincia_nextStep = function () {
    var provincia = getAnswer('provincia');
    var nextStep;
    switch(provincia) {
        case 'A Coruña':
            nextStep = 'concellosCoruna';
            break;
        case 'Lugo':
            nextStep = 'concellosLugo';
            break;
        case 'Ourense':
            nextStep = 'superficie';
            posicion = 158;
            break;
        case 'Pontevedra':
            nextStep = 'concellosPontevedra';
            break;
    }
    return nextStep;
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosCoruna_nextStep = function () {
    var concellosCoruna = getAnswer('concellosCoruna');
    for(var i=0; i<coruna_concellos.length; i++) {
        if (concellosCoruna === coruna_concellos[i]) {
                posicion = i+159;
            }
    }
    return 'superficie';
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosLugo_nextStep = function () {
    var concellosLugo = getAnswer('concellosLugo');
    for(var i=0; i<lugo_concellos.length; i++) {
        if (concellosLugo === lugo_concellos[i]) {
                posicion = i+93;
            }
    }
    return 'superficie';
};

//XXX_nextStep method is used to define multiple targets for one step
var concellosPontevedra_nextStep = function () {
    var concellosPontevedra = getAnswer('concellosPontevedra');
    for(var i=0; i<pontevedra_concellos.length; i++) {
        if (concellosPontevedra === pontevedra_concellos[i]) {
                posicion = i;
            }
    }
    return 'superficie';
};

//addStep methods creates new steps and adds them to the sequence
addStep(
    'superficie', //Step reference
    'Seleccione a unidade na que vai a introducir o valor a convertir', //Step question
    'Select', //Step type
    superficie_unidades, //Step option
    'superficie_final', //Next step
    'O resultado convertirá o valor á unidade seleccionada' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'superficie_final', //Step reference
    'Seleccione a unidade na que quere convertir o valor introducido', //Step question
    'Select', //Step type
    superficie_unidades, //Step option
    'valor', //Next step
    'O resultado convertirá o valor á unidade seleccionada' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'valor', //Step reference
    'Introduza o valor a convertir', //Step question
    'Input', //Step type
    'Float', //Step option
    'result', //Next step
    'Introduza un número' //Step info
);

//sequenceResult function contains the sequence logic and returns the result
function sequenceResult() {
    var magnitud = getAnswer('magnitud').toLowerCase();
    magnitud = formatText(magnitud);
    var unidad_inicial = getAnswer(magnitud);
    var unidad_final = getAnswer(magnitud + '_final');
    var valor_inicial = getAnswer('valor');
    var valor_final;

    var unidad_patron = [];
    var conversion_patron = [];
    var resultado_conversion = [];

    var resultado = '';

    eval('unidad_patron = ' + magnitud + '_unidades');
    eval('conversion_patron = ' + magnitud + '_conversion');

    var getFactor = function (unidad, unidades, conversiones) {
        for (var i = 0; i < unidades.length; i++) {
            if (unidad === unidades[i]) {
                return conversiones[i];
            }
        }
    };

    var factor_inicial = getFactor(unidad_inicial, unidad_patron, conversion_patron);
    var factor_final = getFactor(unidad_final, unidad_patron, conversion_patron);

    valor_final = valor_inicial * factor_inicial / factor_final;

    var formatNumber = function (number) {
        if (number < 0.001) {
            number = number.toExponential();
        } else if (number % 1 !== 0) {
            number = number.toFixed(3);
        }
        return number;
    };

    valor_inicial = formatNumber(parseFloat(valor_inicial));
    valor_final = formatNumber(parseFloat(valor_final));

    resultado += valor_inicial + ' ' + unidad_inicial + ' = ' + valor_final + ' ' + unidad_final;

    return resultado;
}