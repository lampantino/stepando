//createSequence method creates a new sequence
createSequence(
    'es', //Sequence language
    'Precios de partidas de obra', //Sequence title
    'Recopilatorio de las partidas más usadas en las obras', //Sequence info
    'uno7o', //Sequence author
    'uno70@uno70.com', //Sequence author email
    '0.1', //Sequence last version
    '22/05/2014', //Sequence last review date
 ['1CiJTEeMLTdHDekYTK7nXzZQ9SN9EsStdY', 'https://flattr.com/submit/auto?user_id=lampantino&url=https%3A%2F%2Fc9.io%2Flampantino%2Fstepando%2Fworkspace%2Findex.html%3Fengineering%26vigaacero', 'https://www.gittip.com/lampantino'], //Sequence donation adresses
    'Este precio es orientativo y procede de distintas bases de precios como la CENTRO o la PREOC, así como de la propia experiencia de los autores' //Sequence result information
);

var precios = [
    {
        "capitulo": "Actuaciones previas",
        "partidas": [
            {
                "titulo": "Mirar aparentando",
                "unidad": "h",
                "descripcion": "Mirar haciendo como que entiendes algo de lo que tienes que construir en ese sitio",
                "precio": 15.67
            },
            {
                "titulo": "Cagarse en el técnico",
                "unidad": "h",
                "descripcion": "Emitir sonidos guturales intentando ocultar tu incompetencia",
                "precio": 12.56
            },
        ]
    },
    {
        "capitulo": "Movimientos de tierras",
        "partidas": [
            {
                "titulo": "Rascar con el pie",
                "unidad": "h",
                "descripcion": "Mover piedrecitas sueltas con el pie",
                "precio": 17.62
            },
        ]
    }        
];

var capitulos = [];
var partidas = [];

for(var i in precios) {
    capitulos.push(precios[i].capitulo);
}

for(var i in precios) {
    for(var j in precios[i].capitulo)
}





//AddStep methods creates new steps and adds them to the sequence
addStep(
    'capitulo', //Step reference
    'Seleccione el capítulo de la partida de obra', //Step question
    'select', //Step type (input or select)
    capitulos, //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'asfasf' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    '', //Step reference
    '', //Step question
    '', //Step type (input or select)
    '', //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    /*
    If you let an empty string (''), you must add after this addStep() method another method that returns
    where is the next step to print. This method name must be compoused by a name and the suffix _nextStep.
    For example:
        var stepX_nextStep = function () {
            if(getAnswer('step1') < 1) {
                return 'step2';
            } else {
                return 'step3';
            }
        };
    */
    '' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    '', //Step reference
    '', //Step question
    '', //Step type (input or select)
    '', //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    /*
    If you let an empty string (''), you must add after this addStep() method another method that returns
    where is the next step to print. This method name must be compoused by a name and the suffix _nextStep.
    For example:
        var stepX_nextStep = function () {
            if(getAnswer('step1') < 1) {
                return 'step2';
            } else {
                return 'step3';
            }
        };
    */
    '' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    '', //Step reference
    '', //Step question
    '', //Step type (input or select)
    '', //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    /*
    If you let an empty string (''), you must add after this addStep() method another method that returns
    where is the next step to print. This method name must be compoused by a name and the suffix _nextStep.
    For example:
        var stepX_nextStep = function () {
            if(getAnswer('step1') < 1) {
                return 'step2';
            } else {
                return 'step3';
            }
        };
    */
    '' //Step info
);

//sequenceResult function contains the sequence logic and returns the result
function sequenceResult() {
    var resultado;
    
    
    
    return resultado;
}