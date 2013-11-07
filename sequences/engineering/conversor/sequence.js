//createSequence method creates a new sequence
createSequence(
    'es', //Sequence language
    'Conversor de unidades', //Sequence title
    'Convierte el valor introducido a distintas unidades', //Sequence info
    'Sebastian Ríos Ernst', //Sequence author
    'sre.quereck@gmail.com', //Sequence author email
    '0.1', //Sequence last version
    '06/11/2013', //Sequence last review date
 ['12Kaia98xJdD3u683jEpgkm6JGtkBkATcw', 'https://flattr.com/submit/auto?user_id=lampantino&url=https%3A%2F%2Fc9.io%2Flampantino%2Fstepando%2Fworkspace%2Findex.html%3Fengineering%26conversor', 'https://www.gittip.com/lampantino'], //Sequence donation adresses
    'Información obtenida de la <a href="http://es.wikipedia.org/wiki/Conversi%C3%B3n_de_unidades" target="_blank">Wikipedia</a>' //Sequence result information
);

var longitud_unidades = ['km', 'hm', 'dam', 'm (S.I.)', 'dm', 'cm', 'mm'];
var longitud_conversion = [1000, 100, 10, 1, 0.1, 0.01, 0.001];

var superficie_unidades = ['km2', 'ha', 'a', 'm2 (S.I.)','dm2','cm2','mm2','milla2','acre','yarda2','pie2','pulgada2'];
var superficie_conversion = [1000000,10000,100,1,0.01,0.0001,0.000001,2589987.83,4046.8544812,0.8361273924,0.0929030436,0.00064516];

//addStep methods creates new steps and adds them to the sequence
addStep(
    'magnitud', //Step reference
    'Seleccione la mágnitud de la unidad que quiere convertir', //Step question
    'Select', //Step type
    ['Longitud', 'Superficie' ], //Step option
    '', //Next step
    'Seleccione entre las magnitudes físicas disponibles' //Step info
);

var magnitud_nextStep = function() {
    var magnitud = getAnswer('magnitud').toLowerCase();
    return magnitud;
}

//addStep methods creates new steps and adds them to the sequence
addStep(
    'longitud', //Step reference
    'Seleccione la unidad en la que va a introducir el valor', //Step question
    'Select', //Step type
    longitud_unidades, //Step option
    'longitud_final', //Next step
    'El resultado convertirá el valor a las demás unidades de su categoría' //Step info
);
  
//addStep methods creates new steps and adds them to the sequence
addStep(
    'longitud_final', //Step reference
    'Seleccione la unidad a la que convertir el valor introducido', //Step question
    'Select', //Step type
    longitud_unidades, //Step option
    'valor', //Next step
    'El resultado convertirá el valor a las demás unidades de su categoría' //Step info
);
  
//addStep methods creates new steps and adds them to the sequence
addStep(
    'superficie', //Step reference
    'Seleccione la unidad en la que va a introducir el valor', //Step question
    'Select', //Step type
    superficie_unidades, //Step option
    'superficie_final', //Next step
    'El resultado convertirá el valor a las demás unidades de su categoría' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'superficie_final', //Step reference
    'Seleccione la unidad a la que convertir el valor introducido', //Step question
    'Select', //Step type
    superficie_unidades, //Step option
    'valor', //Next step
    'El resultado convertirá el valor a las demás unidades de su categoría' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'valor', //Step reference
    'Introduzca el valor a convertir', //Step question
    'Input', //Step type
    'Float', //Step option
    'result', //Next step
    'Ha de introducir un número' //Step info
);

//sequenceResult function contains the sequence logic and returns the result
function sequenceResult() {

    var magnitud = getAnswer('magnitud').toLowerCase();
    var unidad_inicial = getAnswer(magnitud);
    var unidad_final = getAnswer(magnitud+'_final');
    var valor_inicial = getAnswer('valor');
    var valor_final;

    var unidad_patron = [];
    var conversion_patron = [];
    var resultado_conversion = [];

    var resultado = '';

    eval('unidad_patron = ' + magnitud + '_unidades');
    eval('conversion_patron = ' + magnitud + '_conversion');
    
    var getFactor = function(unidad,unidades,conversiones) {
        for (var i = 0; i < unidades.length; i++) {
            if (unidad === unidades[i]) {
                return conversiones[i];
            }
        }
    };
    
    var factor_inicial = getFactor(unidad_inicial,unidad_patron,conversion_patron);
    var factor_final = getFactor(unidad_final,unidad_patron,conversion_patron);

    valor_final = valor_inicial*factor_inicial/factor_final;    
    
    var formatNumber = function(number) {
        if(number < 0.001) {
            number = number.toExponential();
        } else {
            number = number.toFixed(3);
        }
        return number;
    };
    
    valor_inicial = formatNumber(parseFloat(valor_inicial));
    valor_final = formatNumber(parseFloat(valor_final));
    
    resultado += valor_inicial + ' ' + unidad_inicial + ' = ' + valor_final + ' ' + unidad_final;

    return resultado;
}