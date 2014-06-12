//createSequence method creates a new sequence
createSequence(
    'es', //Sequence language
    'Precios de partidas de obra', //Sequence title
    'Recopilatorio de las partidas más usadas en las obras', //Sequence info
    'uno7o', //Sequence author
    'uno70@uno70.com', //Sequence author email
    '0.2', //Sequence last version
    '11/06/2014', //Sequence last review date
    ['1GvoFs2Lv8VAA6wffTcC4vFzECurySecmU', '', '', ''], //Sequence donation adresses
    'Estos precios son orientativos y no incluye IVA.' //Sequence result information
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
    },
];

var capitulos = [];
for(var i in precios) {
    capitulos.push(precios[i].capitulo);
}

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'capitulo', //Step reference
    'Seleccione el capítulo de la partida de obra', //Step question
    'select', //Step type (input or select)
    capitulos, //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione uno de los capítulos disponibles' //Step info
);

var capitulo_nextStep = function () {
    var capitulo = getAnswer('capitulo');
    for(var i in capitulos) {
        if(capitulo === capitulos[i]) {
            return 'capitulo_'+i;
        }
    }
};

for(var i in capitulos) {
    var partidasTemp = [];
    for(var j in precios[i].partidas) {
        partidasTemp.push(precios[i].partidas[j].titulo);
    }
    addStep(
        'capitulo_'+i, //Step reference
        'Seleccione una partida de obra', //Step question
        'select', //Step type (input or select)
        partidasTemp, //Step option (integer, float, string, email, url)
        'medicion', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
        'Seleccione una de las partidas disponibles del capítulo de '+ capitulos[i].toLowerCase() //Step info
    );
}

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'medicion', //Step reference
    '¿Cuál es la medición de la partida?', //Step question
    'input', //Step type (input or select)
    'float', //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Indique la medición de la partida seleccionada' //Step info
);

//sequenceResult function contains the sequence logic and returns the result
function sequenceResult() {
    var resultado;
    var capitulo = getAnswer('capitulo');
    var numCapitulo;
    var partida;
    var numPartida;
    var medicion = getAnswer('medicion');
    var importe;
    
    for(var i in precios) {
         if(capitulo === precios[i].capitulo) {
            numCapitulo = i;
        }
    }
    
    partida = getAnswer('capitulo_'+numCapitulo);
    
    for(var i in precios[numCapitulo].partidas) {
        if(partida === precios[numCapitulo].partidas[i].titulo) {
            numPartida = i;
        }
    }
    
    importe = medicion*precios[numCapitulo].partidas[numPartida].precio;
    
    resultado = '('+precios[numCapitulo].partidas[numPartida].unidad+') <b>'+precios[numCapitulo].partidas[numPartida].titulo+'</b><br>';
    resultado += precios[numCapitulo].partidas[numPartida].descripcion+'<br>';
    resultado += medicion+' '+precios[numCapitulo].partidas[numPartida].unidad+' X '+precios[numCapitulo].partidas[numPartida].precio+' €/'+precios[numCapitulo].partidas[numPartida].unidad+' = '+importe.toFixed(2)+' €';
    
    return resultado;
}