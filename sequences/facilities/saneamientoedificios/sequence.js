//CreateSequence method creates a new sequence
createSequence(
    'es', //Sequence language (en, es, gl, eu, ct, de, pt, it, fr, ru, zh)
    'Cálculo de las secciones de conductos de saneamiento', //Sequence title
    'Calcula las secciones de conductos de saneamiento de edificios tanto de fecales como de pluviales.', //Sequence info
    'stepando', //Sequence author
    'contact@stepando.com', //Sequence author email
    '0.1', //Sequence last version
    '16/07/2014', //Sequence last review date
 ['1FT8c67hiyXahzqbvPNAxciPCjPVwPczaV', 'stepando', 'lampantino', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XDW597BZDGYU6'], //Sequence donation adresses (BTC adress, flattr username, gittip username, paypal link)
    'Este resultado se ha obtenido utilizando el método de cálculo que figura en el Documento Básico <a href="http://www.codigotecnico.org/cte/export/sites/default/web/galerias/archivos/DB_HS_2009.pdf">HS5</a> del Código Técnico de la Edificación.' //Sequence result information
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'tipoRed', //Step reference
    '¿Qué tipo de red pertenece el conducto?', //Step question
    'select', //Step type (input or select)
    ['Fecales','Pluviales'], //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Elija uno de los dos tipos de red.' //Step info
);

var tipoRed_nextStep = function () {
    if(getAnswer('tipoRed') === 'Fecales') {
        return 'fecales';
    } else {
        return 'pluviales';
    }
};

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'fecales', //Step reference
    '¿Cuál es la función del conducto a calcular?', //Step question
    'select', //Step type (input or select)
    ['Sifón o derivación individual de algún aparato sanitario','Colector horizontal','Bajante' ], //Step option (integer, float, string, email, url)
    '', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione uno de los casos.' //Step info
);

var fecales_nextStep = function () {
    if(getAnswer('fecales') === 'Sifón o derivación individual de algún aparato sanitario') {
        return 'derivación';
    } else if (getAnswer('fecales') === 'Colector horizontal') {
        return 'colector';
    } else {
        return 'bajante';
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
    'colector', //Step reference
    '¿Cuántas unidades de desagüe pasarán por el conducto?', //Step question
    'input', //Step type (input or select)
    'integer', //Step option (integer, float, string, email, url)
    'pendienteColector', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Para saber el número de las unidades de desagüe en función de los aparatos a los que sirve, puede utilizar la <a href="/sequences/facilities/saneamientoedificios/colectores.png" target="_blank">tabla 4.1</a> del CTE DB-HS5.' //Step info
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    'pendienteColector', //Step reference
    '¿Cuál es la pendiente del colector?', //Step question
    'select', //Step type (input or select)
    ['1%', '2%', '4%'], //Step option (integer, float, string, email, url)
    'result', //Next step (next step reference, an empty string ('') or 'result' for run de sequenceResult() method)
    'Seleccione la pendiente del colector.' //Step info
);




//AddStep methods creates new steps and adds them to the sequence
addStep(
    'bajante', //Step reference
    'bajante', //Step question
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
    'pluviales', //Step reference
    'pluviales', //Step question
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

/*
SequenceResult function contains the sequence logic and returns the result.
With the getAnswer('step reference') method you can get the entered answer for each step.
*/
function sequenceResult() {
    var result;
    
    //Caso Fecales->Derivación individual
    if(getAnswer('tipoRed') === 'Fecales' && getAnswer('fecales') === 'Sifón o derivación individual de algún aparato sanitario') {
        var tipoAparato = getAnswer('derivación');
        result = tipoAparato +': ';
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
    
    //Caso Fecales->Colector
    if(getAnswer('tipoRed') === 'Fecales' && getAnswer('fecales') === 'Colector horizontal') {
        var unidadesDesague = getAnswer('colector');
        result = 'Para '+unidadesDesague+' UD a un '+getAnswer('pendienteColector')+' de pendiente: ';
        if(getAnswer('pendienteColector') === '1%') {
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
        } else if(getAnswer('pendienteColector') === '2%') {
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
    if(getAnswer('tipoRed') === 'Fecales' && getAnswer('fecales') === 'Bajante') {}
    
    

    return result;
}