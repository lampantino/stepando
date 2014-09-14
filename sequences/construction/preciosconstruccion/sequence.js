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
                "titulo": "Excavación a máquina terrenos compactos",
                "unidad": "m3",
                "descripcion": "Excavación a cielo abierto, en terrenos compactos, por medios mecánicos, con extracción de tierras fuera de la excavación, en vaciados, sin carga ni transporte al vertedero y con p.p. de medios auxiliares.",
                "precio": 2.90
            },
			{
                "titulo": "Excavación a máquina zanjas terrenos compactos",
                "unidad": "m3",
                "descripcion": "Excavación en zanjas, en terrenos compactos, por medios mecánicos, con extracción de tierras a los bordes, sin carga ni transporte al vertedero y con p.p. de medios auxiliares.",
                "precio": 20.80
            },
			{
                "titulo": "Excavación a máquina zanjas de instalaciones terrenos compactos",
                "unidad": "m3",
                "descripcion": "Excavación en zanjas de instalaciones, en terrenos de consistencia dura, por medios mecánicos, con extracción de tierras a los bordes, y con posterior relleno y apisonado de las tierras procedentes de la excavación y con p.p. de medios auxiliares.",
                "precio": 26.80
            },
			{
                "titulo": "Encachado 15cm para base de solera",
                "unidad": "m2",
                "descripcion": "Encachado de 15 cm para base solera, con aporte de grava de cantera de piedra caliza, Ø40/70 mm, compactación mediante equipo manual con bandeja vibrante.",
                "precio": 7.50
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
                "titulo": "Zapatas de hormigón armado",
                "unidad": "m3",
                "descripcion": "Zapata de cimentación de hormigón armado, realizada con hormigón HA-25/B/20/IIa fabricado en central, y vertido desde camión, y acero UNE-EN 10080 B 500 S, cuantía 50 kg/m³.",
                "precio": 182.00
            },
			{
                "titulo": "Losa de cimentación de hormigón armado",
                "unidad": "m3",
                "descripcion": "Losa de cimentación de hormigón armado, realizada con hormigón HA-25/B/20/IIa fabricado en central, y vertido desde camión, y acero UNE-EN 10080 B 500 S, cuantía 100 kg/m³; acabado superficial liso mediante regla vibrante.",
                "precio": 250.00
            },
			{
                "titulo": "Muro de hormigón armado 30cm",
                "unidad": "m2",
                "descripcion": "Muro de hormigón armado, H<=3 m, espesor 30 cm, realizado con hormigón HA-25/B/20/IIa fabricado en central, y vertido con cubilote, y acero UNE-EN 10080 B 500 S, 70 kg/m³; montaje y desmontaje del sistema de encofrado metálico.",
                "precio": 110.00
            },
			{
                "titulo": "Muro de hormigón armado 20cm",
                "unidad": "m2",
                "descripcion": "Muro de hormigón armado, H<=3 m, espesor 20 cm, realizado con hormigón HA-25/B/20/IIa fabricado en central, y vertido con cubilote, y acero UNE-EN 10080 B 500 S, 60 kg/m³; montaje y desmontaje del sistema de encofrado metálico.",
                "precio": 76.00
            },
			{
                "titulo": "Solera de hormigón armado 15cm",
                "unidad": "m2",
                "descripcion": "Solera de de hormigón armado HA-25/B/20/IIa fabricado en central y vertido con cubilote, de 15 cm de espesor, extendido y vibrado manual, armada con malla electrosoldada ME 15x15 de Ø 5 mm, para base de un solado.",
                "precio": 21.50
            },
			{
                "titulo": "Solera de hormigón armado 15cm acabado pulido",
                "unidad": "m2",
                "descripcion": "Solera de de hormigón armado HA-25/B/20/IIa fabricado en central y vertido con cubilote, de 15 cm de espesor, extendido y vibrado manual, armada con malla electrosoldada ME 15x15 de Ø 5 mm, con acabado pulido mediante fratasado mecánico.",
                "precio": 28.00
            },
        ]
    },
    {
        "capitulo": "Estructura",
        "partidas": [
			{
                "titulo": "Forjado unidireccional 25+5 semivigueta armada con vigas",
                "unidad": "m2",
                "descripcion": "Estructura de hormigón armado HA-25/B/20/IIa vertido con cubilote; acero B 500 S con una cuantía total de 11 kg/m²; forjado unidireccional, horizontal, de canto 30 = 25+5 cm; semivigueta armada con zapatilla de hormigón; bovedilla de hormigón, 60x20x25 cm; malla electrosoldada ME 20x20, Ø 5 mm, acero B 500 T en capa de compresión; vigas planas; altura libre de planta de hasta 3 m",
                "precio": 74.25
            },
			{
                "titulo": "Forjado unidireccional 20+5 semivigueta armada con vigas",
                "unidad": "m2",
                "descripcion": "Estructura de hormigón armado HA-25/B/20/IIa vertido con cubilote; acero B 500 S con una cuantía total de 11 kg/m²; forjado unidireccional, horizontal, de canto 25 = 20+5 cm; semivigueta armada con zapatilla de hormigón; bovedilla de hormigón, 60x20x25 cm; malla electrosoldada ME 20x20, Ø 5 mm, acero B 500 T en capa de compresión; vigas planas; altura libre de planta de hasta 3 m",
                "precio": 72.70
            },
			{
                "titulo": "Forjado unidireccional 25+5 vivigueta pretensada con vigas",
                "unidad": "m2",
                "descripcion": "Estructura de hormigón armado HA-25/B/20/IIa vertido con cubilote; acero B 500 S con una cuantía total de 11 kg/m²; forjado unidireccional, horizontal, de canto 30 = 25+5 cm; vigueta pretensada; bovedilla de hormigón, 60x20x25 cm; malla electrosoldada ME 20x20, Ø 5 mm, acero B 500 T en capa de compresión; vigas planas; altura libre de planta de hasta 3 m.",
                "precio": 77.00
            },
			{
                "titulo": "Forjado unidireccional 20+5 vivigueta pretensada con vigas",
                "unidad": "m2",
                "descripcion": "Estructura de hormigón armado HA-25/B/20/IIa vertido con cubilote; acero B 500 S con una cuantía total de 11 kg/m²; forjado unidireccional, horizontal, de canto 25 = 20+5 cm; vigueta pretensada; bovedilla de hormigón, 60x20x25 cm; malla electrosoldada ME 20x20, Ø 5 mm, acero B 500 T en capa de compresión; vigas planas; altura libre de planta de hasta 3 m.",
                "precio": 75.50
            },
			{
                "titulo": "Forjado de losa maciza 20cm",
                "unidad": "m2",
                "descripcion": "Forjado de losa maciza, horizontal, canto 20 cm; HA-25/B/20/IIa fabricado en central y vertido con cubilote; acero UNE-EN 10080 B 500 S, cuantía 22 kg/m²; encofrado de madera; altura libre de planta de hasta 3 m.",
                "precio": 87.00
            },
			{
                "titulo": "Pilar de hormigón armado 30x30 de 3 metros",
                "unidad": "ud",
                "descripcion": "Pilar de hormigón armado HA-25 N/mm2, Tmáx.20 mm., consistencia plástica elaborado en central, de 30x30 cm., i/p.p. de armadura (100 kg/m3.) y encofrado metálico, vertido con pluma-grúa, vibrado y colocado.",
                "precio": 118.00
            },
			{
                "titulo": "Pilar metálico de 3 metros (HEB120 ó 2UPN120)",
                "unidad": "ud",
                "descripcion": "Pilar de acero laminado S275JR, perfiles laminados en caliente, mediante uniones soldadas; i/p.p. de soldaduras, cortes, piezas especiales, despuntes y dos manos de imprimación con pintura de minio de plomo, montado y colocado.",
                "precio": 205.00
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
    var unidadesTemp = [];
    for(var j in precios[i].partidas) {
        partidasTemp.push('('+precios[i].partidas[j].unidad+') '+precios[i].partidas[j].titulo);
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
        if(partida === '('+precios[numCapitulo].partidas[i].unidad+') '+precios[numCapitulo].partidas[i].titulo) {
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




