//createSequence method creates a new sequence
createSequence(
    'es', //Sequence language
    'Predimensionado de una zapata aislada', //Sequence title
    'Predimensiona una zapata aislada y centrada que está sometida a una carga vertical sin momentos flectores', //Sequence info
    'stepando', //Sequence author
    'contact@stepando.com', //Sequence author email
    '0.2', //Sequence last version
    '16/07/2014', //Sequence last review date
 ['18RHPDCF8qPWLjWDHJ9CKxwXSc9Lom58XR', 'stepando', 'lampantino','https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XDW597BZDGYU6'], //Sequence donation adresses
    'Estos resultados son orientativos y únicamente útiles para un predimensionado.' //Sequence result information
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'carga', //Step reference
    '¿Qué carga vertical está actuando sobre la zapata?', //Step question
    'Input', //Step type
    'Float', //Step option
    'tension', //Next step
    '<p>Ha de introducir la carga en KN y sin mayorar.</p><p>Como referencia puede utilizar una carga de 8KN/m2 para cada planta correspondiente a un forjado unidireccional de 25+5cm y bovedillas de hormigón, con un uso residencial.</p><p>En el caso de tratarse de una cubierta ligera, puede estimar unos 2-3KN/m2.</p><p>Cada pilar de hormigón armado de 30x30cm y 3 metros de altura pesa unos 7KN.</p>' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'tension', //Step reference
    '¿Cuál es la tensión admisible del terreno?', //Step question
    'Input', //Step type
    'Float', //Step option
    'result', //Next step
    'Ha de introducir la tensión en MPa.</br>Puede acceder a unas estimaciones orientativas en el siguiente <a href="/sequences/static/zapata/presionesAdmisibles.jpg" target="_blank">enlace</a>.' //Step info
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
        for (var j = 3; j <= 10; j++) {
            var cuantiaProp = Math.PI * Math.pow((redondos[i] / 1000 / 2),2) * j;
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