//createSequence method creates a new sequence
createSequence(
    'es', //Sequence language
    'Predimensionado de una zapata aislada', //Sequence title
    'Predimensiona una zapata en función de las cargas introducidas y de la tensión admisible del terreno', //Sequence info
    'Lampantino', //Sequence author
    'sre.quereck@gmail.com', //Sequence author email
    '0.1', //Sequence last version
    '6/12/2013', //Sequence last review date
 ['1NYcpukkrV6UywyJkggWkv7FwhDhijtM1C', 'https://flattr.com/submit/auto?user_id=lampantino&url=https%3A%2F%2Fc9.io%2Flampantino%2Fstepando%2Fworkspace%2Findex.html%3Fengineering%26vigaacero', 'https://www.gittip.com/lampantino'], //Sequence donation adresses
    'Estos resultados son orientativos y únicamente útiles para un predimensionado' //Sequence result information
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'carga', //Step reference
    '¿Qué carga vertical está actuando sobre la zapata?', //Step question
    'Input', //Step type
    'Float', //Step option
    'tension', //Next step
    'Ha de introducir la carga en KN' //Step info
);
/*
addStep(
    'pilar', //Step reference
    '¿Cuánto mide el lado del pilar que se apoya en la zapata?', //Step question
    'Input', //Step type
    'Float', //Step option
    'tension', //Next step
    'Ha de introducir la dimensión en m' //Step info
);
*/
addStep(
    'tension', //Step reference
    '¿Cuál es la tensión admisible del terreno?', //Step question
    'Input', //Step type
    'Float', //Step option
    'result', //Next step
    'Ha de introducir la tensión en MPa' //Step info
);

//sequenceResult function contains the sequence logic and returns the result
function sequenceResult() {

    var lado, canto;
    var carga = getAnswer('carga');
    var tension = getAnswer('tension') * 1000;
    var momento, cuantia;
    var redondos = [10, 12, 16, 20];
    var densidadAcero = 7850;
    var pesoAcero = 0;
    var diametroRedondos;
    var numeroRedondos;
    var separacion;

    var resultado;

    lado = Math.sqrt(carga / tension);
    canto = (lado - 0.3) / 4;
    if (canto < 0.4) {
        canto = 0.4;
    }
    momento = 1.6 * tension * lado ^ 2 / 8;
    cuantia = momento / (0.8 * canto * 500 * 1000 / 1.15);

    for (var i = 0; i < redondos.length; i++) {
        for (var j = 3; j < 10; j++) {
            var cuantiaProp = Math.PI * Math.pow((redondos[i] / 1000 / 2),2) * j;
            alert(j+' redondos de diámetro '+redondos[i]+' = '+cuantiaProp); 
            if (cuantiaProp >= cuantia) {
                var pesoProp = cuantiaProp * densidadAcero;
                if (pesoAcero === 0) {
                    pesoAcero = pesoProp;
                    diametroRedondos = redondos[i];
                    numeroRedondos = j;
                }
                if (pesoProp < pesoAcero) {
                    pesoAcero = pesoProp;
                    diametroRedondos = redondos[i];
                    numeroRedondos = j;
                }
            }
        }
    }
    
    lado = Math.round(lado * 100);
    canto = Math.round(canto * 100);
    separacion = Math.round(100/numeroRedondos);
    if(separacion > 30) {
        var peso = pesoAcero*(separacion/100);
        separacion = 30;
        pesoAcero = peso/0.3;
    }
    
    pesoAcero = pesoAcero.toFixed(2);

    resultado = 'La zapata necesaria es de ' + lado + 'X' + lado + 'X' + canto + ' cm</br>con una armadura de redondos del diámetro ' +diametroRedondos+' cada '+separacion+' cm ('+pesoAcero+' kg/m)';
    return resultado;
}