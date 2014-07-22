//CreateSequence method creates a new sequence
createSequence(
    'es', //Sequence language (en, es, gl, eu, ct, de, pt, it, fr, ru, zh)
    'Cálculo de las secciones de conductos de saneamiento', //Sequence title
    'Calcula las secciones de conductos de saneamiento de edificios tanto de fecales como de pluviales.', //Sequence info
    'stepando', //Sequence author
    'contact@stepando.com', //Sequence author email
    '0.1', //Sequence last version
    '17/07/2014', //Sequence last review date
 ['1FT8c67hiyXahzqbvPNAxciPCjPVwPczaV', 'stepando', 'lampantino', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XDW597BZDGYU6'], //Sequence donation adresses (BTC adress, flattr username, gittip username, paypal link)
    'Este resultado se ha obtenido utilizando el método de cálculo que figura en el Documento Básico <a href="http://www.codigotecnico.org/cte/export/sites/default/web/galerias/archivos/DB_HS_2009.pdf">HS5</a> del Código Técnico de la Edificación.' //Sequence result information
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'tipoRed', //Step reference
    '¿A qué tipo de red pertenece el conducto?', //Step question
    'select', //Step type (input or select)
    ['Fecales','Pluviales'], //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Elija uno de los dos tipos de red.' //Step info
);

var tipoRed_nextStep = function () {
    if(getAnswer('tipoRed') === 'Fecales') {
        return 'fecales';
    } else {
        return 'superficieCubierta';
    }
};

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'fecales', //Step reference
    '¿Cuál es la función del conducto a calcular?', //Step question
    'select', //Step type (input or select)
    ['Sifón o derivación individual de algún aparato sanitario','Ramal colector','Bajante', 'Colector horizontal' ], //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione entre la derivación de cada aparato o sifón, el ramal que une estas derivaciones con la bajante, la bajante o el colector horizontal posterior a la bajante.' //Step info
);

var fecales_nextStep = function () {
    if(getAnswer('fecales') === 'Sifón o derivación individual de algún aparato sanitario') {
        return 'derivación';
    } else {
        return 'unidadesDesague';
    }
};

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'derivación', //Step reference
    '¿A qué aparato sanitario contecta el conducto?', //Step question
    'select', //Step type (input or select)
    ['Lavabo','Bidé','Ducha','Bañera','Inodoro con cisterna','Inodoro con fluxómetro','Urinario sobre pedestal','Urinario suspendido','Fregadero de cocina','Fregadero de laboratorio, restaurante, etc','Lavadero','Vertedero','Fuente para beber','Sumidero sifónico','Lavavajillas','Lavadora','Cuarto de baño','Cuarto de aseo'], //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione el tipo de aparato al que está conectado el conducto cuya sección va a calcular.' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'unidadesDesague', //Step reference
    '¿Cuántas unidades de desagüe pasarán por el conducto?', //Step question
    'input', //Step type (input or select)
    'integer', //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Para saber el número de las unidades de desagüe en función de los aparatos a los que sirve, puede utilizar la <a href="/sequences/facilities/saneamientoedificios/colectores.png" target="_blank">tabla 4.1</a> del CTE DB-HS5.' //Step info
);

var unidadesDesague_nextStep = function () {
    if(getAnswer('fecales') === 'Ramal colector') {
        return 'pendienteRamal';
    } else if(getAnswer('fecales') === 'Bajante') {
        return 'alturasBajante';
    } else {
        return 'pendienteColector';
    }
};

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'pendienteRamal', //Step reference
    '¿Cuál es la pendiente del ramal?', //Step question
    'select', //Step type (input or select)
    ['1%', '2%', '4%'], //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione la pendiente del ramal.' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'alturasBajante', //Step reference
    '¿Cuántas alturas tiene la bajante?', //Step question
    'select', //Step type (input or select)
    ['Hasta 3 plantas','Más de 3 plantas'], //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione una de las dos opciones disponibles.' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'pendienteColector', //Step reference
    '¿Cuál es la pendiente del colector horizontal?', //Step question
    'select', //Step type (input or select)
    ['1%', '2%', '4%'], //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione la pendiente del colector.' //Step info
);


//AddStep methods creates new steps and adds them to the sequence
addStep(
    'superficieCubierta', //Step reference
    '¿Cuál es la superficie de la cubierta?', //Step question
    'input', //Step type (input or select)
    'float', //Step option (integer, float, string, email, url)
    'intensidadPluviometrica', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Introduzca la superficie de la cubierta en proyección horizontal y en m2.' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'intensidadPluviometrica', //Step reference
    '¿Cuál es la intensidad pluviométrica?', //Step question
    'input', //Step type (input or select)
    'float', //Step option (integer, float, string, email, url)
    'conductoPluviales', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Para obtener la intensidad pluviométrica de la ubicación de la cubierta, puede utilizar la figura B.1 y la tabla B.1 del <a href="/sequences/facilities/saneamientoedificios/pluviometria.png" target="_blank">Apéndice B</a> del CTE DB-HS5.<br/>Introduzca el valor en mm/h.' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'conductoPluviales', //Step reference
    '¿Cuál es la función del conducto a calcular?', //Step question
    'select', //Step type (input or select)
    ['Canalón', 'Bajante', 'Colector horizontal' ], //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione una de las opciones disponibles.' //Step info
);

var conductoPluviales_nextStep = function () {
    if(getAnswer('conductoPluviales') === 'Canalón') {
        return 'pendienteCanalon';
    } else if(getAnswer('conductoPluviales') === 'Bajante') {
        return 'result';
    } else {
        return 'pendienteColectorPluviales';
    }
};

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'pendienteCanalon', //Step reference
    '¿Cuál es la pendiente del canalón?', //Step question
    'select', //Step type (input or select)
    ['0.5%' ,'1%', '2%', '4%'], //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione la pendiente del canalón.' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'pendienteColectorPluviales', //Step reference
    '¿Cuál es la pendiente del colector de pluviales?', //Step question
    'select', //Step type (input or select)
    ['1%', '2%', '4%'], //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione la pendiente del colector de pluviales.' //Step info
);

/*
SequenceResult function contains the sequence logic and returns the result.
With the getAnswer('step reference') method you can get the entered answer for each step.
*/
function sequenceResult() {
    var result;
    
    //Caso Fecales->Derivación individual
    if(getAnswer('tipoRed') === 'Fecales' && getAnswer('fecales') === 'Sifón o derivación individual de algún aparato sanitario') {
        var tipoAparato = getAnswer('derivación');
        result = tipoAparato +' = ';
        switch (tipoAparato) {
            case 'Lavabo':
                result += 'Ø32mm para uso privado y Ø40mm para uso público';
                break;
            case 'Lavabo':
                result += 'Ø32mm para uso privado y Ø40mm para uso público';
                break;
            case 'Bidé':
                result += 'Ø32mm para uso privado y Ø40mm para uso público';
                break;
            case 'Ducha':
                result += 'Ø40mm para uso privado y Ø50mm para uso público';
                break;
            case 'Bañera':
                result += 'Ø40mm para uso privado y Ø50mm para uso público';
                break;
            case 'Inodoro con cisterna':
                result += 'Ø100mm para uso privado y público';
                break;
            case 'Inodoro con fluxómetro':
                result += 'Ø100mm para uso privado y público';
                break;
            case 'Urinario sobre pedestal':
                result += 'Ø50mm para uso público';
                break;
            case 'Urinario suspendido':
                result += 'Ø40mm para uso público';
                break;
            case 'Fregadero de cocina':
                result += 'Ø40mm para uso privado y Ø50mm para uso público';
                break;
            case 'Fregadero de laboratorio, restaurante, etc':
                result += 'Ø40mm para uso público';
                break;
            case 'Lavadero':
                result += 'Ø40mm para uso privado';
                break;
            case 'Vertedero':
                result += 'Ø100mm para uso público';
                break;
            case 'Fuente para beber':
                result += 'Ø25mm para uso público';
                break;
            case 'Sumidero sifónico':
                result += 'Ø40mm para uso privado y Ø50mm para uso público';
                break;
            case 'Lavavajillas':
                result += 'Ø40mm para uso privado y Ø50mm para uso público';
                break;
            case 'Lavadora':
                result += 'Ø40mm para uso privado y Ø50mm para uso público';
                break;
            case 'Cuarto de baño':
                result += 'Ø100mm para uso privado';
                break;
            case 'Cuarto de aseo':
                result += 'Ø100mm para uso privado';
                break;
        }
    }
    
    //Caso Fecales->Ramal
    if(getAnswer('tipoRed') === 'Fecales' && getAnswer('fecales') === 'Ramal colector') {
        var unidadesDesague = getAnswer('unidadesDesague');
        result = 'La sección del ramal colector para '+unidadesDesague+' UD a un '+getAnswer('pendienteRamal')+' de pendiente = ';
        if(getAnswer('pendienteRamal') === '1%') {
            if(unidadesDesague <= 47) {
                result += 'Ø90mm';
            } else if(unidadesDesague > 47 && unidadesDesague <= 123) {
                result += 'Ø110mm';
            } else if(unidadesDesague > 123 && unidadesDesague <= 180) {
                result += 'Ø125mm';
            } else if(unidadesDesague > 180 && unidadesDesague <= 438) {
                result += 'Ø160mm';
            } else if(unidadesDesague > 438 && unidadesDesague <= 870) {
                result += 'Ø200mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        } else if(getAnswer('pendienteRamal') === '2%') {
            if(unidadesDesague <= 1) {
                result += 'Ø32mm';
            } else if(unidadesDesague > 1 && unidadesDesague <= 2) {
                result += 'Ø40mm';
            } else if(unidadesDesague > 2 && unidadesDesague <= 6) {
                result += 'Ø50mm';
            } else if(unidadesDesague > 6 && unidadesDesague <= 11) {
                result += 'Ø63mm';
            } else if(unidadesDesague > 11 && unidadesDesague <= 21) {
                result += 'Ø75mm';
            } else if(unidadesDesague > 21 && unidadesDesague <= 60) {
                result += 'Ø90mm';
            } else if(unidadesDesague > 60 && unidadesDesague <= 151) {
                result += 'Ø110mm';
            } else if(unidadesDesague > 151 && unidadesDesague <= 234) {
                result += 'Ø125mm';
            } else if(unidadesDesague > 234 && unidadesDesague <= 582) {
                result += 'Ø160mm';
            } else if(unidadesDesague > 582 && unidadesDesague <= 1150) {
                result += 'Ø200mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        } else {
            if(unidadesDesague <= 1) {
                result += 'Ø32mm';
            } else if(unidadesDesague > 1 && unidadesDesague <= 3) {
                result += 'Ø40mm';
            } else if(unidadesDesague > 3 && unidadesDesague <= 8) {
                result += 'Ø50mm';
            } else if(unidadesDesague > 8 && unidadesDesague <= 14) {
                result += 'Ø63mm';
            } else if(unidadesDesague > 14 && unidadesDesague <= 28) {
                result += 'Ø75mm';
            } else if(unidadesDesague > 28 && unidadesDesague <= 75) {
                result += 'Ø90mm';
            } else if(unidadesDesague > 75 && unidadesDesague <= 181) {
                result += 'Ø110mm';
            } else if(unidadesDesague > 181 && unidadesDesague <= 280) {
                result += 'Ø125mm';
            } else if(unidadesDesague > 280 && unidadesDesague <= 800) {
                result += 'Ø160mm';
            } else if(unidadesDesague > 800 && unidadesDesague <= 1680) {
                result += 'Ø200mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        }
    }
    
    //Caso Fecales->Bajante
    if(getAnswer('tipoRed') === 'Fecales' && getAnswer('fecales') === 'Bajante') {
        var unidadesDesague = getAnswer('unidadesDesague');
        result = 'La sección de la bajante para '+unidadesDesague+' UD ';
        if(getAnswer('alturasBajante') === 'Hasta 3 plantas') {
            result += 'hasta 3 plantas = ';
            if(unidadesDesague <= 10) {
                result += 'Ø50mm';
                result += '<br/>Las bajantes que sirvan a inodoros serán como mínimo de Ø110mm';
            } else if(unidadesDesague > 10 && unidadesDesague <= 19) {
                result += 'Ø63mm';
                result += '<br/>Las bajantes que sirvan a inodoros serán como mínimo de Ø110mm';
            } else if(unidadesDesague > 19 && unidadesDesague <= 27) {
                result += 'Ø75mm';
                result += '<br/>Las bajantes que sirvan a inodoros serán como mínimo de Ø110mm';
            } else if(unidadesDesague > 27 && unidadesDesague <= 135) {
                result += 'Ø90mm';
                result += '<br/>Las bajantes que sirvan a inodoros serán como mínimo de Ø110mm';
            } else if(unidadesDesague > 135 && unidadesDesague <= 360) {
                result += 'Ø110mm';
            } else if(unidadesDesague > 360 && unidadesDesague <= 540) {
                result += 'Ø125mm';
            } else if(unidadesDesague > 540 && unidadesDesague <= 1208) {
                result += 'Ø160mm';
            } else if(unidadesDesague > 1208 && unidadesDesague <= 2200) {
                result += 'Ø200mm';
            } else if(unidadesDesague > 2200 && unidadesDesague <= 3800) {
                result += 'Ø250mm';
            } else if(unidadesDesague > 3800 && unidadesDesague <= 6000) {
                result += 'Ø315mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        } else {
            result += 'más de 3 plantas = ';
            if(unidadesDesague <= 25) {
                result += 'Ø50mm';
                result += '<br/>Las bajantes que sirvan a inodoros serán como mínimo de Ø110mm';
            } else if(unidadesDesague > 25 && unidadesDesague <= 38) {
                result += 'Ø63mm';
                result += '<br/>Las bajantes que sirvan a inodoros serán como mínimo de Ø110mm';
            } else if(unidadesDesague > 38 && unidadesDesague <= 53) {
                result += 'Ø75mm';
                result += '<br/>Las bajantes que sirvan a inodoros serán como mínimo de Ø110mm';
            } else if(unidadesDesague > 53 && unidadesDesague <= 280) {
                result += 'Ø90mm';
                result += '<br/>Las bajantes que sirvan a inodoros serán como mínimo de Ø110mm';
            } else if(unidadesDesague > 280 && unidadesDesague <= 740) {
                result += 'Ø110mm';
            } else if(unidadesDesague > 740 && unidadesDesague <= 1100) {
                result += 'Ø125mm';
            } else if(unidadesDesague > 1100 && unidadesDesague <= 2240) {
                result += 'Ø160mm';
            } else if(unidadesDesague > 2240 && unidadesDesague <= 3600) {
                result += 'Ø200mm';
            } else if(unidadesDesague > 3600 && unidadesDesague <= 5600) {
                result += 'Ø250mm';
            } else if(unidadesDesague > 5600 && unidadesDesague <= 9240) {
                result += 'Ø315mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        }
    }
    
    //Caso Fecales->Colector
    if(getAnswer('tipoRed') === 'Fecales' && getAnswer('fecales') === 'Colector horizontal') {
        var unidadesDesague = getAnswer('unidadesDesague');
        result = 'La sección del colector horizontal para '+unidadesDesague+' UD a un '+getAnswer('pendienteColector')+' de pendiente = ';
        if(getAnswer('pendienteColector') === '1%') {
            if(unidadesDesague <= 96) {
                result += 'Ø90mm';
            } else if(unidadesDesague > 96 && unidadesDesague <= 264) {
                result += 'Ø110mm';
            } else if(unidadesDesague > 264 && unidadesDesague <= 390) {
                result += 'Ø125mm';
            } else if(unidadesDesague > 390 && unidadesDesague <= 880) {
                result += 'Ø160mm';
            } else if(unidadesDesague > 880 && unidadesDesague <= 1600) {
                result += 'Ø200mm';
            } else if(unidadesDesague > 1600 && unidadesDesague <= 2900) {
                result += 'Ø250mm';
            } else if(unidadesDesague > 2900 && unidadesDesague <= 5710) {
                result += 'Ø315mm';
            } else if(unidadesDesague > 5710 && unidadesDesague <= 8300) {
                result += 'Ø350mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        } else if(getAnswer('pendienteColector') === '2%') {
            if(unidadesDesague <= 20) {
                result += 'Ø50mm';
            } else if(unidadesDesague > 20 && unidadesDesague <= 24) {
                result += 'Ø63mm';
            } else if(unidadesDesague > 24 && unidadesDesague <= 38) {
                result += 'Ø75mm';
            } else if(unidadesDesague > 38 && unidadesDesague <= 130) {
                result += 'Ø90mm';
            } else if(unidadesDesague > 130 && unidadesDesague <= 321) {
                result += 'Ø110mm';
            } else if(unidadesDesague > 321 && unidadesDesague <= 480) {
                result += 'Ø125mm';
            } else if(unidadesDesague > 480 && unidadesDesague <= 1056) {
                result += 'Ø160mm';
            } else if(unidadesDesague > 1056 && unidadesDesague <= 1920) {
                result += 'Ø200mm';
            } else if(unidadesDesague > 1920 && unidadesDesague <= 3500) {
                result += 'Ø250mm';
            } else if(unidadesDesague > 3500 && unidadesDesague <= 6920) {
                result += 'Ø315mm';
            } else if(unidadesDesague > 6920 && unidadesDesague <= 10000) {
                result += 'Ø350mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        } else {
            if(unidadesDesague <= 25) {
                result += 'Ø50mm';
            } else if(unidadesDesague > 25 && unidadesDesague <= 29) {
                result += 'Ø63mm';
            } else if(unidadesDesague > 29 && unidadesDesague <= 57) {
                result += 'Ø75mm';
            } else if(unidadesDesague > 57 && unidadesDesague <= 160) {
                result += 'Ø90mm';
            } else if(unidadesDesague > 160 && unidadesDesague <= 382) {
                result += 'Ø110mm';
            } else if(unidadesDesague > 382 && unidadesDesague <= 580) {
                result += 'Ø125mm';
            } else if(unidadesDesague > 580 && unidadesDesague <= 1300) {
                result += 'Ø160mm';
            } else if(unidadesDesague > 1300 && unidadesDesague <= 2300) {
                result += 'Ø200mm';
            } else if(unidadesDesague > 2300 && unidadesDesague <= 4200) {
                result += 'Ø250mm';
            } else if(unidadesDesague > 4200 && unidadesDesague <= 8290) {
                result += 'Ø315mm';
            } else if(unidadesDesague > 8290 && unidadesDesague <= 12000) {
                result += 'Ø350mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        }
    }
    
    //Caso Pluviales->Canalón
    if(getAnswer('tipoRed') === 'Pluviales' && getAnswer('conductoPluviales') === 'Canalón') {
        var superficie = getAnswer('superficieCubierta')*getAnswer('intensidadPluviometrica')/100;
        result = 'La sección del canalón para '+getAnswer('superficieCubierta')+'m2 de cubierta a un '+getAnswer('pendienteCanalon')+' de pendiente = ';
        if(getAnswer('pendienteCanalon') === '0.5%') {
            if(superficie <= 35) {
                result += 'Ø100mm';
            } else if(superficie > 35 && superficie <= 60) {
                result += 'Ø125mm';
            } else if(superficie > 60 && superficie <= 90) {
                result += 'Ø150mm';
            } else if(superficie > 90 && superficie <= 185) {
                result += 'Ø200mm';
            } else if(superficie > 185 && superficie <= 335) {
                result += 'Ø250mm';
            } else {
                result += 'No existe una sección válida';
            }
        } else if(getAnswer('pendienteCanalon') === '1%') {
            if(superficie <= 45) {
                result += 'Ø100mm';
            } else if(superficie > 45 && superficie <= 80) {
                result += 'Ø125mm';
            } else if(superficie > 80 && superficie <= 125) {
                result += 'Ø150mm';
            } else if(superficie > 125 && superficie <= 260) {
                result += 'Ø200mm';
            } else if(superficie > 260 && superficie <= 475) {
                result += 'Ø250mm';
            } else {
                result += 'No existe una sección válida';
            }
        } else if(getAnswer('pendienteCanalon') === '2%') {
            if(superficie <= 65) {
                result += 'Ø100mm';
            } else if(superficie > 65 && superficie <= 115) {
                result += 'Ø125mm';
            } else if(superficie > 115 && superficie <= 175) {
                result += 'Ø150mm';
            } else if(superficie > 175 && superficie <= 370) {
                result += 'Ø200mm';
            } else if(superficie > 370 && superficie <= 670) {
                result += 'Ø250mm';
            } else {
                result += 'No existe una sección válida';
            }
        } else {
            if(superficie <= 95) {
                result += 'Ø100mm';
            } else if(superficie > 95 && superficie <= 165) {
                result += 'Ø125mm';
            } else if(superficie > 165 && superficie <= 255) {
                result += 'Ø150mm';
            } else if(superficie > 255 && superficie <= 520) {
                result += 'Ø200mm';
            } else if(superficie > 520 && superficie <= 930) {
                result += 'Ø250mm';
            } else {
                result += 'No existe una sección válida';
            }
        }
    }
    
    //Caso Pluviales->Bajante
    if(getAnswer('tipoRed') === 'Pluviales' && getAnswer('conductoPluviales') === 'Bajante') {
        var superficie = getAnswer('superficieCubierta')*getAnswer('intensidadPluviometrica')/100;
        result = 'La sección de la bajante para '+getAnswer('superficieCubierta')+'m2 de cubierta = ';
        if(superficie <= 65) {
            result += 'Ø50mm';
        } else if(superficie > 65 && superficie <= 113) {
            result += 'Ø63mm';
        } else if(superficie > 113 && superficie <= 177) {
            result += 'Ø75mm';
        } else if(superficie > 177 && superficie <= 318) {
            result += 'Ø90mm';
        } else if(superficie > 318 && superficie <= 580) {
            result += 'Ø110mm';
        } else if(superficie > 580 && superficie <= 805) {
            result += 'Ø125mm';
        } else if(superficie > 805 && superficie <= 1544) {
            result += 'Ø160mm';
        } else if(superficie > 1544 && superficie <= 2700) {
            result += 'Ø200mm';
        } else {
            result += 'No existe una sección válida';
        }
    }

    //Caso Pluviales->Colector horizontal
    if(getAnswer('tipoRed') === 'Pluviales' && getAnswer('conductoPluviales') === 'Colector horizontal') {
        var superficie = getAnswer('superficieCubierta')*getAnswer('intensidadPluviometrica')/100;
        result = 'La sección del colector para '+getAnswer('superficieCubierta')+'m2 de cubierta a un '+getAnswer('pendienteColectorPluviales')+' de pendiente = ';
        if(getAnswer('pendienteColectorPluviales') === '1%') {
            if(superficie <= 125) {
                result += 'Ø90mm';
            } else if(superficie > 125 && superficie <= 229) {
                result += 'Ø110mm';
            } else if(superficie > 229 && superficie <= 310) {
                result += 'Ø125mm';
            } else if(superficie > 310 && superficie <= 614) {
                result += 'Ø160mm';
            } else if(superficie > 614 && superficie <= 1070) {
                result += 'Ø200mm';
            } else if(superficie > 1070 && superficie <= 1920) {
                result += 'Ø250mm';
            } else if(superficie > 1920 && superficie <= 2016) {
                result += 'Ø315mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        } else if(getAnswer('pendienteColectorPluviales') === '2%') {
            if(superficie <= 178) {
                result += 'Ø90mm';
            } else if(superficie > 178 && superficie <= 323) {
                result += 'Ø110mm';
            } else if(superficie > 323 && superficie <= 440) {
                result += 'Ø125mm';
            } else if(superficie > 440 && superficie <= 862) {
                result += 'Ø160mm';
            } else if(superficie > 862 && superficie <= 1510) {
                result += 'Ø200mm';
            } else if(superficie > 1510 && superficie <= 2710) {
                result += 'Ø250mm';
            } else if(superficie > 2710 && superficie <= 4589) {
                result += 'Ø315mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        } else {
            if(superficie <= 253) {
                result += 'Ø90mm';
            } else if(superficie > 253 && superficie <= 458) {
                result += 'Ø110mm';
            } else if(superficie > 458 && superficie <= 620) {
                result += 'Ø125mm';
            } else if(superficie > 620 && superficie <= 1228) {
                result += 'Ø160mm';
            } else if(superficie > 1228 && superficie <= 2140) {
                result += 'Ø200mm';
            } else if(superficie > 2140 && superficie <= 3850) {
                result += 'Ø250mm';
            } else if(superficie > 3850 && superficie <= 6500) {
                result += 'Ø315mm';
            } else {
                result += 'No existe una sección de conducto válida';
            }
        }
    }
    
    return result;
}