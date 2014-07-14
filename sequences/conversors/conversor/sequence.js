//createSequence method creates a new sequence
createSequence(
    'es', //Sequence language
    'Conversor de unidades', //Sequence title
    'Convierte el valor introducido a distintas unidades', //Sequence info
    'stepando', //Sequence author
    'contact@stepando.com', //Sequence author email
    '0.1', //Sequence last version
    '06/11/2013', //Sequence last review date
 ['14pwT5f8sajTHyEZPaDuUHrgQTm4ru79XP', 'stepando', 'lampantino','https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XDW597BZDGYU6'], //Sequence donation adresses
    'Información obtenida de la <a href="http://es.wikipedia.org/wiki/Conversi%C3%B3n_de_unidades" target="_blank">Wikipedia</a>' //Sequence result information
);

var magnitudes = ['Longitud', 'Superficie', 'Volumen', 'Presión'];

var longitud_unidades = ['km', 'hm', 'dam', 'm (S.I.)', 'dm', 'cm', 'mm', 'um', 'nm', 'angstron', 'legua', 'milla', 'milla náutica', 'braza', 'yarda', 'pie', 'pulgada', 'parsec', 'año luz', 'unidad astronómica'];
var longitud_conversion = [1000, 100, 10, 1, 0.1, 0.01, 0.001, 1e-6, 1e-9, 1e-10, 4828.03, 1609.34, 1852, 1.8288, 0.91, 0.3048, 0.0254, 3.09e+16, 9.46e+15, 1.5e+11];

var superficie_unidades = ['km²', 'hectárea', 'área', 'centiárea', 'm² (S.I.)', 'dm²', 'cm²', 'mm²', 'milla²', 'acre', 'yarda²', 'pie²', 'pulgada²'];
var superficie_conversion = [1000000, 10000, 100, 1, 1, 0.01, 0.0001, 0.000001, 2589987.83, 4046.8544812, 0.8361273924, 0.0929030436, 0.00064516];

var volumen_unidades = ['km³', 'hm³', 'dam³', 'm³ (S.I.)', 'dm³', 'cm³', 'mm³', 'litro', 'dl', 'ml'];
var volumen_conversion = [ 1e+9, 1e+6, 1e+3, 1, 1e-3, 1e-6, 1e-9, 1e-3, 1e-4, 1e-5, 1e-6];

var presion_unidades = ['KN/m²', 'N/m²', 'N/cm²', 'N/mm²', 'MPa', 'kPa', 'hPa', 'Pa (S.I.)', 'Bar', 'kgf/m²', 'kgf/cm²', 'milibar', 'atmósfera física', 'atmósfera técnica', 'psi', 'mmHg', 'mca'];
var presion_conversion = [1e+3, 1, 1e+4, 1e+6, 1e+6, 1e+3, 1e+2, 1, 1e+5, 9.806652048, 
9.806652048e+4, 100, 1.0132499658e+5, 9.8066520482e+4, 6.8947590868e+3, 1.3332199208e+2, 9.8063827784e+3];

//addStep methods creates new steps and adds them to the sequence
addStep(
    'valor', //Step reference
    'Introduzca el valor a convertir', //Step question
    'Input', //Step type
    'Float', //Step option
    'magnitud', //Next step
    'Ha de introducir un número' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'magnitud', //Step reference
    'Seleccione la mágnitud de la unidad que quiere convertir', //Step question
    'Select', //Step type
    magnitudes, //Step option
    '', //Next step
    'Seleccione entre las magnitudes físicas disponibles' //Step info
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
var magnitud_nextStep = function () {
    var magnitud = getAnswer('magnitud');
    magnitud = formatText(magnitud);
    return magnitud;
};

//addStep methods creates new steps and adds them to the sequence
addStep(
    'longitud', //Step reference
    'Seleccione la unidad en la que va a introducir el valor', //Step question
    'Select', //Step type
    longitud_unidades, //Step option
    'longitud_final', //Next step
    'Ésta será la unidad en la que está el valor que ha introducido' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'longitud_final', //Step reference
    'Seleccione la unidad a la que convertir el valor introducido', //Step question
    'Select', //Step type
    longitud_unidades, //Step option
    'result', //Next step
    'Ésta será la unidad a la que desea convertir el valor que ha introducido' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'superficie', //Step reference
    'Seleccione la unidad en la que va a introducir el valor', //Step question
    'Select', //Step type
    superficie_unidades, //Step option
    'superficie_final', //Next step
    'Ésta será la unidad en la que está el valor que ha introducido' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'superficie_final', //Step reference
    'Seleccione la unidad a la que convertir el valor introducido', //Step question
    'Select', //Step type
    superficie_unidades, //Step option
    'result', //Next step
    'Ésta será la unidad a la que desea convertir el valor que ha introducido' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'volumen', //Step reference
    'Seleccione la unidad en la que va a introducir el valor', //Step question
    'Select', //Step type
    volumen_unidades, //Step option
    'volumen_final', //Next step
    'Ésta será la unidad en la que está el valor que ha introducido' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'volumen_final', //Step reference
    'Seleccione la unidad a la que convertir el valor introducido', //Step question
    'Select', //Step type
    volumen_unidades, //Step option
    'result', //Next step
    'Ésta será la unidad a la que desea convertir el valor que ha introducido' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'presion', //Step reference
    'Seleccione la unidad en la que va a introducir el valor', //Step question
    'Select', //Step type
    presion_unidades, //Step option
    'presion_final', //Next step
    'Ésta será la unidad en la que está el valor que ha introducido' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'presion_final', //Step reference
    'Seleccione la unidad a la que convertir el valor introducido', //Step question
    'Select', //Step type
    presion_unidades, //Step option
    'result', //Next step
    'Ésta será la unidad a la que desea convertir el valor que ha introducido' //Step info
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

    resultado += valor_inicial + ' ' + unidad_inicial + ' = ' + valor_final + ' ' + unidad_final;

    return resultado;
}