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
                "titulo": "Demolición de cubierta de teja y soporte de madera",
                "unidad": "m2",
                "descripcion": "Demolición completa de cubierta formada por cubrición de teja de cualquier tipo, soporte de entablado de madera y estructura de entramado de cerchas y correas de madera, por medios manuales.",
                "precio": 35.42
            },
            {
                "titulo": "Demolición de tabicón",
                "unidad": "m2",
                "descripcion": "Demolición de tabicones de ladrillo hueco doble, por medios manuales",
                "precio": 13.98
            },
        ]
    },
    {
        "capitulo": "Movimientos de tierras",
        "partidas": [
			{
                "titulo": "",
                "unidad": "",
                "descripcion": "",
                "precio": 0.00
            },
        ]
    },
    {
        "capitulo": "Red de Saneamiento",
        "partidas": [
			{
                "titulo": "",
                "unidad": "",
                "descripcion": "",
                "precio": 0.00
            },
        ]
    },
    {
        "capitulo": "Cimentaciones",
        "partidas": [
			{
                "titulo": "",
                "unidad": "",
                "descripcion": "",
                "precio": 0.00
            },
        ]
    },
    {
        "capitulo": "Estructura",
        "partidas": [
			{
                "titulo": "",
                "unidad": "",
                "descripcion": "",
                "precio": 0.00
            },
        ]
    },
    {
        "capitulo": "Cerramientos y divisiones",
        "partidas": [
			{
                "titulo": "",
                "unidad": "",
                "descripcion": "",
                "precio": 0.00
            },
        ]
    },
    {
        "capitulo": "Cubierta",
        "partidas": [
            {
                "titulo": "Cubierta de teja sobre placa",
                "unidad": "m2",
                "descripcion": "Cubierta inclinada formada por placa bajo teja con cobertura de teja cerámica recibida con mortero.",
                "precio": 54.45
            },

        ]
    },
	{
        "capitulo": "Urbanización",
        "partidas": [
            {
                "titulo": "Pavimento de losa de granito",
                "unidad": "m2",
                "descripcion": "Pavimento a base de losas de granito silvestre abujardado en piezas de 60x40x6cm, recibidas sobre mortero de cemento, y realizado sobre solera de hormigón de 10cm de espesor.",
                "precio": 70.00
            },
			{
                "titulo": "Pozo prefabricado de hormigón",
                "unidad": "ud",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Tubería Ø315/400mm de saneamiento + excavación",
                "unidad": "m",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Pavimento de baldosa hidráulica",
                "unidad": "m2",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Pavimento de hormigón impreso",
                "unidad": "m2",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Pavimento de solera pulida",
                "unidad": "m2",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Pavimento de hormigón desactivado",
                "unidad": "m2",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Acometida domiciliaria de saneamiento",
                "unidad": "ud",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Acometida domiciliaria de abastecimiento de agua",
                "unidad": "ud",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Tubería Ø100mm de abastecimiento + excavación",
                "unidad": "m",
                "descripcion": "",
                "precio": 0.00
            },
			{
                "titulo": "Sumidero sifónico",
                "unidad": "ud",
                "descripcion": "",
                "precio": 0.00
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
    var precio;
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
    
    precio = precios[numCapitulo].partidas[numPartida].precio;
    importe = medicion*precio;
    
    medicion = medicion.toFixed(2);
    medicion = medicion.replace('.',',');
    
    precio = precio.toFixed(2);
    precio = precio.replace('.',',');
    
    importe = importe.toFixed(2);
    importe = importe.replace('.',',');
    
    resultado = '('+precios[numCapitulo].partidas[numPartida].unidad+') <b>'+precios[numCapitulo].partidas[numPartida].titulo+'</b><br>';
    resultado += precios[numCapitulo].partidas[numPartida].descripcion+'<br>';
    resultado += medicion+' '+precios[numCapitulo].partidas[numPartida].unidad+' X '+precio+' €/'+precios[numCapitulo].partidas[numPartida].unidad+' = '+importe+' €';

    return resultado;
}




