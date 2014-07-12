//createSequence method creates a new sequence
createSequence(
    'es', //Sequence language
    'Calcular una viga de acero', //Sequence title
    'Calcula la viga de acero necesaria en función de las dimensiones, los enlaces y las cargas introducidas', //Sequence info
    'stepando', //Sequence author
    'contact@stepando.com', //Sequence author email
    '0.4', //Sequence last version
    '7/6/2014', //Sequence last review date
 ['1NYcpukkrV6UywyJkggWkv7FwhDhijtM1C', 'lampantino', 'lampantino', 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=sre%2equereck%40gmail%2ecom&lc=ES&item_name=Stepando&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest'], //Sequence donation adresses
    'Estos resultados son orientativos y únicamente útiles para un predimensionado' //Sequence result information
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'luz', //Step reference
    '¿Qué luz tiene la viga?', //Step question
    'Input', //Step type
    'Float', //Step option
    'faja', //Next step
    'Ha de introducir la dimensión en metros entre apoyos' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'faja', //Step reference
    '¿Qué faja de carga tiene el paño?', //Step question
    'Input', //Step type
    'Float', //Step option
    'enlaces', //Next step
    'Ha de introducir la dimensión en metros entre vigas contiguas' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'enlaces', //Step reference
    '¿Qué tipo de enlaces tiene la viga?', //Step question
    'Select', //Step type
 ['Articulado-Articulado', 'Articulado-Empotrado', 'Empotrado-Empotrado', 'Voladizo'], //Step option
    'pesoPropio', //Next step
    'Seleccione cómo se conecta la viga a su apoyo' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'pesoPropio', //Step reference
    '¿Cuál es el peso propio del forjado?', //Step question
    'Input', //Step type
    'Float', //Step option
    'sobrecarga', //Next step
    'Ha de introducir el peso en kN/m2 sin mayorar' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'sobrecarga', //Step reference
    '¿Cuál es la sobrecarga del forjado?', //Step question
    'Input', //Step type
    'Float', //Step option
    'perfil', //Next step
    'Ha de introducir el peso en kN/m2 sin mayorar' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'perfil', //Step reference
    '¿A qué serie pertenece el perfil que desea calcular?', //Step question
    'Select', //Step type
 ['IPE', 'IPN', 'HEA', 'HEB', 'HEM', 'UPE', 'UPN', 'CHS (tubo circular conformado en caliente)', 'SHS (tubo cuadrado conformado en caliente)', 'RHS (tubo rectangular conformado en caliente)', 'L (lados iguales)', 'L (lados desiguales)', 'Zeta (conformado en frío)', 'Ce (conformado en frío)'], //Step option
    'limite', //Next step
    'Seleccione una serie' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'limite', //Step reference
    'La viga ha de ser lo suficientemente rígida como para soportar:', //Step question
    'Select', //Step type
 ['Tabiques frágiles', 'Tabiques ordinarios', 'El resto de los casos'], //Step option
    'result', //Next step
    'Según lo indicado en el <a href="http://www.codigotecnico.org/web/recursos/documentos/dbse/se1/050.html" target="_blank">CTE DB-SE</a>' //Step info
);

//sequenceResult function contains the sequence logic and returns the result
function sequenceResult() {
    // Definición de constantes
    var mPP = 1.35; // Coeficiente de mayoración del peso propio
    var mSC = 1.50; // Coeficiente de mayoración de la sobrecarga
    var tensionAcero = 261904.76; // Tensión admisible del acero en KN/m2
    var moduloAcero = 210000000; // Módulo de elasticidad lineal del acero en KN/m2

    var resultado;

    // Definición de la clase viga
    var viga = function (vLuz, vFaja, vCoefMom, vCoefFle, vInercia, vModulo, vFlechaLimite, vPesoPropio, vSobreCarga) {
        // Propiedades
        // Geometría	
        var luz = vLuz; // en m
        var faja = vFaja; // en m
        var coefMom = vCoefMom; //coeficiente para calcular el momento
        var coefFle = vCoefFle; //coeficiente para calcular la flecha
        var inercia = vInercia; // en cm4
        var modulo = vModulo; // en cm3
        var flechaLimite = vFlechaLimite; // en m
        // Acciones
        var pesoPropio = vPesoPropio; // en KN/m2
        var sobreCarga = vSobreCarga; // en KN/m2

        // Métodos
        // Función que devuelve el módulo necesario de una viga isostática (en cm3)
        this.calculoModulo = function () {
            var cargaLinealMayorada = (pesoPropio * mPP + sobreCarga * mSC) * faja;
            return (cargaLinealMayorada * luz * luz / coefMom) * 1000000 / tensionAcero;
        };
        // Función que devuelve la inercia necesaria de una viga isostática (en cm4)
        this.calculoInercia = function () {
            var cargaLineal = (pesoPropio * 1 + sobreCarga * 1) * faja;
            return (coefFle * cargaLineal * luz * luz * luz * luz) * 100000000 / (moduloAcero * luz / flechaLimite);
        };
        //Función que devuelve la propiedad solicitada
        this.getVigaData = function (variable) {
            var answer;
            switch (variable) {
            case 'luz':
                answer = luz;
                break;
            case 'faja':
                answer = faja;
                break;
            case 'coefMom':
                answer = coefMom;
                break;
            case 'coefFle':
                answer = coefFle;
                break;
            case 'inercia':
                answer = inercia;
                break;
            case 'modulo':
                answer = modulo;
                break;
            case 'flecha':
                answer = flechaLimite;
                break;
            case 'pesoPropio':
                answer = pesoPropio;
                break;
            case 'sobreCarga':
                answer = sobreCarga;
                break;
            }
            return answer;
        };
        //Método que modifica la propiedad solicitada
        this.setVigaData = function (variable, dato) {
            switch (variable) {
            case 'luz':
                luz = dato;
                break;
            case 'faja':
                faja = dato;
                break;
            case 'coefMom':
                coefMom = dato;
                break;
            case 'coefFle':
                coefFle = dato;
                break;
            case 'inercia':
                inercia = dato;
                break;
            case 'modulo':
                modulo = dato;
                break;
            case 'flecha':
                flechaLimite = dato;
                break;
            case 'pesoPropio':
                pesoPropio = dato;
                break;
            case 'sobreCarga':
                sobreCarga = dato;
                break;
            }
        };
    };

    //Definición de la clase perfil
    var perfil = function (nombre, modulo, inercia, peso) {
        //Propiedades
        var nombreSerie = nombre; //Relación de tamaños de los perfiles de la serie
        var moduloSerie = modulo; //Relación de los módulos resistentes correspondientes (en cm3)
        var inerciaSerie = inercia; //Relación de las inercias correspondientes (en cm4)
        var pesoSerie = peso; //Relación de los pesos correspondientes (en kg/ml)
        //Métodos
        //Función que devuelve el peso de un perfil
        var encontrarPeso = function (perfil) {
            for (var i in nombreSerie) {
                if (nombreSerie[i] === perfil) {
                    return pesoSerie[i];
                }
            }
        };

        // Función que devuelve el perfil buscado
        this.encontrarPerfil = function (valor, listaSerie, listaPesos) {
            var encontrado = true;
            var resultado = "No existe ningún perfil que soporte esa carga";
            var resultadoTemp;
            var pesos = [];
            var temporal;
            var i = 0;
            while (encontrado) {
                if (valor < listaSerie[i]) {
                    if (resultado === "No existe ningún perfil que soporte esa carga") {
                        resultado = [nombreSerie[i]];
                    } else {
                        resultado.push(nombreSerie[i]);
                    }
                } else if (i >= listaSerie.length) {
                    encontrado = false;
                }
                i++;
            }
            if (resultado === "No existe ningún perfil que soporte esa carga") {
                return resultado;
            } else if (!listaPesos) {
                return resultado[0] + ' (' + encontrarPeso(resultado[0]) + 'kg/ml)';
            } else {
                for (var i in nombreSerie) {
                    for (var j in resultado) {
                        if (resultado[j] === nombreSerie[i]) {
                            pesos.push(listaPesos[i]);
                        }
                    }
                }
                temporal = pesos[0];
                resultadoTemp = resultado[0];
                for (var i in resultado) {
                    if (pesos[i] < temporal) {
                        temporal = pesos[i];
                        resultadoTemp = resultado[i];
                    }
                }
                return resultadoTemp + ' (' + encontrarPeso(resultadoTemp) + 'kg/ml)';
            }
        };
        
        this.encontrarInercia = function (canto) {
            var canto = canto.split(' ');
            for(var i in nombreSerie) {
                if (canto[0] === nombreSerie[i]) {
                    return inerciaSerie[i];
                }
            }
        };

        this.getModulo = function () {
            return moduloSerie;
        };
        //Función que devuelve la inercia
        this.getInercia = function () {
            return inerciaSerie;
        };
        //Función que devuelve el peso
        this.getPeso = function () {
            return pesoSerie;
        };
        //Función que devuelve el canto
        this.getCanto = function () {
            return cantoSerie;
        };
    };

    // Creamos un objeto de la clase perfil para perfiles de la serie IPE
    var IPE = new perfil(
 ["IPE80", "IPE100", "IPE120", "IPE140", "IPE160", "IPE180", "IPE200", "IPE220", "IPE240", "IPE270", "IPE300", "IPE330", "IPE360", "IPE400", "IPE450", "IPE500", "IPE550", "IPE600"], [20, 34.2, 53, 77.3, 109, 146, 194, 252, 324, 429, 557, 713, 904, 1160, 1500, 1930, 2440, 3070], [80.1, 171, 318, 541, 869, 1320, 1940, 2770, 3890, 5790, 8360, 11770, 16270, 23130, 33740, 48200, 67120, 92080], [6, 8.1, 10.4, 12.9, 15.8, 18.8, 22.4, 26.2, 30.7, 36.1, 42.2, 49.1, 57.1, 66.3, 77.6, 90.7, 106, 122]);

    // Creamos un objeto de la clase perfil para perfiles de la serie IPN
    var IPN = new perfil(
 ["IPN80", "IPN100", "IPN120", "IPN140", "IPN160", "IPN180", "IPN200", "IPN220", "IPN240", "IPN260", "IPN280", "IPN300", "IPN320", "IPN340", "IPN360", "IPN380", "IPN400", "IPN450", "IPN500", "IPN550", "IPN600"], [19.5, 34.2, 54.7, 81.9, 117, 161, 214, 278, 354, 442, 542, 653, 782, 923, 1090, 1260, 1460, 2040, 2750, 3610, 4630], [77.8, 171, 328, 573, 935, 1450, 2140, 3060, 4250, 5740, 7590, 9800, 12510, 15700, 19610, 24010, 29210, 45850, 68740, 99180, 139000], [5.95, 8.32, 11.2, 14.4, 17.9, 21.9, 26.3, 31.1, 36.2, 41.9, 48, 54.2, 61.1, 68.1, 76.2, 84, 92.6, 115, 141, 167, 199]);

    // Creamos un objeto de la clase perfil para perfiles de la serie HEA
    var HEA = new perfil(
 ['HEA100', 'HEA120', 'HEA140', 'HEA160', 'HEA180', 'HEA200', 'HEA220', 'HEA240', 'HEA260', 'HEA280', 'HEA300', 'HEA320', 'HEA340', 'HEA360', 'HEA400', 'HEA450', 'HEA500', 'HEA550', 'HEA600'], [72.8, 106, 155, 220, 294, 389, 515, 675, 836, 1010, 1260, 1480, 1680, 1890, 2310, 2900, 3550, 4150, 4790], [349, 606, 1030, 1670, 2510, 3690, 5410, 7760, 10450, 13670, 18260, 22930, 27690, 33090, 45070, 63720, 86970, 111900, 141200], [16.7, 19.9, 24.7, 30.4, 35.5, 42.3, 50.5, 60.3, 68.2, 76.4, 88.3, 97.6, 105, 112, 125, 140, 155, 166, 178]);

    // Creamos un objeto de la clase perfil para perfiles de la serie HEB
    var HEB = new perfil(
 ['HEB100', 'HEB120', 'HEB140', 'HEB160', 'HEB180', 'HEB200', 'HEB220', 'HEB240', 'HEB260', 'HEB280', 'HEB300', 'HEB320', 'HEB340', 'HEB360', 'HEB400', 'HEB450', 'HEB500', 'HEB550', 'HEB600'], [89.9, 144, 216, 311, 426, 570, 736, 938, 1150, 1380, 1680, 1930, 2160, 2400, 2880, 3550, 4290, 4970, 5700], [450, 864, 1510, 2490, 3830, 5700, 8090, 11260, 14920, 19270, 25170, 30820, 36660, 43190, 57680, 79890, 107200, 136700, 171000], [20.4, 26.7, 33.7, 42.6, 51.2, 61.3, 71.5, 83.2, 93, 103, 117, 127, 134, 142, 155, 171, 187, 199, 212]);

    // Creamos un objeto de la clase perfil para perfiles de la serie HEM
    var HEM = new perfil(
 ['HEM100', 'HEM120', 'HEM140', 'HEM160', 'HEM180', 'HEM200', 'HEM220', 'HEM240', 'HEM260', 'HEM280', 'HEM300', 'HEM320', 'HEM340', 'HEM360', 'HEM400', 'HEM450', 'HEM500', 'HEM550', 'HEM600'], [190, 288, 411, 566, 748, 967, 1220, 1800, 2160, 2550, 3480, 3800, 4050, 4300, 4820, 5500, 6180, 6920, 7660], [1140, 2020, 3290, 5100, 7480, 10640, 14600, 24290, 31310, 39550, 59200, 68130, 76370, 84870, 104100, 131500, 161900, 198000, 237400], [41.8, 52.1, 63.2, 76.2, 88.9, 103, 117, 157, 172, 189, 238, 245, 248, 250, 256, 263, 270, 278, 285]);

    // Creamos un objeto de la clase perfil para perfiles de la serie UPE
    var UPE = new perfil(
 ['UPE80', 'UPE100', 'UPE120', 'UPE140', 'UPE160', 'UPE180', 'UPE200', 'UPE220', 'UPE240', 'UPE270', 'UPE300', 'UPE330', 'UPE360', 'UPE400'], [26.8, 41.4, 60.6, 85.6, 114, 150, 191, 244, 300, 389, 522, 667, 824, 1050], [107, 207, 364, 600, 911, 1350, 1910, 2680, 3600, 5250, 7820, 11010, 14830, 20980], [7.9, 9.82, 12.1, 14.5, 17, 19.7, 22.8, 26.6, 30.2, 35.2, 44.4, 53.2, 61.2, 72.2]);

    // Creamos un objeto de la clase perfil para perfiles de la serie UPN
    var UPN = new perfil(
 ['UPN50', 'UPN65', 'UPN80', 'UPN100', 'UPN120', 'UPN140', 'UPN160', 'UPN180', 'UPN200', 'UPN220', 'UPN240', 'UPN260', 'UPN280', 'UPN300', 'UPN320', 'UPN350', 'UPN380', 'UPN400'], [10.6, 17.7, 26.5, 41.2, 60.7, 86.4, 116, 150, 191, 245, 300, 371, 448, 535, 679, 734, 829, 1020], [26.4, 57.5, 106, 206, 364, 605, 925, 1350, 1910, 2690, 3600, 4820, 6280, 8030, 10870, 12840, 15760, 20350], [5.59, 7.09, 8.64, 10.6, 13.4, 16, 18.8, 22, 25.3, 29.4, 33.2, 37.9, 41.8, 46.2, 59.5, 60.6, 63.1, 71.8]);

    // Creamos un objeto de la clase perfil para perfiles de la serie CHS
    var CHSNombres = ['CHS17.2x1.5', 'CHS17.2x2', 'CHS17.2x2.3', 'CHS17.2x2.5', 'CHS21.3x1.5', 'CHS21.3x2', 'CHS21.3x2.3', 'CHS21.3x2.5', 'CHS21.3x2.9', 'CHS21.3x3', 'CHS25x1.5', 'CHS25x2', 'CHS25x2.3', 'CHS25x2.5', 'CHS25x2.9', 'CHS25x3', 'CHS26.9x1.5', 'CHS26.9x2', 'CHS26.9x2.3', 'CHS26.9x2.5', 'CHS26.9x2.9', 'CHS26.9x3', 'CHS28x1.5', 'CHS28x2', 'CHS28x2.3', 'CHS28x2.5', 'CHS28x2.9', 'CHS28x3', 'CHS30x1.5', 'CHS30x2', 'CHS30x2.3', 'CHS30x2.5', 'CHS30x2.9', 'CHS30x3', 'CHS32x1.5', 'CHS32x2', 'CHS32x2.3', 'CHS32x2.5', 'CHS32x2.9', 'CHS32x3', 'CHS33.7x1.5', 'CHS33.7x2', 'CHS33.7x2.3', 'CHS33.7x2.5', 'CHS33.7x2.9', 'CHS33.7x3', 'CHS33.7x3.2', 'CHS33.7x3.6', 'CHS33.7x4', 'CHS35x1.5', 'CHS35x2', 'CHS35x2.3', 'CHS35x2.5', 'CHS35x2.9', 'CHS35x3', 'CHS35x3.2', 'CHS35x3.6', 'CHS35x4', 'CHS37.5x1.5', 'CHS37.5x2', 'CHS37.5x2.3', 'CHS37.5x2.5', 'CHS37.5x2.9', 'CHS37.5x3', 'CHS37.5x3.2', 'CHS37.5x3.6', 'CHS37.5x4', 'CHS38x1.5', 'CHS38x2', 'CHS38x2.3', 'CHS38x2.5', 'CHS38x2.9', 'CHS38x3', 'CHS38x3.2', 'CHS38x3.6', 'CHS38x4', 'CHS38x5', 'CHS39x1.5', 'CHS39x2', 'CHS39x2.3', 'CHS39x2.5', 'CHS39x2.9', 'CHS39x3', 'CHS39x3.2', 'CHS39x3.6', 'CHS39x4', 'CHS40x1.5', 'CHS40x2', 'CHS40x2.3', 'CHS40x2.5', 'CHS40x2.9', 'CHS40x3', 'CHS40x3.2', 'CHS40x3.6', 'CHS40x4', 'CHS41.5x1.5', 'CHS41.5x2', 'CHS41.5x2.3', 'CHS41.5x2.5', 'CHS41.5x2.9', 'CHS41.5x3', 'CHS41.5x3.2', 'CHS41.5x3.6', 'CHS41.5x4', 'CHS42x1.5', 'CHS42x2', 'CHS42x2.3', 'CHS42x2.5', 'CHS42x2.9', 'CHS42x3', 'CHS42x3.2', 'CHS42x3.6', 'CHS42x4', 'CHS42.4x1.5', 'CHS42.4x2', 'CHS42.4x2.3', 'CHS42.4x2.5', 'CHS42.4x2.9', 'CHS42.4x3', 'CHS42.4x3.2', 'CHS42.4x3.6', 'CHS42.4x4', 'CHS42.4x5', 'CHS42.4x6', 'CHS42.4x6.3', 'CHS44.5x1.5', 'CHS44.5x2', 'CHS44.5x2.3', 'CHS44.5x2.5', 'CHS44.5x2.9', 'CHS44.5x3', 'CHS44.5x3.2', 'CHS44.5x3.6', 'CHS44.5x4', 'CHS45x1.5', 'CHS45x2', 'CHS45x2.3', 'CHS45x2.5', 'CHS45x2.9', 'CHS45x3', 'CHS45x3.2', 'CHS45x3.6', 'CHS45x4', 'CHS45x5', 'CHS45x6', 'CHS45x6.3', 'CHS48x1.5', 'CHS48x2', 'CHS48x2.3', 'CHS48x2.5', 'CHS48x2.9', 'CHS48x3', 'CHS48x3.2', 'CHS48x3.6', 'CHS48x4', 'CHS48.3x1.5', 'CHS48.3x2', 'CHS48.3x2.3', 'CHS48.3x2.5', 'CHS48.3x2.9', 'CHS48.3x3', 'CHS48.3x3.2', 'CHS48.3x3.6', 'CHS48.3x4', 'CHS48.3x5', 'CHS48.3x6', 'CHS48.3x6.3', 'CHS48.6x1.5', 'CHS48.6x2', 'CHS48.6x2.3', 'CHS48.6x2.5', 'CHS48.6x2.9', 'CHS48.6x3', 'CHS48.6x3.2', 'CHS48.6x3.6', 'CHS48.6x4', 'CHS49.4x2', 'CHS49.4x2.3', 'CHS49.4x2.5', 'CHS49.4x2.9', 'CHS49.4x3', 'CHS49.4x3.2', 'CHS49.4x3.6', 'CHS49.4x4', 'CHS49.4x5', 'CHS50x1.5', 'CHS50x2', 'CHS50x2.3', 'CHS50x2.5', 'CHS50x2.9', 'CHS50x3', 'CHS50x3.2', 'CHS50x3.6', 'CHS50x4', 'CHS50x5', 'CHS50x6', 'CHS50x6.3', 'CHS51x1.5', 'CHS51x2', 'CHS51x2.3', 'CHS51x2.5', 'CHS51x2.9', 'CHS51x3', 'CHS51x3.2', 'CHS51x3.6', 'CHS51x4', 'CHS51x5', 'CHS51x6', 'CHS51x6.3', 'CHS52x1.5', 'CHS52x2', 'CHS52x2.3', 'CHS52x2.5', 'CHS52x2.9', 'CHS52x3', 'CHS52x3.2', 'CHS52x3.6', 'CHS52x4', 'CHS52x5', 'CHS52x6', 'CHS52x6.3', 'CHS55x1.5', 'CHS55x2', 'CHS55x2.3', 'CHS55x2.5', 'CHS55x2.9', 'CHS55x3', 'CHS55x3.2', 'CHS55x3.6', 'CHS55x4', 'CHS55x5', 'CHS55x6', 'CHS55x6.3', 'CHS56x2', 'CHS57x1.5', 'CHS57x2', 'CHS57x2.3', 'CHS57x2.5', 'CHS57x2.9', 'CHS57x3', 'CHS57x3.2', 'CHS57x3.6', 'CHS57x4', 'CHS57x5', 'CHS57x6', 'CHS57x6.3', 'CHS58x2', 'CHS58x2.3', 'CHS58x2.5', 'CHS58x2.9', 'CHS58x3', 'CHS58x3.2', 'CHS58x3.6', 'CHS58x4', 'CHS58x5', 'CHS58x6', 'CHS58x6.3', 'CHS60x1.5', 'CHS60x2', 'CHS60x2.3', 'CHS60x2.5', 'CHS60x2.9', 'CHS60x3', 'CHS60x3.2', 'CHS60x3.6', 'CHS60x4', 'CHS60x5', 'CHS60x6', 'CHS60x6.3', 'CHS60.3x1.5', 'CHS60.3x2', 'CHS60.3x2.3', 'CHS60.3x2.5', 'CHS60.3x2.9', 'CHS60.3x3', 'CHS60.3x3.2', 'CHS60.3x3.6', 'CHS60.3x4', 'CHS60.3x5', 'CHS60.3x6', 'CHS60.3x6.3', 'CHS61.5x2', 'CHS61.5x2.3', 'CHS61.5x2.5', 'CHS61.5x2.9', 'CHS61.5x3', 'CHS61.5x3.2', 'CHS61.5x3.6', 'CHS61.5x4', 'CHS61.5x5', 'CHS61.5x6', 'CHS61.5x6.3', 'CHS62x1.5', 'CHS62x2', 'CHS62x2.3', 'CHS62x2.5', 'CHS62x2.9', 'CHS62x3', 'CHS62x3.2', 'CHS62x3.6', 'CHS62x4', 'CHS62.2x2', 'CHS62.2x2.3', 'CHS62.2x2.5', 'CHS62.2x2.9', 'CHS62.2x3', 'CHS62.2x3.2', 'CHS62.2x3.6', 'CHS62.2x4', 'CHS62.2x5', 'CHS62.2x6', 'CHS62.2x6.3', 'CHS63x1.5', 'CHS63x2', 'CHS63x2.3', 'CHS63x2.5', 'CHS63x2.9', 'CHS63x3', 'CHS63x3.2', 'CHS63x3.6', 'CHS63x4', 'CHS63x5', 'CHS63x6', 'CHS63x6.3', 'CHS63.5x1.5', 'CHS63.5x2', 'CHS63.5x2.3', 'CHS63.5x2.5', 'CHS63.5x2.9', 'CHS63.5x3', 'CHS63.5x3.2', 'CHS63.5x3.6', 'CHS63.5x4', 'CHS63.5x5', 'CHS63.5x6', 'CHS63.5x6.3', 'CHS66x2', 'CHS66x2.3', 'CHS66x2.5', 'CHS66x2.9', 'CHS66x3', 'CHS66x3.2', 'CHS66x3.6', 'CHS66x4', 'CHS66x5', 'CHS66x6', 'CHS66x6.3', 'CHS68x2', 'CHS70x1.5', 'CHS70x2', 'CHS70x2.3', 'CHS70x2.5', 'CHS70x2.9', 'CHS70x3', 'CHS70x3.2', 'CHS70x3.6', 'CHS70x4', 'CHS70x5', 'CHS70x6', 'CHS70x6.3', 'CHS71.5x2', 'CHS71.5x2.3', 'CHS71.5x2.5', 'CHS71.5x2.9', 'CHS71.5x3', 'CHS71.5x3.2', 'CHS71.5x3.6', 'CHS71.5x4', 'CHS71.5x5', 'CHS71.5x6', 'CHS71.5x6.3', 'CHS72x2', 'CHS72x2.3', 'CHS72x2.5', 'CHS72x2.9', 'CHS72x3', 'CHS72x3.2', 'CHS72x3.6', 'CHS72x4', 'CHS72x5', 'CHS72x6', 'CHS72x6.3', 'CHS75.5x2', 'CHS75.5x2.3', 'CHS75.5x2.5', 'CHS75.5x2.9', 'CHS75.5x3', 'CHS75.5x3.2', 'CHS75.5x3.6', 'CHS75.5x4', 'CHS75.5x5', 'CHS75.5x6', 'CHS75.5x6.3', 'CHS76x1.5', 'CHS76x2', 'CHS76x2.3', 'CHS76x2.5', 'CHS76x2.9', 'CHS76x3', 'CHS76x3.2', 'CHS76x3.6', 'CHS76x4', 'CHS76x5', 'CHS76x6', 'CHS76x6.3', 'CHS76.1x1.5', 'CHS76.1x2', 'CHS76.1x2.3', 'CHS76.1x2.5', 'CHS76.1x2.9', 'CHS76.1x3', 'CHS76.1x3.2', 'CHS76.1x3.6', 'CHS76.1x4', 'CHS76.1x5', 'CHS76.1x6', 'CHS76.1x6.3', 'CHS80x1.5', 'CHS80x2', 'CHS80x2.3', 'CHS80x2.5', 'CHS80x2.9', 'CHS80x3', 'CHS80x3.2', 'CHS80x3.6', 'CHS80x4', 'CHS80x5', 'CHS80x6', 'CHS80x6.3', 'CHS82.5x2', 'CHS82.5x2.3', 'CHS82.5x2.5', 'CHS82.5x2.9', 'CHS82.5x3', 'CHS82.5x3.2', 'CHS82.5x3.6', 'CHS82.5x4', 'CHS82.5x5', 'CHS82.5x6', 'CHS82.5x6.3', 'CHS83x1.5', 'CHS83x2', 'CHS83x2.3', 'CHS83x2.5', 'CHS83x2.9', 'CHS83x3', 'CHS83x3.2', 'CHS83x3.6', 'CHS83x4', 'CHS83x5', 'CHS83x6', 'CHS83x6.3', 'CHS84x2', 'CHS84x2.3', 'CHS84x2.5', 'CHS84x2.9', 'CHS84x3', 'CHS84x3.2', 'CHS84x3.6', 'CHS84x4', 'CHS84x5', 'CHS84x6', 'CHS84x6.3', 'CHS88.9x1.5', 'CHS88.9x2', 'CHS88.9x2.3', 'CHS88.9x2.5', 'CHS88.9x2.9', 'CHS88.9x3', 'CHS88.9x3.2', 'CHS88.9x3.6', 'CHS88.9x4', 'CHS88.9x5', 'CHS88.9x6', 'CHS88.9x6.3', 'CHS88.9x7', 'CHS88.9x8', 'CHS88.9x10', 'CHS89x1.5', 'CHS89x2', 'CHS89x2.3', 'CHS89x2.5', 'CHS89x2.9', 'CHS89x3', 'CHS89x3.2', 'CHS89x3.6', 'CHS89x4', 'CHS89x5', 'CHS89x6', 'CHS89x6.3', 'CHS90x1.5', 'CHS90x2', 'CHS90x2.3', 'CHS90x2.5', 'CHS90x2.9', 'CHS90x3', 'CHS90x3.2', 'CHS90x3.6', 'CHS90x4', 'CHS95x1.5', 'CHS95x2', 'CHS95x2.3', 'CHS95x2.5', 'CHS95x2.9', 'CHS95x3', 'CHS95x3.2', 'CHS95x3.6', 'CHS95x4', 'CHS95x5', 'CHS95x6', 'CHS95x6.3', 'CHS96x2', 'CHS96x2.3', 'CHS96x2.5', 'CHS96x2.9', 'CHS96x3', 'CHS96x3.2', 'CHS96x3.6', 'CHS96x4', 'CHS96x5', 'CHS96x6', 'CHS96x6.3', 'CHS96x7', 'CHS96x8', 'CHS96x10', 'CHS100x1.5', 'CHS100x2', 'CHS100x2.3', 'CHS100x2.5', 'CHS100x2.9', 'CHS100x3', 'CHS100x3.2', 'CHS100x3.6', 'CHS100x4', 'CHS100x5', 'CHS100x6', 'CHS100x6.3', 'CHS100x7', 'CHS100x8', 'CHS101.6x1.5', 'CHS101.6x2', 'CHS101.6x2.3', 'CHS101.6x2.5', 'CHS101.6x2.9', 'CHS101.6x3', 'CHS101.6x3.2', 'CHS101.6x3.6', 'CHS101.6x4', 'CHS101.6x5', 'CHS101.6x6', 'CHS101.6x6.3', 'CHS101.6x7', 'CHS101.6x8', 'CHS101.6x10', 'CHS108x1.5', 'CHS108x2', 'CHS108x2.3', 'CHS108x2.5', 'CHS108x2.9', 'CHS108x3', 'CHS108x3.2', 'CHS108x3.6', 'CHS108x4', 'CHS108x5', 'CHS108x6', 'CHS108x6.3', 'CHS108x7', 'CHS108x8', 'CHS108x10', 'CHS110x2', 'CHS110x2.3', 'CHS110x2.5', 'CHS110x2.9', 'CHS110x3', 'CHS110x3.2', 'CHS110x3.6', 'CHS110x4', 'CHS113x1.5', 'CHS113x2', 'CHS113x2.3', 'CHS113x2.5', 'CHS113x2.9', 'CHS113x3', 'CHS113x3.2', 'CHS113x3.6', 'CHS113x4', 'CHS113x5', 'CHS113x6', 'CHS113x6.3', 'CHS113x7', 'CHS113x8', 'CHS114x1.5', 'CHS114x2', 'CHS114x2.3', 'CHS114x2.5', 'CHS114x2.9', 'CHS114x3', 'CHS114x3.2', 'CHS114x3.6', 'CHS114x4', 'CHS114x5', 'CHS114x6', 'CHS114x6.3', 'CHS114x7', 'CHS114x8', 'CHS114x10', 'CHS114.3x1.5', 'CHS114.3x2', 'CHS114.3x2.3', 'CHS114.3x2.5', 'CHS114.3x2.9', 'CHS114.3x3', 'CHS114.3x3.2', 'CHS114.3x3.6', 'CHS114.3x4', 'CHS114.3x5', 'CHS114.3x6', 'CHS114.3x6.3', 'CHS114.3x7', 'CHS114.3x8', 'CHS114.3x10', 'CHS120x1.5', 'CHS120x2', 'CHS120x2.3', 'CHS120x2.5', 'CHS120x2.9', 'CHS120x3', 'CHS120x3.2', 'CHS120x3.6', 'CHS120x4', 'CHS120x5', 'CHS120x6', 'CHS120x6.3', 'CHS125x2', 'CHS125x2.3', 'CHS125x2.5', 'CHS125x2.9', 'CHS125x3', 'CHS125x3.2', 'CHS125x3.6', 'CHS125x4', 'CHS125x5', 'CHS125x6', 'CHS125x6.3', 'CHS125x7', 'CHS125x8', 'CHS125x10', 'CHS125x12.5', 'CHS127x2', 'CHS127x2.3', 'CHS127x2.5', 'CHS127x2.9', 'CHS127x3', 'CHS127x3.2', 'CHS127x3.6', 'CHS127x4', 'CHS127x5', 'CHS127x6', 'CHS127x6.3', 'CHS127x7', 'CHS127x8', 'CHS127x10', 'CHS133x2', 'CHS133x2.3', 'CHS133x2.5', 'CHS133x2.9', 'CHS133x3', 'CHS133x3.2', 'CHS133x3.6', 'CHS133x4', 'CHS133x5', 'CHS133x6', 'CHS133x6.3', 'CHS133x7', 'CHS133x8', 'CHS133x10', 'CHS139.7x2', 'CHS139.7x2.3', 'CHS139.7x2.5', 'CHS139.7x2.9', 'CHS139.7x3', 'CHS139.7x3.2', 'CHS139.7x3.6', 'CHS139.7x4', 'CHS139.7x5', 'CHS139.7x6', 'CHS139.7x6.3', 'CHS139.7x7', 'CHS139.7x8', 'CHS139.7x10', 'CHS139.7x12.5', 'CHS152x2', 'CHS152x2.3', 'CHS152x2.5', 'CHS152x2.9', 'CHS152x3', 'CHS152x3.2', 'CHS152x3.6', 'CHS152x4', 'CHS152x5', 'CHS152x6', 'CHS152x6.3', 'CHS152x7', 'CHS152x8', 'CHS152x10', 'CHS152x12.5', 'CHS152.4x2', 'CHS152.4x2.3', 'CHS152.4x2.5', 'CHS152.4x2.9', 'CHS152.4x3', 'CHS152.4x3.2', 'CHS152.4x3.6', 'CHS152.4x4', 'CHS152.4x5', 'CHS152.4x6', 'CHS152.4x6.3', 'CHS152.4x7', 'CHS152.4x8', 'CHS152.4x10', 'CHS152.4x12.5', 'CHS159x1.5', 'CHS159x2', 'CHS159x2.3', 'CHS159x2.5', 'CHS159x2.9', 'CHS159x3', 'CHS159x3.2', 'CHS159x3.6', 'CHS159x4', 'CHS159x5', 'CHS159x6', 'CHS159x6.3', 'CHS159x7', 'CHS159x8', 'CHS159x10', 'CHS164x2', 'CHS164x2.3', 'CHS164x2.5', 'CHS164x2.9', 'CHS164x3', 'CHS164x3.2', 'CHS164x3.6', 'CHS164x4', 'CHS164x5', 'CHS164x6', 'CHS164x6.3', 'CHS165.1x3', 'CHS165.1x3.2', 'CHS165.1x3.6', 'CHS165.1x4', 'CHS165.1x5', 'CHS165.1x6', 'CHS165.1x6.3', 'CHS165.1x7', 'CHS165.1x8', 'CHS168x2.5', 'CHS168x2.9', 'CHS168x3', 'CHS168x3.2', 'CHS168x3.6', 'CHS168x4', 'CHS168x5', 'CHS168x6', 'CHS168x6.3', 'CHS168.1x2.5', 'CHS168.1x2.9', 'CHS168.1x3', 'CHS168.1x3.2', 'CHS168.1x3.6', 'CHS168.1x4', 'CHS168.1x5', 'CHS168.1x6', 'CHS168.3x2.5', 'CHS168.3x2.9', 'CHS168.3x3', 'CHS168.3x3.2', 'CHS168.3x3.6', 'CHS168.3x4', 'CHS168.3x5', 'CHS168.3x6', 'CHS168.3x6.3', 'CHS168.3x7', 'CHS168.3x8', 'CHS168.3x10', 'CHS168.3x12.5', 'CHS177.8x3', 'CHS177.8x3.2', 'CHS177.8x3.6', 'CHS177.8x4', 'CHS177.8x5', 'CHS177.8x6', 'CHS177.8x6.3', 'CHS177.8x7', 'CHS177.8x8', 'CHS177.8x10', 'CHS193.7x3', 'CHS193.7x3.2', 'CHS193.7x3.6', 'CHS193.7x4', 'CHS193.7x5', 'CHS193.7x6', 'CHS193.7x6.3', 'CHS193.7x7', 'CHS193.7x8', 'CHS193.7x10', 'CHS193.7x12.5', 'CHS200x3', 'CHS200x3.2', 'CHS200x3.6', 'CHS200x4', 'CHS200x5', 'CHS200x6', 'CHS200x6.3', 'CHS200x7', 'CHS200x8', 'CHS219.1x3', 'CHS219.1x3.2', 'CHS219.1x3.6', 'CHS219.1x4', 'CHS219.1x5', 'CHS219.1x6', 'CHS219.1x6.3', 'CHS219.1x7', 'CHS219.1x8', 'CHS219.1x10', 'CHS219.1x12.5', 'CHS244.5x4', 'CHS244.5x5', 'CHS244.5x6', 'CHS244.5x6.3', 'CHS244.5x7', 'CHS244.5x8', 'CHS244.5x10', 'CHS244.5x12.5', 'CHS273x4', 'CHS273x5', 'CHS273x6', 'CHS273x6.3', 'CHS273x7', 'CHS273x8', 'CHS273x10', 'CHS273x12.5', 'CHS273.1x5', 'CHS273.1x6', 'CHS273.1x6.3', 'CHS273.1x7', 'CHS273.1x8', 'CHS273.1x10', 'CHS273.1x12.5', 'CHS323.9x4', 'CHS323.9x5', 'CHS323.9x6', 'CHS323.9x6.3', 'CHS323.9x7', 'CHS323.9x8', 'CHS323.9x10', 'CHS323.9x12.5', 'CHS323.9x14.2', 'CHS323.9x16', 'CHS339.7x5', 'CHS339.7x6', 'CHS339.7x6.3', 'CHS339.7x7', 'CHS339.7x8', 'CHS339.7x10', 'CHS355.6x5', 'CHS355.6x6', 'CHS355.6x6.3', 'CHS355.6x7', 'CHS355.6x8', 'CHS355.6x10', 'CHS355.6x12.5', 'CHS355.6x14.2', 'CHS355.6x16', 'CHS406.4x5', 'CHS406.4x6', 'CHS406.4x6.3', 'CHS406.4x7', 'CHS406.4x8'
];

    var CHSModulos = [0.267, 0.326, 0.356, 0.373, 0.432, 0.536, 0.59, 0.623, 0.683, 0.696, 0.614, 0.77, 0.854, 0.906, 1, 1.02, 0.72, 0.907, 1.01, 1.07, 1.19, 1.21, 0.786, 0.992, 1.1, 1.17, 1.3, 1.33, 0.912, 1.16, 1.29, 1.37, 1.53, 1.56, 1.05, 1.33, 1.49, 1.59, 1.77, 1.82, 1.17, 1.49, 1.67, 1.78, 1.99, 2.04, 2.14, 2.32, 2.49, 1.27, 1.62, 1.81, 1.94, 2.17, 2.23, 2.33, 2.53, 2.72, 1.47, 1.88, 2.11, 2.26, 2.53, 2.6, 2.73, 2.97, 3.19, 1.51, 1.93, 2.17, 2.32, 2.61, 2.68, 2.81, 3.06, 3.29, 3.8, 1.6, 2.05, 2.3, 2.46, 2.77, 2.84, 2.98, 3.25, 3.5, 1.68, 2.16, 2.43, 2.6, 2.93, 3, 3.15, 3.44, 3.71, 1.82, 2.34, 2.63, 2.82, 3.17, 3.26, 3.43, 3.74, 4.04, 1.87, 2.4, 2.7, 2.89, 3.26, 3.35, 3.52, 3.85, 4.15, 1.9, 2.45, 2.76, 2.95, 3.33, 3.42, 3.59, 3.93, 4.24, 4.93, 5.51, 5.66, 2.11, 2.72, 3.06, 3.28, 3.7, 3.8, 4, 4.38, 4.74, 2.16, 2.78, 3.13, 3.36, 3.79, 3.9, 4.1, 4.49, 4.86, 5.67, 6.36, 6.54, 2.47, 3.19, 3.6, 3.86, 4.37, 4.49, 4.73, 5.19, 5.62, 2.5, 3.23, 3.65, 3.92, 4.43, 4.55, 4.8, 5.26, 5.7, 6.69, 7.53, 7.76, 2.54, 3.28, 3.7, 3.97, 4.49, 4.62, 4.86, 5.34, 5.78, 3.39, 3.83, 4.11, 4.65, 4.78, 5.04, 5.53, 6, 7.05, 2.69, 3.48, 3.93, 4.22, 4.78, 4.91, 5.18, 5.68, 6.16, 7.25, 8.18, 8.43, 2.8, 3.63, 4.1, 4.4, 4.99, 5.13, 5.41, 5.94, 6.44, 7.58, 8.57, 8.84, 2.92, 3.78, 4.27, 4.59, 5.2, 5.35, 5.64, 6.2, 6.73, 7.93, 8.97, 9.25, 3.28, 4.26, 4.82, 5.18, 5.87, 6.04, 6.38, 7.02, 7.62, 9.01, 10.2, 10.6, 4.42, 3.54, 4.59, 5.2, 5.59, 6.35, 6.53, 6.89, 7.59, 8.25, 9.78, 11.1, 11.5, 4.76, 5.39, 5.8, 6.59, 6.78, 7.16, 7.88, 8.58, 10.2, 11.6, 12, 3.93, 5.11, 5.79, 6.23, 7.09, 7.29, 7.7, 8.49, 9.24, 11, 12.5, 12.9, 3.97, 5.17, 5.85, 6.3, 7.16, 7.37, 7.78, 8.58, 9.34, 11.1, 12.7, 13.1, 5.39, 6.1, 6.57, 7.47, 7.69, 8.12, 8.96, 9.76, 11.6, 13.3, 13.7, 4.21, 5.48, 6.21, 6.68, 7.6, 7.83, 8.27, 9.12, 9.93, 5.52, 6.25, 6.73, 7.65, 7.88, 8.32, 9.18, 10, 11.9, 13.6, 14.1, 4.35, 5.67, 6.42, 6.91, 7.87, 8.1, 8.56, 9.44, 10.3, 12.3, 14, 14.5, 4.42, 5.76, 6.53, 7.03, 8, 8.24, 8.7, 9.6, 10.5, 12.5, 14.3, 14.8, 6.25, 7.08, 7.63, 8.69, 8.95, 9.46, 10.4, 11.4, 13.6, 15.6, 16.1, 6.65, 5.41, 7.06, 8.02, 8.64, 9.85, 10.1, 10.7, 11.9, 13, 15.5, 17.8, 18.4, 7.38, 8.38, 9.03, 10.3, 10.6, 11.2, 12.4, 13.6, 16.2, 18.7, 19.4, 7.49, 8.5, 9.17, 10.5, 10.8, 11.4, 12.6, 13.8, 16.5, 19, 19.7, 8.27, 9.39, 10.1, 11.6, 11.9, 12.6, 14, 15.3, 18.3, 21.1, 21.9, 6.41, 8.38, 9.52, 10.3, 11.7, 12.1, 12.8, 14.2, 15.5, 18.6, 21.4, 22.2, 6.43, 8.4, 9.55, 10.3, 11.8, 12.1, 12.8, 14.2, 15.5, 18.6, 21.5, 22.3, 7.13, 9.32, 10.6, 11.4, 13.1, 13.5, 14.3, 15.8, 17.3, 20.8, 24, 24.9, 9.94, 11.3, 12.2, 13.9, 14.4, 15.2, 16.9, 18.5, 22.2, 25.7, 26.7, 7.69, 10.1, 11.4, 12.4, 14.1, 14.6, 15.4, 17.1, 18.7, 22.5, 26.1, 27.1, 10.3, 11.7, 12.7, 14.5, 14.9, 15.8, 17.5, 19.2, 23.1, 26.8, 27.8, 8.85, 11.6, 13.2, 14.3, 16.3, 16.8, 17.8, 19.8, 21.7, 26.2, 30.4, 31.5, 34.2, 37.8, 44.1, 8.87, 11.6, 13.2, 14.3, 16.4, 16.9, 17.9, 19.8, 21.7, 26.2, 30.4, 31.6, 9.08, 11.9, 13.5, 14.6, 16.7, 17.3, 18.3, 20.3, 22.3, 10.1, 13.3, 15.2, 16.4, 18.7, 19.3, 20.5, 22.8, 25, 30.2, 35.1, 36.5, 13.6, 15.5, 16.7, 19.2, 19.8, 20.9, 23.3, 25.5, 30.9, 35.9, 37.4, 40.6, 45, 52.7, 11.3, 14.8, 16.9, 18.2, 20.9, 21.5, 22.8, 25.4, 27.8, 33.8, 39.3, 40.9, 44.5, 49.3, 11.6, 15.3, 17.4, 18.8, 21.6, 22.3, 23.6, 26.2, 28.8, 34.9, 40.7, 42.3, 46.1, 51.1, 60.1, 13.2, 17.3, 19.8, 21.4, 24.5, 25.3, 26.8, 29.8, 32.8, 39.8, 46.5, 48.4, 52.7, 58.5, 69.2, 18, 20.5, 22.2, 25.5, 26.3, 27.9, 31, 34.1, 14.5, 19, 21.7, 23.5, 26.9, 27.8, 29.5, 32.8, 36.1, 43.9, 51.2, 53.4, 58.2, 64.7, 14.7, 19.4, 22.1, 23.9, 27.4, 28.3, 30, 33.4, 36.7, 44.7, 52.2, 54.4, 59.3, 66, 78.2, 14.8, 19.5, 22.2, 24, 27.6, 28.4, 30.2, 33.6, 36.9, 45, 52.5, 54.7, 59.7, 66.4, 78.7, 16.3, 21.5, 24.6, 26.6, 30.5, 31.5, 33.4, 37.2, 40.9, 49.9, 58.3, 60.8, 23.4, 26.7, 28.9, 33.2, 34.2, 36.4, 40.5, 44.6, 54.4, 63.7, 66.4, 72.5, 80.9, 96.3, 113, 24.2, 27.6, 29.8, 34.3, 35.4, 37.6, 41.9, 46.1, 56.2, 65.9, 68.7, 75.1, 83.7, 99.8, 26.6, 30.3, 32.8, 37.7, 38.9, 41.4, 46.1, 50.8, 62, 72.7, 75.9, 82.9, 92.6, 111, 29.4, 33.6, 36.3, 41.8, 43.1, 45.8, 51.1, 56.2, 68.8, 80.8, 84.3, 92.2, 103, 123, 146, 34.9, 39.9, 43.2, 49.7, 51.3, 54.5, 60.8, 67.1, 82.2, 96.6, 101, 111, 124, 149, 177, 35.1, 40.1, 43.4, 50, 51.6, 54.8, 61.2, 67.4, 82.6, 97.2, 101, 111, 125, 150, 178, 29, 38.2, 43.7, 47.3, 54.5, 56.3, 59.8, 66.8, 73.6, 90.3, 106, 111, 122, 136, 164, 40.7, 46.6, 50.4, 58.1, 60, 63.7, 71.2, 78.5, 96.3, 113, 119, 60.8, 64.6, 72.2, 79.6, 97.7, 115, 120, 132, 148, 53, 61, 63, 67, 74.8, 82.5, 101.3, 119.4, 124.7, 53.1, 61.1, 63.1, 67.1, 74.9, 82.6, 101, 120, 53.2, 61.3, 63.3, 67.2, 75.1, 82.8, 102, 120, 125, 137, 154, 186, 222, 70.8, 75.3, 84.1, 92.8, 114, 135, 141, 154, 173, 209, 84.4, 89.7, 100, 111, 136, 161, 168, 185, 208, 252, 303, 90.1, 95.8, 107, 118, 146, 172, 180, 198, 223, 109, 115, 129, 143, 176, 208, 218, 240, 270, 328, 397, 179, 221, 262, 274, 301, 340, 415, 503, 224, 277, 329, 344, 379, 429, 524, 637, 277, 329, 344, 380, 429, 525, 638, 318, 393, 468, 490, 540, 612, 751, 917, 1025, 1136, 434, 516, 540, 596, 675, 829, 476, 566, 593, 655, 742, 912, 1117, 1250, 1387, 625, 745, 780, 862, 978
];

    var CHSInercias = [0.23, 0.281, 0.306, 0.321, 0.46, 0.571, 0.629, 0.664, 0.727, 0.741, 0.768, 0.963, 1.07, 1.13, 1.25, 1.28, 0.969, 1.22, 1.36, 1.44, 1.6, 1.63, 1.1, 1.39, 1.55, 1.64, 1.82, 1.87, 1.37, 1.73, 1.93, 2.06, 2.29, 2.35, 1.68, 2.13, 2.38, 2.54, 2.83, 2.9, 1.97, 2.51, 2.81, 3, 3.36, 3.44, 3.6, 3.91, 4.19, 2.22, 2.83, 3.17, 3.39, 3.8, 3.89, 4.08, 4.43, 4.76, 2.75, 3.52, 3.96, 4.23, 4.75, 4.87, 5.12, 5.57, 5.99, 2.87, 3.68, 4.13, 4.41, 4.96, 5.09, 5.34, 5.82, 6.26, 7.22, 3.11, 3.99, 4.48, 4.8, 5.39, 5.53, 5.81, 6.34, 6.82, 3.37, 4.32, 4.86, 5.2, 5.85, 6.01, 6.31, 6.88, 7.42, 3.78, 4.85, 5.46, 5.85, 6.59, 6.76, 7.11, 7.77, 8.38, 3.92, 5.04, 5.67, 6.07, 6.84, 7.03, 7.39, 8.08, 8.71, 4.04, 5.19, 5.84, 6.26, 7.06, 7.25, 7.62, 8.33, 8.99, 10.5, 11.7, 12, 4.69, 6.04, 6.81, 7.3, 8.24, 8.46, 8.91, 9.75, 10.5, 4.85, 6.26, 7.05, 7.56, 8.54, 8.77, 9.23, 10.1, 10.9, 12.8, 14.3, 14.7, 5.93, 7.66, 8.64, 9.28, 10.5, 10.8, 11.4, 12.5, 13.5, 6.04, 7.81, 8.81, 9.46, 10.7, 11, 11.6, 12.7, 13.8, 16.2, 18.2, 18.7, 6.16, 7.96, 8.99, 9.65, 10.9, 11.2, 11.8, 13, 14, 8.38, 9.46, 10.2, 11.5, 11.8, 12.5, 13.7, 14.8, 17.4, 6.73, 8.7, 9.83, 10.6, 11.9, 12.3, 12.9, 14.2, 15.4, 18.1, 20.4, 21.1, 7.15, 9.26, 10.5, 11.2, 12.7, 13.1, 13.8, 15.1, 16.4, 19.3, 21.9, 22.5, 7.59, 9.83, 11.1, 11.9, 13.5, 13.9, 14.7, 16.1, 17.5, 20.6, 23.3, 24.1, 9.03, 11.7, 13.2, 14.2, 16.2, 16.6, 17.5, 19.3, 21, 24.8, 28.1, 29.1, 12.4, 10.1, 13.1, 14.8, 15.9, 18.1, 18.6, 19.6, 21.6, 23.5, 27.9, 31.7, 32.7, 13.8, 15.6, 16.8, 19.1, 19.7, 20.8, 22.9, 24.9, 29.5, 33.6, 34.7, 11.8, 15.3, 17.4, 18.7, 21.3, 21.9, 23.1, 25.5, 27.7, 32.9, 37.6, 38.8, 12, 15.6, 17.7, 19, 21.6, 22.2, 23.5, 25.9, 28.2, 33.5, 38.2, 39.5, 16.6, 18.8, 20.2, 23, 23.6, 25, 27.5, 30, 35.7, 40.8, 42.2, 13.1, 17, 19.2, 20.7, 23.6, 24.3, 25.6, 28.3, 30.8, 17.2, 19.4, 20.9, 23.8, 24.5, 25.9, 28.6, 31.1, 37, 42.3, 43.8, 13.7, 17.8, 20.2, 21.8, 24.8, 25.5, 26.9, 29.7, 32.4, 38.6, 44.1, 45.7, 14, 18.3, 20.7, 22.3, 25.4, 26.2, 27.6, 30.5, 33.2, 39.6, 45.3, 46.9, 20.6, 23.4, 25.2, 28.7, 29.5, 31.2, 34.5, 37.6, 44.9, 51.4, 53.2, 22.6, 18.9, 24.7, 28.1, 30.2, 34.5, 35.5, 37.5, 41.5, 45.3, 54.2, 62.3, 64.6, 26.4, 30, 32.3, 36.8, 37.9, 40.1, 44.4, 48.5, 58.1, 66.8, 69.2, 27, 30.6, 33, 37.6, 38.8, 41, 45.4, 49.6, 59.4, 68.3, 70.8, 31.2, 35.5, 38.2, 43.6, 45, 47.6, 52.7, 57.6, 69.1, 79.7, 82.7, 24.4, 31.8, 36.2, 39, 44.6, 45.9, 48.6, 53.8, 58.8, 70.6, 81.4, 84.5, 24.5, 32, 36.3, 39.2, 44.7, 46.1, 48.8, 54, 59.1, 70.9, 81.8, 84.8, 28.5, 37.3, 42.4, 45.7, 52.3, 53.9, 57, 63.2, 69.1, 83.2, 96.1, 99.8, 41, 46.6, 50.3, 57.5, 59.3, 62.8, 69.6, 76.2, 91.8, 106, 110, 31.9, 41.8, 47.5, 51.3, 58.6, 60.4, 64, 70.9, 77.6, 93.6, 108, 112, 43.3, 49.3, 53.2, 60.8, 62.7, 66.4, 73.6, 80.6, 97.2, 112, 117, 39.3, 51.6, 58.7, 63.4, 72.5, 74.8, 79.2, 87.9, 96.3, 116, 135, 140, 152, 168, 196, 39.5, 51.7, 58.9, 63.6, 72.8, 75, 79.5, 88.2, 96.7, 117, 135, 141, 40.8, 53.6, 61, 65.8, 75.3, 77.7, 82.3, 91.3, 100, 48.2, 63.2, 72, 77.8, 89.1, 91.8, 97.3, 108, 119, 144, 167, 174, 65.3, 74.3, 80.3, 92, 94.9, 101, 112, 123, 148, 173, 179, 195, 216, 253, 56.3, 74, 84.3, 91.1, 104, 108, 114, 127, 139, 169, 196, 204, 222, 246, 59.1, 77.6, 88.5, 95.6, 110, 113, 120, 133, 146, 177, 207, 215, 234, 260, 305, 71.2, 93.6, 107, 115, 132, 136, 145, 161, 177, 215, 251, 261, 285, 316, 373, 99, 113, 122, 140, 144, 153, 170, 187, 82, 107, 123, 133, 152, 157, 166, 185, 204, 248, 290, 302, 329, 366, 83.9, 110, 126, 136, 156, 161, 171, 190, 209, 255, 298, 310, 338, 376, 446, 84.6, 111, 127, 137, 158, 163, 172, 192, 211, 257, 300, 313, 341, 379, 450, 98, 129, 147, 159, 183, 189, 200, 223, 245, 299, 350, 365, 146, 167, 181, 207, 214, 227, 253, 279, 340, 398, 415, 453, 506, 602, 708, 153, 175, 190, 218, 225, 239, 266, 293, 357, 418, 436, 477, 532, 634, 177, 202, 218, 251, 259, 275, 307, 338, 412, 484, 504, 552, 616, 736, 205, 234, 254, 292, 301, 320, 357, 393, 481, 564, 589, 644, 720, 862, 1020, 265, 303, 328, 378, 390, 414, 462, 510, 624, 735, 767, 840, 941, 1130, 1343, 267, 306, 331, 381, 393, 418, 466, 514, 630, 741, 773, 847, 949, 1140, 1355, 230, 304, 348, 376, 433, 447, 475, 531, 585, 718, 845, 882, 967, 1085, 1305, 334, 382, 414, 476, 492, 523, 584, 644, 790, 931, 972, 502, 533, 596, 657, 807, 950, 992, 1088, 1221, 445, 513, 529, 563, 628, 693, 851, 1003, 1048, 446, 514, 530, 564, 630, 695, 853, 1005, 448, 515, 532, 566, 632, 697, 856, 1009, 1053, 1156, 1297, 1564, 1868, 629, 669, 748, 825, 1014, 1196, 1250, 1372, 1541, 1862, 817, 869, 972, 1073, 1320, 1560, 1630, 1791, 2016, 2442, 2934, 901, 958, 1071, 1183, 1457, 1722, 1800, 1979, 2227, 1189, 1265, 1415, 1564, 1928, 2282, 2386, 2626, 2960, 3598, 4345, 2186, 2699, 3199, 3346, 3686, 4160, 5073, 6147, 3058, 3781, 4487, 4696, 5177, 5852, 7154, 8697, 3785, 4492, 4701, 5183, 5858, 7162, 8707, 5143, 6369, 7572, 7929, 8753, 9910, 12158, 14847, 16599, 18390, 7364, 8758, 9172, 10128, 11472, 14087, 8464, 10071, 10547, 11650, 13201, 16223, 19852, 22227, 24663, 12701, 15128, 15849, 17519, 19874
];

    var CHSPesos = [0.581, 0.75, 0.845, 0.906, 0.732, 0.952, 1.08, 1.16, 1.32, 1.35, 0.869, 1.13, 1.29, 1.39, 1.58, 1.63, 0.94, 1.23, 1.4, 1.5, 1.72, 1.77, 0.98, 1.28, 1.46, 1.57, 1.8, 1.85, 1.05, 1.38, 1.57, 1.7, 1.94, 2, 1.13, 1.48, 1.68, 1.82, 2.08, 2.15, 1.19, 1.56, 1.78, 1.92, 2.2, 2.27, 2.41, 2.67, 2.93, 1.24, 1.63, 1.85, 2, 2.3, 2.37, 2.51, 2.79, 3.06, 1.33, 1.75, 2, 2.16, 2.47, 2.55, 2.71, 3.01, 3.3, 1.35, 1.78, 2.02, 2.19, 2.51, 2.59, 2.75, 3.05, 3.35, 4.07, 1.39, 1.82, 2.08, 2.25, 2.58, 2.66, 2.83, 3.14, 3.45, 1.42, 1.87, 2.14, 2.31, 2.65, 2.74, 2.9, 3.23, 3.55, 1.48, 1.95, 2.22, 2.4, 2.76, 2.85, 3.02, 3.36, 3.7, 1.5, 1.97, 2.25, 2.44, 2.8, 2.89, 3.06, 3.41, 3.75, 1.51, 1.99, 2.27, 2.46, 2.82, 2.91, 3.09, 3.44, 3.79, 4.61, 5.39, 5.61, 1.59, 2.1, 2.39, 2.59, 2.98, 3.07, 3.26, 3.63, 4, 1.61, 2.12, 2.42, 2.62, 3.01, 3.11, 3.3, 3.68, 4.04, 4.93, 5.77, 6.01, 1.72, 2.27, 2.59, 2.81, 3.23, 3.33, 3.54, 3.94, 4.34, 1.73, 2.28, 2.61, 2.82, 3.25, 3.35, 3.56, 3.97, 4.37, 5.34, 6.26, 6.53, 1.74, 2.3, 2.63, 2.84, 3.27, 3.37, 3.58, 4, 4.4, 2.34, 2.67, 2.89, 3.33, 3.43, 3.65, 4.07, 4.48, 5.47, 1.79, 2.37, 2.71, 2.93, 3.37, 3.48, 3.69, 4.12, 4.54, 5.55, 6.51, 6.79, 1.83, 2.42, 2.76, 2.99, 3.44, 3.55, 3.77, 4.21, 4.64, 5.67, 6.66, 6.94, 1.87, 2.47, 2.82, 3.05, 3.51, 3.63, 3.85, 4.3, 4.74, 5.8, 6.81, 7.1, 1.98, 2.61, 2.99, 3.24, 3.73, 3.85, 4.09, 4.56, 5.03, 6.17, 7.25, 7.57, 2.66, 2.05, 2.71, 3.1, 3.36, 3.87, 4, 4.25, 4.74, 5.23, 6.41, 7.55, 7.88, 2.76, 3.16, 3.42, 3.94, 4.07, 4.32, 4.83, 5.33, 6.54, 7.69, 8.03, 2.16, 2.86, 3.27, 3.55, 4.08, 4.22, 4.48, 5.01, 5.52, 6.78, 7.99, 8.34, 2.18, 2.88, 3.29, 3.56, 4.11, 4.24, 4.51, 5.03, 5.55, 6.82, 8.03, 8.39, 2.93, 3.36, 3.64, 4.19, 4.33, 4.6, 5.14, 5.67, 6.97, 8.21, 8.58, 2.24, 2.96, 3.39, 3.67, 4.23, 4.37, 4.64, 5.18, 5.72, 2.97, 3.4, 3.68, 4.24, 4.38, 4.66, 5.2, 5.74, 7.05, 8.32, 8.69, 2.28, 3.01, 3.44, 3.73, 4.3, 4.44, 4.72, 5.27, 5.82, 7.15, 8.43, 8.81, 2.29, 3.03, 3.47, 3.76, 4.33, 4.48, 4.76, 5.32, 5.87, 7.21, 8.51, 8.89, 3.16, 3.61, 3.92, 4.51, 4.66, 4.96, 5.54, 6.12, 7.52, 8.88, 9.28, 3.26, 2.53, 3.35, 3.84, 4.16, 4.8, 4.96, 5.27, 5.9, 6.51, 8.01, 9.47, 9.9, 3.43, 3.93, 4.25, 4.91, 5.07, 5.39, 6.03, 6.66, 8.2, 9.69, 10.1, 3.45, 3.95, 4.28, 4.94, 5.1, 5.43, 6.07, 6.71, 8.26, 9.77, 10.2, 3.63, 4.15, 4.5, 5.19, 5.36, 5.71, 6.38, 7.05, 8.69, 10.3, 10.8, 2.76, 3.65, 4.18, 4.53, 5.23, 5.4, 5.75, 6.43, 7.1, 8.75, 10.4, 10.8, 2.76, 3.65, 4.19, 4.54, 5.24, 5.41, 5.75, 6.44, 7.11, 8.77, 10.4, 10.8, 2.9, 3.85, 4.41, 4.78, 5.51, 5.7, 6.06, 6.78, 7.5, 9.25, 10.9, 11.5, 3.97, 4.55, 4.93, 5.69, 5.88, 6.26, 7, 7.74, 9.56, 11.3, 11.8, 3.01, 4, 4.58, 4.96, 5.73, 5.92, 6.3, 7.05, 7.79, 9.62, 11.4, 11.9, 4.04, 4.63, 5.02, 5.8, 5.99, 6.38, 7.14, 7.89, 9.74, 11.5, 12.1, 3.23, 4.29, 4.91, 5.33, 6.15, 6.36, 6.76, 7.57, 8.38, 10.3, 12.3, 12.8, 14.1, 16, 19.5, 3.24, 4.29, 4.92, 5.33, 6.16, 6.36, 6.77, 7.58, 8.38, 10.4, 12.3, 12.8, 3.27, 4.34, 4.97, 5.39, 6.23, 6.44, 6.85, 7.67, 8.48, 3.46, 4.59, 5.26, 5.7, 6.59, 6.81, 7.24, 8.11, 8.98, 11.1, 13.2, 13.8, 4.64, 5.31, 5.76, 6.66, 6.88, 7.32, 8.2, 9.08, 11.2, 13.3, 13.9, 15.4, 17.4, 21.2, 3.64, 4.83, 5.54, 6.01, 6.94, 7.18, 7.64, 8.56, 9.47, 11.7, 13.9, 14.6, 16.1, 18.2, 3.7, 4.91, 5.63, 6.11, 7.06, 7.29, 7.77, 8.7, 9.63, 11.9, 14.1, 14.8, 16.3, 18.5, 22.6, 3.94, 5.23, 6, 6.5, 7.52, 7.77, 8.27, 9.27, 10.3, 12.7, 15.1, 15.8, 17.4, 19.7, 24.2, 5.33, 6.11, 6.63, 7.66, 7.92, 8.43, 9.45, 10.5, 4.12, 5.47, 6.28, 6.81, 7.87, 8.14, 8.67, 9.71, 10.8, 13.3, 15.8, 16.6, 18.3, 20.7, 4.16, 5.52, 6.34, 6.87, 7.95, 8.21, 8.74, 9.8, 10.9, 13.4, 16, 16.7, 18.5, 20.9, 25.6, 4.17, 5.54, 6.35, 6.89, 7.97, 8.23, 8.77, 9.83, 10.9, 13.5, 16, 16.8, 18.5, 21, 25.7, 4.38, 5.82, 6.68, 7.24, 8.37, 8.66, 9.22, 10.3, 11.4, 14.2, 16.9, 17.7, 6.07, 6.96, 7.55, 8.73, 9.03, 9.61, 10.8, 11.9, 14.8, 17.6, 18.4, 20.4, 23.1, 28.4, 34.7, 6.17, 7.07, 7.68, 8.88, 9.17, 9.77, 11, 12.1, 15, 17.9, 18.8, 20.7, 23.5, 28.9, 6.46, 7.41, 8.05, 9.3, 9.62, 10.2, 11.5, 12.7, 15.8, 18.8, 19.7, 21.8, 24.7, 30.3, 6.79, 7.79, 8.46, 9.78, 10.1, 10.8, 12.1, 13.4, 16.6, 19.8, 20.7, 22.9, 26, 32, 39.2, 7.4, 8.49, 9.22, 10.7, 11, 11.7, 13.2, 14.6, 18.1, 21.6, 22.6, 25, 28.4, 35, 43, 7.42, 8.51, 9.24, 10.7, 11.1, 11.8, 13.2, 14.6, 18.2, 21.7, 22.7, 25.1, 28.5, 35.1, 43.1, 5.83, 7.74, 8.89, 9.65, 11.2, 11.5, 12.3, 13.8, 15.3, 19, 22.6, 23.7, 26.2, 29.8, 36.7, 7.99, 9.17, 9.96, 11.5, 11.9, 12.7, 14.2, 15.8, 19.6, 23.4, 24.5, 12, 12.8, 14.3, 15.9, 19.7, 23.5, 24.7, 27.3, 31, 10.2, 11.8, 12.2, 13, 14.6, 16.2, 20.1, 24, 25.1, 10.2, 11.8, 12.2, 13, 14.6, 16.2, 20.1, 24, 10.2, 11.8, 12.2, 13, 14.6, 16.2, 20.1, 24, 25.2, 27.8, 31.6, 39, 48, 12.9, 13.8, 15.5, 17.1, 21.3, 25.4, 26.6, 29.5, 33.5, 41.4, 14.1, 15, 16.9, 18.7, 23.3, 27.8, 29.1, 32.2, 36.6, 45.3, 55.9, 14.6, 15.5, 17.4, 19.3, 24, 28.7, 30.1, 33.3, 37.9, 16, 17, 19.1, 21.2, 26.4, 31.5, 33.1, 36.6, 41.6, 51.6, 63.7, 23.7, 29.5, 35.3, 37, 41, 46.7, 57.8, 71.5, 26.5, 33, 39.5, 41.4, 45.9, 52.3, 64.9, 80.3, 33.1, 39.5, 41.5, 45.9, 52.3, 64.9, 80.3, 31.6, 39.3, 47, 49.3, 54.7, 62.3, 77.4, 96, 108, 121, 41.3, 49.4, 51.8, 57.4, 65.4, 81.3, 43.2, 51.7, 54.3, 60.2, 68.6, 85.2, 106, 120, 134, 49.5, 59.2, 62.2, 68.9, 78.6
];

    var CHS = new perfil(CHSNombres, CHSModulos, CHSInercias, CHSPesos);

    // Creamos un objeto de la clase perfil para perfiles de la serie SHS
    var SHSNombres = ['SHS40x40x2.5', 'SHS40x40x3', 'SHS40x40x3.2', 'SHS40x40x3.6', 'SHS40x40x4', 'SHS40x40x5', 'SHS50x50x2.5', 'SHS50x50x3', 'SHS50x50x3.2', 'SHS50x50x3.6', 'SHS50x50x4', 'SHS50x50x5', 'SHS50x50x6', 'SHS50x50x6.3', 'SHS60x60x3', 'SHS60x60x3.2', 'SHS60x60x3.6', 'SHS60x60x4', 'SHS60x60x5', 'SHS60x60x6', 'SHS60x60x6.3', 'SHS60x60x8', 'SHS70x70x3', 'SHS70x70x3.2', 'SHS70x70x3.6', 'SHS70x70x4', 'SHS70x70x5', 'SHS70x70x6', 'SHS70x70x6.3', 'SHS70x70x8', 'SHS80x80x3.2', 'SHS80x80x3.6', 'SHS80x80x4', 'SHS80x80x5', 'SHS80x80x6', 'SHS80x80x6.3', 'SHS80x80x8', 'SHS90x90x3.6', 'SHS90x90x4', 'SHS90x90x5', 'SHS90x90x6', 'SHS90x90x6.3', 'SHS90x90x8', 'SHS100x100x3.6', 'SHS100x100x4', 'SHS100x100x5', 'SHS100x100x6', 'SHS100x100x6.3', 'SHS100x100x8', 'SHS100x100x10', 'SHS120x120x4', 'SHS120x120x5', 'SHS120x120x6', 'SHS120x120x6.3', 'SHS120x120x8', 'SHS120x120x10', 'SHS120x120x12', 'SHS120x120x12.5', 'SHS140x140x5', 'SHS140x140x6', 'SHS140x140x6.3', 'SHS140x140x8', 'SHS140x140x10', 'SHS140x140x12', 'SHS140x140x12.5', 'SHS150x150x5', 'SHS150x150x6', 'SHS150x150x6.3', 'SHS150x150x8', 'SHS150x150x10', 'SHS150x150x12', 'SHS150x150x12.5', 'SHS150x150x16', 'SHS160x160x5', 'SHS160x160x6', 'SHS160x160x6.3', 'SHS160x160x8', 'SHS160x160x10', 'SHS160x160x12', 'SHS160x160x12.5', 'SHS160x160x16', 'SHS180x180x5', 'SHS180x180x6', 'SHS180x180x6.3', 'SHS180x180x8', 'SHS180x180x10', 'SHS180x180x12', 'SHS180x180x12.5', 'SHS180x180x16', 'SHS200x200x5', 'SHS200x200x6', 'SHS200x200x6.3', 'SHS200x200x8', 'SHS200x200x10', 'SHS200x200x12', 'SHS200x200x12.5', 'SHS200x200x16', 'SHS250x250x5', 'SHS250x250x6', 'SHS250x250x6.3', 'SHS250x250x8', 'SHS250x250x10', 'SHS250x250x12', 'SHS250x250x12.5', 'SHS250x250x16', 'SHS300x300x6', 'SHS300x300x6.3', 'SHS300x300x8', 'SHS300x300x10', 'SHS300x300x12', 'SHS300x300x12.5', 'SHS300x300x16', 'SHS350x350x8', 'SHS350x350x10', 'SHS350x350x12', 'SHS350x350x12.5', 'SHS350x350x16', 'SHS400x400x8', 'SHS400x400x10', 'SHS400x400x12', 'SHS400x400x12.5', 'SHS400x400x16', 'SHS400x400x20'
];

    var SHSModulos = [4.27, 4.89, 5.11, 5.54, 5.91, 6.68, 6.99, 8.08, 8.49, 9.27, 9.99, 11.6, 12.8, 13.1, 12.1, 12.7, 14, 15.1, 17.8, 20, 20.5, 23.2, 16.9, 17.8, 19.6, 21.3, 25.3, 28.7, 29.7, 34.2, 23.7, 26.2, 28.6, 34.2, 39.1, 40.5, 47.3, 33.8, 37, 44.4, 51.1, 53, 62.6, 42.3, 46.4, 55.9, 64.6, 67.1, 79.9, 92.4, 68.4, 83, 96.6, 100, 121, 142, 160, 164, 115, 135, 141, 171, 202, 230, 236, 134, 156, 163, 199, 236, 270, 277, 324, 153, 180, 187, 229, 273, 313, 322, 379, 196, 231, 241, 296, 355, 409, 421, 500, 245, 288, 301, 371, 447, 517, 534, 639, 389, 460, 481, 596, 724, 844, 873, 1061, 672, 703, 875, 1068, 1252, 1296, 1590, 1207, 1479, 1739, 1802, 2225, 1593, 1956, 2306, 2392, 2967, 3577
];

    var SHSInercias = [8.54, 9.78, 10.2, 11.1, 11.8, 13.4, 17.5, 20.2, 21.2, 23.2, 25, 28.9, 32, 32.8, 36.2, 38.2, 41.9, 45.4, 53.3, 59.9, 61.6, 69.7, 59, 62.3, 68.6, 74.7, 88.5, 101, 104, 120, 95, 105, 114, 137, 156, 162, 189, 152, 166, 200, 230, 238, 281, 212, 232, 279, 323, 336, 400, 462, 410, 498, 579, 603, 726, 852, 958, 982, 807, 944, 984, 1195, 1416, 1609, 1653, 1002, 1174, 1223, 1491, 1773, 2023, 2080, 2430, 1225, 1437, 1499, 1831, 2186, 2502, 2576, 3028, 1765, 2077, 2168, 2661, 3193, 3677, 3790, 4504, 2445, 2883, 3011, 3709, 4471, 5171, 5336, 6394, 4861, 5752, 6014, 7455, 9055, 10560, 10920, 13270, 10080, 10550, 13130, 16030, 18780, 19440, 23850, 21130, 25880, 30430, 31540, 38940, 31860, 39130, 46130, 47840, 59340, 71530
];

    var SHSPesos = [2.89, 3.41, 3.61, 4.01, 4.39, 5.28, 3.68, 4.35, 4.62, 5.14, 5.64, 6.85, 7.99, 8.31, 5.29, 5.62, 6.27, 6.9, 8.42, 9.87, 10.3, 12.5, 6.24, 6.63, 7.4, 8.15, 9.99, 11.8, 12.3, 15, 7.63, 8.53, 9.41, 11.6, 13.6, 14.2, 17.5, 9.66, 10.7, 13.1, 15.5, 16.2, 20.1, 10.8, 11.9, 14.7, 17.4, 18.2, 22.6, 27.4, 14.4, 17.8, 21.2, 22.2, 27.6, 33.7, 39.5, 40.9, 21, 24.9, 26.1, 32.6, 40, 47, 48.7, 22.6, 26.8, 28.1, 35.1, 43.1, 50.8, 52.7, 65.2, 24.1, 28.7, 30.1, 37.6, 46.3, 54.6, 56.6, 70.2, 27.3, 32.5, 34, 42.7, 52.5, 62.1, 64.4, 80.2, 30.4, 36.2, 38, 47.7, 58.8, 69.6, 72.3, 90.3, 38.3, 45.7, 47.9, 60.3, 74.5, 88.5, 91.9, 115, 55.1, 57.8, 72.8, 90.2, 107, 112, 141, 85.4, 106, 126, 131, 166, 97.9, 122, 145, 151, 191, 235
];

    var SHS = new perfil(SHSNombres, SHSModulos, SHSInercias, SHSPesos);

    // Creamos un objeto de la clase perfil para perfiles de la serie RHS
    var RHSNombres = ['RHS50x30x2.5', 'RHS50x30x3', 'RHS50x30x3.2', 'RHS50x30x3.6', 'RHS50x30x4', 'RHS50x30x5', 'RHS60x40x2.5', 'RHS60x40x3', 'RHS60x40x3.2', 'RHS60x40x3.6', 'RHS60x40x4', 'RHS60x40x5', 'RHS60x40x6', 'RHS60x40x6.3', 'RHS80x40x3', 'RHS80x40x3.2', 'RHS80x40x3.6', 'RHS80x40x4', 'RHS80x40x5', 'RHS80x40x6', 'RHS80x40x6.3', 'RHS80x40x8', 'RHS76.2x50.8x3', 'RHS76.2x50.8x3.2', 'RHS76.2x50.8x3.6', 'RHS76.2x50.8x4', 'RHS76.2x50.8x5', 'RHS76.2x50.8x6', 'RHS76.2x50.8x6.3', 'RHS76.2x50.8x8', 'RHS90x50x3', 'RHS90x50x3.2', 'RHS90x50x3.6', 'RHS90x50x4', 'RHS90x50x5', 'RHS90x50x6', 'RHS90x50x6.3', 'RHS90x50x8', 'RHS100x50x3', 'RHS100x50x3.2', 'RHS100x50x3.6', 'RHS100x50x4', 'RHS100x50x5', 'RHS100x50x6', 'RHS100x50x6.3', 'RHS100x50x8', 'RHS100x60x3', 'RHS100x60x3.2', 'RHS100x60x3.6', 'RHS100x60x4', 'RHS100x60x5', 'RHS100x60x6', 'RHS100x60x6.3', 'RHS100x60x8', 'RHS120x60x3.6', 'RHS120x60x4', 'RHS120x60x5', 'RHS120x60x6', 'RHS120x60x6.3', 'RHS120x60x8', 'RHS120x80x3.6', 'RHS120x80x4', 'RHS120x80x5', 'RHS120x80x6', 'RHS120x80x6.3', 'RHS120x80x8', 'RHS120x80x10', 'RHS150x100x4', 'RHS150x100x5', 'RHS150x100x6', 'RHS150x100x6.3', 'RHS150x100x8', 'RHS150x100x10', 'RHS150x100x12', 'RHS150x100x12.5', 'RHS160x80x4', 'RHS160x80x5', 'RHS160x80x6', 'RHS160x80x6.3', 'RHS160x80x8', 'RHS160x80x10', 'RHS160x80x12', 'RHS160x80x12.5', 'RHS200x100x5', 'RHS200x100x6', 'RHS200x100x6.3', 'RHS200x100x8', 'RHS200x100x10', 'RHS200x100x12', 'RHS200x100x12.5', 'RHS200x100x16', 'RHS250x150x5', 'RHS250x150x6', 'RHS250x150x6.3', 'RHS250x150x8', 'RHS250x150x10', 'RHS250x150x12', 'RHS250x150x12.5', 'RHS250x150x16', 'RHS300x200x5', 'RHS300x200x6', 'RHS300x200x6.3', 'RHS300x200x8', 'RHS300x200x10', 'RHS300x200x12', 'RHS300x200x12.5', 'RHS300x200x16', 'RHS400x200x6', 'RHS400x200x6.3', 'RHS400x200x8', 'RHS400x200x10', 'RHS400x200x12', 'RHS400x200x12.5', 'RHS400x200x16', 'RHS450x250x8', 'RHS450x250x10', 'RHS450x250x12', 'RHS450x250x12.5', 'RHS450x250x16', 'RHS500x300x8', 'RHS500x300x10', 'RHS500x300x12', 'RHS500x300x12.5', 'RHS500x300x16', 'RHS500x300x20'
];

    var RHSModulos = [4.73, 5.43, 5.68, 6.16, 6.6, 7.49, 7.61, 8.82, 9.27, 10.1, 10.9, 12.7, 14.1, 14.5, 13.6, 14.3, 15.7, 17.1, 20.1, 22.6, 23.3, 26.5, 14.9, 15.7, 17.3, 18.8, 22.2, 25.1, 25.9, 29.6, 18.8, 19.8, 21.8, 23.8, 28.3, 32.2, 33.3, 38.6, 21.9, 23.2, 25.6, 27.9, 33.3, 38.1, 39.4, 46, 24.7, 26.2, 28.9, 31.6, 37.8, 43.4, 45, 52.8, 37.9, 41.5, 49.9, 57.5, 59.7, 70.8, 46, 50.4, 60.9, 70.6, 73.3, 87.5, 102, 81, 98.5, 115, 120, 145, 171, 193, 198, 76.5, 93, 108, 113, 136, 161, 181, 186, 149, 175, 183, 223, 266, 305, 314, 368, 269, 317, 331, 409, 494, 572, 591, 710, 421, 499, 522, 648, 788, 920, 952, 1159, 750, 785, 978, 1196, 1403, 1453, 1787, 1337, 1640, 1930, 2001, 2476, 1749, 2150, 2538, 2633, 3271, 3951
];

    var RHSInercias = [11.8, 13.6, 14.2, 15.4, 16.5, 18.7, 22.8, 26.5, 27.8, 30.4, 32.8, 38.1, 42.3, 43.4, 54.2, 57.2, 62.8, 68.2, 80.3, 90.5, 93.3, 106, 56.7, 59.8, 65.8, 71.5, 84.4, 95.6, 98.6, 113, 84.4, 89.1, 98.3, 107, 127, 145, 150, 174, 110, 116, 128, 140, 167, 190, 197, 230, 124, 131, 145, 158, 189, 217, 225, 264, 227, 249, 299, 345, 358, 425, 276, 303, 365, 423, 440, 525, 609, 607, 739, 862, 898, 1087, 1282, 1450, 1488, 612, 744, 868, 903, 1091, 1284, 1449, 1485, 1495, 1754, 1829, 2234, 2664, 3047, 3136, 3678, 3360, 3965, 4143, 5111, 6174, 7154, 7387, 8879, 6322, 7486, 7829, 9717, 11820, 13800, 14270, 17390, 15000, 15700, 19560, 23910, 28060, 29060, 35740, 30080, 36890, 43430, 45030, 55710, 43730, 53760, 63450, 65810, 81780, 98780
];

    var RHSPesos = [2.89, 3.41, 3.61, 4.01, 4.39, 5.28, 3.68, 4.35, 4.62, 5.14, 5.64, 6.85, 7.99, 8.31, 5.29, 5.62, 6.27, 6.9, 8.42, 9.87, 10.3, 12.5, 5.62, 5.97, 6.66, 7.34, 8.97, 10.5, 11, 13.4, 6.24, 6.63, 7.4, 8.15, 9.99, 11.8, 12.3, 15, 6.71, 7.13, 7.96, 8.78, 10.8, 12.7, 13.3, 16.3, 7.18, 7.63, 8.53, 9.41, 11.6, 13.6, 14.2, 17.5, 9.66, 10.7, 13.1, 15.5, 16.2, 20.1, 10.8, 11.9, 14.7, 17.4, 18.2, 22.6, 27.4, 15.1, 18.6, 22.1, 23.1, 28.9, 35.3, 41.4, 42.8, 14.4, 17.8, 21.2, 22.2, 27.6, 33.7, 39.5, 40.9, 22.6, 26.8, 28.1, 35.1, 43.1, 50.8, 52.7, 65.2, 30.4, 36.2, 38, 47.7, 58.8, 69.6, 72.3, 90.3, 38.3, 45.7, 47.9, 60.3, 74.5, 88.5, 91.9, 115, 55.1, 57.8, 72.8, 90.2, 107, 112, 141, 85.4, 106, 126, 131, 166, 97.9, 122, 145, 151, 191, 235
];

    var RHS = new perfil(RHSNombres, RHSModulos, RHSInercias, RHSPesos);

    // Creamos un objeto de la clase perfil para perfiles de la serie L
    var LNombres = ['L20x20x3', 'L25x25x3', 'L25x25x4', 'L30x30x3', 'L30x30x4', 'L35x35x4', 'L35x35x5', 'L40x40x4', 'L40x40x5', 'L40x40x6', 'L45x45x3', 'L45x45x4', 'L45x45x4.5', 'L45x45x5', 'L45x45x6', 'L45x45x7', 'L50x50x4', 'L50x50x5', 'L50x50x6', 'L50x50x7', 'L50x50x8', 'L50x50x9', 'L55x55x4', 'L55x55x5', 'L55x55x6', 'L60x60x4', 'L60x60x5', 'L60x60x6', 'L60x60x7', 'L60x60x8', 'L60x60x10', 'L63x63x5', 'L63x63x6', 'L63x63x6.5', 'L65x65x4', 'L65x65x5', 'L65x65x6', 'L65x65x7', 'L65x65x8', 'L65x65x9', 'L65x65x10', 'L65x65x11', 'L70x70x5', 'L70x70x6', 'L70x70x7', 'L70x70x8', 'L70x70x9', 'L70x70x10', 'L75x75x4', 'L75x75x5', 'L75x75x6', 'L75x75x7', 'L75x75x8', 'L75x75x9', 'L75x75x10', 'L80x80x5', 'L80x80x6', 'L80x80x7', 'L80x80x8', 'L80x80x9', 'L80x80x10', 'L90x90x5', 'L90x90x6', 'L90x90x7', 'L90x90x8', 'L90x90x9', 'L90x90x10', 'L90x90x11', 'L90x90x16', 'L100x100x6', 'L100x100x7', 'L100x100x8', 'L100x100x9', 'L100x100x10', 'L100x100x11', 'L100x100x12', 'L100x100x14', 'L100x100x16', 'L110x110x6', 'L110x110x7', 'L110x110x8', 'L110x110x9', 'L110x110x10', 'L110x110x11', 'L110x110x12', 'L120x120x7', 'L120x120x8', 'L120x120x9', 'L120x120x10', 'L120x120x11', 'L120x120x12', 'L120x120x13', 'L120x120x14', 'L120x120x15', 'L120x120x16', 'L130x130x8', 'L130x130x9', 'L130x130x10', 'L130x130x11', 'L130x130x12', 'L130x130x13', 'L130x130x14', 'L130x130x15', 'L130x130x16', 'L140x140x9', 'L140x140x10', 'L140x140x11', 'L140x140x12', 'L140x140x13', 'L140x140x14', 'L140x140x15', 'L140x140x16', 'L150x150x10', 'L150x150x12', 'L150x150x13', 'L150x150x14', 'L150x150x15', 'L150x150x16', 'L150x150x18', 'L150x150x20', 'L160x160x14', 'L160x160x15', 'L160x160x16', 'L160x160x17', 'L160x160x18', 'L160x160x19', 'L180x180x13', 'L180x180x14', 'L180x180x15', 'L180x180x16', 'L180x180x17', 'L180x180x18', 'L180x180x19', 'L180x180x20', 'L200x200x13', 'L200x200x15', 'L200x200x16', 'L200x200x17', 'L200x200x18', 'L200x200x19', 'L200x200x20', 'L200x200x21', 'L200x200x22', 'L200x200x23', 'L200x200x24', 'L200x200x25', 'L200x200x26', 'L200x200x28', 'L250x250x17', 'L250x250x18', 'L250x250x19', 'L250x250x20', 'L250x250x21', 'L250x250x22', 'L250x250x23', 'L250x250x24', 'L250x250x25', 'L250x250x26', 'L250x250x27', 'L250x250x28', 'L250x250x29', 'L250x250x30', 'L250x250x31', 'L250x250x32', 'L250x250x33', 'L250x250x34', 'L250x250x35', 'L300x300x25', 'L300x300x26', 'L300x300x27', 'L300x300x28', 'L300x300x29', 'L300x300x30', 'L300x300x31', 'L300x300x32', 'L300x300x33', 'L300x300x34', 'L300x300x35'
];

    var LModulos = [0.276, 0.448, 0.582, 0.649, 0.85, 1.18, 1.45, 1.55, 1.91, 2.26, 1.49, 1.97, 2.2, 2.43, 2.88, 3.31, 2.46, 3.05, 3.61, 4.16, 4.68, 5.2, 2.98, 3.7, 4.39, 3.58, 4.45, 5.29, 6.1, 6.89, 8.41, 4.88, 5.82, 6.27, 4.19, 5.22, 6.21, 7.18, 8.13, 9.05, 9.94, 10.82, 6.1, 7.27, 8.41, 9.46, 10.6, 11.66, 5.67, 7.06, 8.41, 9.74, 11.03, 12.29, 13.52, 8.02, 9.57, 11.09, 12.58, 14.03, 15.45, 10.18, 12.26, 14.13, 16.05, 17.93, 19.77, 21.57, 30.11, 15.09, 17.54, 19.94, 22.3, 24.62, 26.89, 29.12, 33.48, 37.7, 18.43, 21.43, 24.37, 27.26, 29.99, 32.79, 35.54, 25.57, 29.11, 32.59, 36.03, 39.41, 42.73, 46.01, 49.25, 52.43, 55.57, 34.26, 38.39, 42.47, 46.48, 50.44, 54.35, 58.2, 62, 65.75, 44.66, 49.43, 54.14, 58.78, 63.37, 67.89, 72.36, 76.77, 56.91, 67.75, 73.07, 78.33, 83.52, 88.65, 98.74, 108.6, 89.5, 95.47, 101.4, 107.2, 113, 118.7, 106.5, 114.3, 122, 129.7, 137.2, 144.7, 152.1, 159.4, 132.8, 152.2, 161.7, 171.2, 180.6, 189.9, 199.1, 208.2, 217.3, 226.3, 235.2, 244, 252.7, 270, 268.7, 283.8, 298.9, 313.8, 328.6, 343.3, 357.8, 372.3, 386.7, 400.9, 415.1, 429.2, 443.1, 457, 470.8, 484.4, 498, 511.5, 524.9, 561.1, 582.5, 603.5, 624.6, 645.2, 666, 686.3, 707.2, 727.2, 747.7, 767.4
];

    var LInercias = [0.388, 0.796, 1.01, 1.4, 1.8, 2.95, 3.56, 4.47, 5.43, 6.31, 4.93, 6.43, 7.15, 7.84, 9.16, 10.4, 8.97, 10.96, 12.84, 14.61, 16.28, 17.86, 12, 14.71, 17.29, 15.78, 19.37, 22.79, 26.05, 29.15, 34.93, 22.42, 26.44, 28.37, 20.09, 24.74, 29.19, 33.43, 37.49, 41.37, 45.08, 48.64, 31.24, 36.88, 42.3, 47.27, 52.47, 57.24, 31.43, 38.77, 45.83, 52.61, 59.13, 65.4, 71.43, 47.14, 55.82, 64.19, 72.25, 80.01, 87.5, 67.67, 80.72, 92.55, 104.4, 115.8, 126.9, 137.6, 186.4, 111.1, 128.2, 144.8, 161, 176.7, 191.9, 206.7, 235, 261.7, 149.5, 172.7, 195.3, 217.3, 238, 258.8, 279.1, 225.6, 255.4, 284.5, 312.9, 340.6, 367.7, 394, 419.8, 444.9, 469.4, 326.7, 364.4, 401.1, 437.1, 472.2, 506.5, 540.1, 572.9, 605, 457.8, 504.4, 550.1, 594.8, 638.5, 681.4, 723.3, 764.4, 624, 736.9, 791.7, 845.4, 898.1, 949.7, 1050, 1146, 1034, 1099, 1163, 1225, 1287, 1347, 1396, 1493, 1589, 1682, 1775, 1866, 1955, 2043, 1939, 2209, 2341, 2472, 2600, 2726, 2851, 2973, 3094, 3213, 3331, 3446, 3560, 3784, 4893, 5156, 5417, 5674, 5929, 6180, 6429, 6674, 6917, 7156, 7393, 7627, 7858, 8087, 8313, 8536, 8757, 8975, 9191, 12150, 12590, 13020, 13450, 13870, 14290, 14700, 15120, 15520, 15930, 16320
];

    var LPesos = [0.882, 1.12, 1.45, 1.36, 1.78, 2.09, 2.57, 2.42, 2.97, 3.52, 2.09, 2.74, 3.06, 3.38, 4, 4.6, 3.06, 3.77, 4.47, 5.15, 5.82, 6.47, 3.38, 4.18, 4.95, 3.7, 4.57, 5.42, 6.26, 7.09, 8.69, 4.82, 5.72, 6.17, 4.02, 4.97, 5.91, 6.83, 7.73, 8.62, 9.49, 10.3, 5.37, 6.38, 7.38, 8.37, 9.32, 10.3, 4.65, 5.76, 6.85, 7.93, 8.99, 10, 11.1, 6.17, 7.34, 8.49, 9.63, 10.8, 11.9, 6.97, 8.28, 9.61, 10.9, 12.2, 13.4, 14.7, 20.7, 9.26, 10.7, 12.2, 13.6, 15, 16.4, 17.8, 20.6, 23.2, 10.2, 11.8, 13.4, 15, 16.6, 18.2, 19.7, 12.9, 14.7, 16.5, 18.2, 19.9, 21.6, 23.3, 25, 26.6, 28.3, 16, 17.9, 19.8, 21.7, 23.5, 25.4, 27.2, 29, 30.8, 19.3, 21.4, 23.4, 25.4, 27.5, 29.4, 31.4, 33.3, 23, 27.3, 29.5, 31.6, 33.8, 35.9, 40.1, 44.2, 33.9, 36.2, 38.4, 40.7, 42.9, 45.1, 35.7, 38.3, 40.9, 43.5, 46, 48.6, 51.1, 53.7, 39.8, 45.6, 48.5, 51.4, 54.2, 57.1, 59.9, 62.8, 65.6, 68.3, 71.1, 73.9, 76.6, 82, 64.4, 68.1, 71.7, 75.3, 78.9, 82.5, 86.1, 89.7, 93.2, 96.7, 101, 104, 107, 111, 114, 118, 121, 124, 128, 112, 116, 121, 125, 129, 133, 138, 142, 146, 150, 154
];

    var L = new perfil(LNombres, LModulos, LInercias, LPesos);

    // Creamos un objeto de la clase perfil para perfiles de la serie LD
    var LDNombres = ['L100x65x7', 'L100x65x8', 'L100x65x9', 'L100x65x10', 'L100x65x12', 'L110x70x10', 'L110x70x12', 'L120x80x8', 'L120x80x10', 'L120x80x12', 'L130x90x10', 'L130x90x12', 'L130x90x14', 'L140x90x8', 'L140x90x10', 'L140x90x12', 'L140x90x14', 'L150x90x10', 'L150x90x11', 'L150x90x12', 'L150x100x10', 'L150x100x12', 'L150x100x14', 'L200x100x10', 'L200x100x12', 'L200x100x14', 'L200x100x15', 'L200x100x16'
];

    var LDModulos = [16.61, 18.85, 21.05, 23.2, 27.38, 28.27, 33.4, 27.63, 34.1, 40.37, 40.7, 47.97, 55.5, 37.86, 46.81, 55.5, 63.96, 53.29, 58.3, 63.25, 54.23, 64.38, 74.27, 93.24, 111, 128.4, 137, 145.4
];

    var LDInercias = [112.5, 126.8, 140.6, 154, 179.6, 206.6, 241.5, 225.7, 275.5, 322.8, 359.7, 420.4, 481.4, 360, 440.9, 518.1, 591.9, 533.1, 580.7, 627.3, 552.6, 650.5, 744.4, 1219, 1440, 1654, 1758, 1861
];

    var LDPesos = [8.77, 9.94, 11.1, 12.3, 14.5, 13.4, 15.9, 12.2, 15, 17.8, 16.6, 19.7, 22.8, 14, 17.4, 20.6, 23.8, 18.2, 19.9, 21.6, 19, 22.5, 26.1, 23, 27.3, 31.6, 33.7, 35.9
];

    var LD = new perfil(LDNombres, LDModulos, LDInercias, LDPesos);

    // Creamos un objeto de la clase perfil para perfiles de la serie ZP
    var ZPNombres = ['ZP100x2', 'ZP100x2.5', 'ZP100x3', 'ZP125x2', 'ZP125x2.5', 'ZP125x3', 'ZP140x2', 'ZP140x2.5', 'ZP140x3', 'ZP150x2', 'ZP150x2.5', 'ZP150x3', 'ZP160x2', 'ZP160x2.5', 'ZP160x3', 'ZP175x2', 'ZP175x2.5', 'ZP175x3', 'ZP200x2', 'ZP200x2.5', 'ZP200x3', 'ZP200x4', 'ZP225x2', 'ZP225x2.5', 'ZP225x3', 'ZP225x4', 'ZP250x2', 'ZP250x2.5', 'ZP250x3', 'ZP250x4', 'ZP275x2', 'ZP275x2.5', 'ZP275x3', 'ZP275x4', 'ZP300x2', 'ZP300x2.5', 'ZP300x3', 'ZP300x4', 'ZP325x2', 'ZP325x2.5', 'ZP325x3', 'ZP325x4', 'ZP350x2', 'ZP350x2.5', 'ZP350x3', 'ZP350x4'
];

    var ZPModulos = [14.2, 17.25, 20.11, 19.19, 23.38, 27.34, 22.39, 27.32, 31.98, 24.61, 30.05, 35.21, 26.9, 32.87, 38.54, 30.45, 37.25, 43.73, 47.46, 58.34, 68.84, 88.04, 55.6, 68.42, 80.81, 103.57, 64.17, 79.02, 93.41, 119.95, 73.15, 90.15, 106.64, 137.18, 82.56, 101.8, 120.5, 155.24, 92.38, 113.98, 134.99, 174.14, 102.62, 126.68, 150.1, 193.88
];

    var ZPInercias = [71.02, 86.26, 100.55, 119.94, 146.13, 170.85, 156.73, 191.22, 223.89, 184.57, 225.37, 264.1, 215.17, 262.93, 308.35, 266.47, 325.95, 382.64, 474.58, 583.43, 688.44, 880.39, 625.51, 769.71, 909.12, 1165.21, 802.07, 987.76, 1167.62, 1499.42, 1005.83, 1239.56, 1466.3, 1886.17, 1238.34, 1527.04, 1807.49, 2328.56, 1501.17, 1852.16, 2193.55, 2829.74, 1795.88, 2216.88, 2626.81, 3392.82
];

    var ZPPesos = [3.62, 4.46, 5.28, 4.02, 4.96, 5.88, 4.26, 5.26, 6.24, 4.42, 5.46, 6.48, 4.58, 5.66, 6.72, 4.82, 5.96, 7.08, 6.16, 7.64, 9.09, 11.85, 6.56, 8.14, 9.69, 12.65, 6.96, 8.64, 10.29, 13.45, 7.36, 9.14, 10.89, 14.25, 7.76, 9.64, 11.49, 15.05, 8.16, 10.14, 12.09, 15.85, 8.56, 10.64, 12.69, 16.65
];

    var ZP = new perfil(ZPNombres, ZPModulos, ZPInercias, ZPPesos);

    // Creamos un objeto de la clase perfil para perfiles de la serie CP
    var CPNombres = ['CP100x2', 'CP100x2.5', 'CP100x3', 'CP120x2', 'CP120x2.5', 'CP120x3', 'CP140x2', 'CP140x2.5', 'CP140x3', 'CP150x2', 'CP150x2.5', 'CP150x3', 'CP160x2', 'CP160x2.5', 'CP160x3', 'CP180x2', 'CP180x2.5', 'CP180x3', 'CP200x2', 'CP200x2.5', 'CP200x3', 'CP200x3.5', 'CP200x4', 'CP225x2', 'CP225x2.5', 'CP225x3', 'CP225x3.5', 'CP225x4', 'CP250x2', 'CP250x2.5', 'CP250x3', 'CP250x3.5', 'CP250x4', 'CP275x2', 'CP275x2.5', 'CP275x3', 'CP275x3.5', 'CP275x4', 'CP300x2', 'CP300x2.5', 'CP300x3', 'CP300x3.5', 'CP300x4', 'CP325x2', 'CP325x2.5', 'CP325x3', 'CP-325x3.5', 'CP-325x4', 'CP-350x2', 'CP-350x2.5', 'CP-350x3', 'CP-350x3.5', 'CP-350x4'
];

    var CPModulos = [13.94, 16.92, 19.72, 17.83, 21.71, 25.36, 22.01, 26.84, 31.42, 24.2, 29.54, 34.6, 26.46, 32.32, 37.89, 31.17, 38.13, 44.77, 49.47, 60.84, 71.83, 82.14, 91.99, 57.87, 71.24, 84.18, 96.36, 108.03, 66.68, 82.15, 97.16, 111.32, 124.91, 75.92, 93.6, 110.76, 127.01, 142.64, 85.58, 105.57, 125, 143.44, 161.2, 95.65, 118.06, 139.87, 160.6, 180.61, 106.15, 131.07, 155.36, 178.49, 200.85
];

    var CPInercias = [69.69, 84.61, 98.59, 107, 130.25, 152.16, 154.05, 187.89, 219.94, 181.48, 221.53, 259.53, 211.64, 258.55, 303.12, 280.56, 343.2, 402.92, 494.69, 608.45, 718.32, 821.39, 919.85, 650.98, 801.41, 947, 1084.03, 1215.29, 833.53, 1026.94, 1214.45, 1391.46, 1561.38, 1043.9, 1286.98, 1523.01, 1746.4, 1961.26, 1283.66, 1583.5, 1875.03, 2151.58, 2418.05, 1554.36, 1918.45, 2272.86, 2609.75, 2934.87, 1857.57, 2293.77, 2718.83, 3123.64, 3514.84
];

    var CPPesos = [3.57, 4.4, 5.2, 3.89, 4.8, 5.68, 4.21, 5.2, 6.16, 4.37, 5.4, 6.4, 4.53, 5.6, 6.64, 4.85, 6, 7.12, 6.32, 7.84, 9.33, 10.76, 12.17, 6.72, 8.34, 9.93, 11.46, 12.97, 7.12, 8.84, 10.53, 12.16, 13.77, 7.52, 9.34, 11.13, 12.86, 14.57, 7.92, 9.84, 11.73, 13.56, 15.37, 8.32, 10.34, 12.33, 14.26, 16.17, 8.72, 10.84, 12.93, 14.96, 16.97
];

    var CP = new perfil(CPNombres, CPModulos, CPInercias, CPPesos);

    // Creamos un objeto de la clase viga para la viga a calcular
    var vigaCalculo = new viga();

    // Definimos las variables que van a albergar el nombre del perfil último y de servicio;
    var cantoUltimo;
    var cantoServicio;
    var inerciaServicio;
    var pesoUltimo;
    var pesoServicio;

    var error = '';

    // Obtenemos los datos de la web y los asignamos a nuestra viga a calcular
    vigaCalculo.setVigaData('luz', getAnswer('luz'));
    if (vigaCalculo.getVigaData('luz') < 0) {
        error += 'Ha introducido una luz negativa</br>';
    }

    vigaCalculo.setVigaData('faja', getAnswer('faja'));
    if (vigaCalculo.getVigaData('faja') < 0) {
        error += 'Ha introducido una faja de carga negativa</br>';
    }

    switch (getAnswer('enlaces')) {
    case "Articulado-Articulado":
        vigaCalculo.setVigaData('coefMom', 8);
        vigaCalculo.setVigaData('coefFle', 0.013020833);
        break;
    case "Articulado-Empotrado":
        vigaCalculo.setVigaData('coefMom', 8);
        vigaCalculo.setVigaData('coefFle', 0.005405405);
        break;
    case "Empotrado-Empotrado":
        vigaCalculo.setVigaData('coefMom', 12);
        vigaCalculo.setVigaData('coefFle', 0.002604166);
        break;
    case "Voladizo":
        vigaCalculo.setVigaData('coefMom', 2);
        vigaCalculo.setVigaData('coefFle', 0.125);
        break;
    }

    vigaCalculo.setVigaData('pesoPropio', getAnswer('pesoPropio'));
    if (vigaCalculo.getVigaData('pesoPropio') < 0) {
        error += 'Ha introducido un peso propio negativo</br>';
    }

    vigaCalculo.setVigaData('sobreCarga', getAnswer('sobrecarga'));
    if (vigaCalculo.getVigaData('sobreCarga') < 0) {
        error += 'Ha introducido una sobrecarga negativa</br>';
    }

    // El dato de la flecha límite lo obtenemos de la web y lo asignamos a nuestra viga a calcular
    var selectorFlecha = getAnswer('limite');
    switch (selectorFlecha) {
    case "Tabiques frágiles":
        vigaCalculo.setVigaData('flecha', 500);
        break;
    case "Tabiques ordinarios":
        vigaCalculo.setVigaData('flecha', 400);
        break;
    case "El resto de los casos":
        vigaCalculo.setVigaData('flecha', 300);
        break;
    }
    
    // Obtenemos la serie elegida y encontramos el perfil último y de servicio
    var selectorPerfil = getAnswer('perfil');
    switch (selectorPerfil) {
    case "IPE":
        cantoUltimo = IPE.encontrarPerfil(vigaCalculo.calculoModulo(), IPE.getModulo(), false);
        cantoServicio = IPE.encontrarPerfil(vigaCalculo.calculoInercia(), IPE.getInercia(), false);
        inerciaServicio = IPE.encontrarInercia(cantoServicio);
        break;
    case "IPN":
        cantoUltimo = IPN.encontrarPerfil(vigaCalculo.calculoModulo(), IPN.getModulo(), false);
        cantoServicio = IPN.encontrarPerfil(vigaCalculo.calculoInercia(), IPN.getInercia(), false);
        inerciaServicio = IPN.encontrarInercia(cantoServicio);
        break;
    case "HEA":
        cantoUltimo = HEA.encontrarPerfil(vigaCalculo.calculoModulo(), HEA.getModulo(), false);
        cantoServicio = HEA.encontrarPerfil(vigaCalculo.calculoInercia(), HEA.getInercia(), false);
        inerciaServicio = HEA.encontrarInercia(cantoServicio);
        break;
    case "HEB":
        cantoUltimo = HEB.encontrarPerfil(vigaCalculo.calculoModulo(), HEB.getModulo(), false);
        cantoServicio = HEB.encontrarPerfil(vigaCalculo.calculoInercia(), HEB.getInercia(), false);
        inerciaServicio = HEB.encontrarInercia(cantoServicio);
        break;
    case "HEM":
        cantoUltimo = HEM.encontrarPerfil(vigaCalculo.calculoModulo(), HEM.getModulo(), false);
        cantoServicio = HEM.encontrarPerfil(vigaCalculo.calculoInercia(), HEM.getInercia(), false);
        inerciaServicio = HEM.encontrarInercia(cantoServicio);
        break;
    case "UPE":
        cantoUltimo = UPE.encontrarPerfil(vigaCalculo.calculoModulo(), UPE.getModulo(), false);
        cantoServicio = UPE.encontrarPerfil(vigaCalculo.calculoInercia(), UPE.getInercia(), false);
        inerciaServicio = UPE.encontrarInercia(cantoServicio);
        break;
    case "UPN":
        cantoUltimo = UPN.encontrarPerfil(vigaCalculo.calculoModulo(), UPN.getModulo(), false);
        cantoServicio = UPN.encontrarPerfil(vigaCalculo.calculoInercia(), UPN.getInercia(), false);
        inerciaServicio = UPN.encontrarInercia(cantoServicio);
        break;
    case "CHS (tubo circular conformado en caliente)":
        cantoUltimo = CHS.encontrarPerfil(vigaCalculo.calculoModulo(), CHS.getModulo(), false);
        cantoServicio = CHS.encontrarPerfil(vigaCalculo.calculoInercia(), CHS.getInercia(), false);
        pesoUltimo = CHS.encontrarPerfil(vigaCalculo.calculoModulo(), CHS.getModulo(), CHS.getPeso());
        pesoServicio = CHS.encontrarPerfil(vigaCalculo.calculoInercia(), CHS.getInercia(), CHS.getPeso());
        inerciaServicio = CHS.encontrarInercia(cantoServicio);
        break;
    case "SHS (tubo cuadrado conformado en caliente)":
        cantoUltimo = SHS.encontrarPerfil(vigaCalculo.calculoModulo(), SHS.getModulo(), false);
        cantoServicio = SHS.encontrarPerfil(vigaCalculo.calculoInercia(), SHS.getInercia(), false);
        pesoUltimo = SHS.encontrarPerfil(vigaCalculo.calculoModulo(), SHS.getModulo(), SHS.getPeso());
        pesoServicio = SHS.encontrarPerfil(vigaCalculo.calculoInercia(), SHS.getInercia(), SHS.getPeso());
        inerciaServicio = SHS.encontrarInercia(cantoServicio);
        break;
    case "RHS (tubo rectangular conformado en caliente)":
        cantoUltimo = RHS.encontrarPerfil(vigaCalculo.calculoModulo(), RHS.getModulo(), false);
        cantoServicio = RHS.encontrarPerfil(vigaCalculo.calculoInercia(), RHS.getInercia(), false);
        pesoUltimo = RHS.encontrarPerfil(vigaCalculo.calculoModulo(), RHS.getModulo(), RHS.getPeso());
        pesoServicio = RHS.encontrarPerfil(vigaCalculo.calculoInercia(), RHS.getInercia(), RHS.getPeso());
        inerciaServicio = RHS.encontrarInercia(cantoServicio);
        break;
    case "L (lados iguales)":
        cantoUltimo = L.encontrarPerfil(vigaCalculo.calculoModulo(), L.getModulo(), false);
        cantoServicio = L.encontrarPerfil(vigaCalculo.calculoInercia(), L.getInercia(), false);
        pesoUltimo = L.encontrarPerfil(vigaCalculo.calculoModulo(), L.getModulo(), L.getPeso());
        pesoServicio = L.encontrarPerfil(vigaCalculo.calculoInercia(), L.getInercia(), L.getPeso());
        inerciaServicio = L.encontrarInercia(cantoServicio);
        break;
    case "L (lados desiguales)":
        cantoUltimo = LD.encontrarPerfil(vigaCalculo.calculoModulo(), LD.getModulo(), false);
        cantoServicio = LD.encontrarPerfil(vigaCalculo.calculoInercia(), LD.getInercia(), false);
        pesoUltimo = LD.encontrarPerfil(vigaCalculo.calculoModulo(), LD.getModulo(), LD.getPeso());
        pesoServicio = LD.encontrarPerfil(vigaCalculo.calculoInercia(), LD.getInercia(), LD.getPeso());
        inerciaServicio = LD.encontrarInercia(cantoServicio);
        break;
    case "Zeta (conformado en frío)":
        cantoUltimo = ZP.encontrarPerfil(vigaCalculo.calculoModulo(), ZP.getModulo(), false);
        cantoServicio = ZP.encontrarPerfil(vigaCalculo.calculoInercia(), ZP.getInercia(), false);
        pesoUltimo = ZP.encontrarPerfil(vigaCalculo.calculoModulo(), ZP.getModulo(), ZP.getPeso());
        pesoServicio = ZP.encontrarPerfil(vigaCalculo.calculoInercia(), ZP.getInercia(), ZP.getPeso());
            inerciaServicio = ZP.encontrarInercia(cantoServicio);
        break;
    case "Ce (conformado en frío)":
        cantoUltimo = CP.encontrarPerfil(vigaCalculo.calculoModulo(), CP.getModulo(), false);
        cantoServicio = CP.encontrarPerfil(vigaCalculo.calculoInercia(), CP.getInercia(), false);
        pesoUltimo = CP.encontrarPerfil(vigaCalculo.calculoModulo(), CP.getModulo(), CP.getPeso());
        pesoServicio = CP.encontrarPerfil(vigaCalculo.calculoInercia(), CP.getInercia(), CP.getPeso());
        inerciaServicio = CP.encontrarInercia(cantoServicio);
        break;
    }
    
    var calculoFlecha = function () {
        var pesoPropio = vigaCalculo.getVigaData('pesoPropio');
        var sobreCarga = vigaCalculo.getVigaData('sobreCarga');
        var faja = vigaCalculo.getVigaData('faja');
        var coefFle = vigaCalculo.getVigaData('coefFle');
        var luz = vigaCalculo.getVigaData('luz');
        
        var cargaLineal = (pesoPropio * 1 + sobreCarga * 1) * faja;
        var flecha = (coefFle * cargaLineal * luz * luz * luz * luz) * 100000000 / (moduloAcero * inerciaServicio) * 1000;
        
        return Math.round(flecha);
    };
    
    resultado = 'El módulo resistente necesario es de <b>'+Math.round(vigaCalculo.calculoModulo())+'mm3</b></br> y el momento de inercia ha de ser como mínimo de <b>'+Math.round(vigaCalculo.calculoInercia())+'mm4</b>.</br>';
    
    if (cantoUltimo === 'No existe ningún perfil que soporte esa carga' && cantoServicio === 'No existe ningún perfil que soporte esa carga') {
        resultado += 'No existe ningún perfil que soporte esa carga';
    } else if (selectorPerfil !== "CHS (tubo circular conformado en caliente)" && selectorPerfil !== "SHS (tubo cuadrado conformado en caliente)" && selectorPerfil !== "RHS (tubo rectangular conformado en caliente)" && selectorPerfil !== "L (lados iguales)" && selectorPerfil !== "L (lados desiguales)" && selectorPerfil !== "Zeta (conformado en frío)" && selectorPerfil !== "Ce (conformado en frío)") {
        if (cantoUltimo === 'No existe ningún perfil que soporte esa carga' && cantoServicio !== 'No existe ningún perfil que soporte esa carga') {
            resultado += 'No existe ningún perfil que soporte esa carga a resistencia. </br>A deformación es necesario un <b>' + cantoServicio + '</b>. </br>La flecha será de ' + calculoFlecha() + ' mm.';
        } else if (cantoUltimo !== 'No existe ningún perfil que soporte esa carga' && cantoServicio === 'No existe ningún perfil que soporte esa carga') {
            resultado += 'A resistencia es necesario un <b>' + cantoUltimo + '</b>. </br>No existe ningún perfil que soporte esa carga a deformación.';
        } else if (error !== '') {
            resultado += error;
        } else {
            resultado += 'A resistencia es necesario un <b>' + cantoUltimo + '</b>. </br>A deformación es necesario un <b>' + cantoServicio + '</b>. </br>La flecha será de ' + calculoFlecha() + ' mm.';
        }
    } else {
        if (cantoUltimo === 'No existe ningún perfil que soporte esa carga' && cantoServicio !== 'No existe ningún perfil que soporte esa carga') {
            resultado += 'No existe ningún perfil que soporte esa carga a resistencia. </br>A deformación y con menor peso es necesario un <b>' + pesoServicio + '</b>,</br>y a deformación y con menos canto es necesario un <b>' + perfilServicio[0] + '</b>. </br>La flecha será de ' + calculoFlecha() + ' mm.';
        } else if (cantoUltimo !== 'No existe ningún perfil que soporte esa carga' && cantoServicio === 'No existe ningún perfil que soporte esa carga') {
            resultado += 'A resistencia y con menos peso es necesario un <b>' + pesoUltimo + '</b>,</br>y a resistencia y con menos canto es necesario un <b>' + cantoUltimo + '</b>. </br>No existe ningún perfil que soporte esa carga a deformación.';
        } else if (error !== '') {
            resultado += error;
        } else {
            resultado += 'A resistencia y con menos peso es necesario un <b>' + pesoUltimo + '</b>,</br>y a resistencia y con menos canto es necesario un <b>' + cantoUltimo + '</b>.</br>A deformación y con menos peso es necesario un <b>' + pesoServicio + '</b>,</br>y a deformación y con menos canto es necesario un <b>' + cantoServicio + '</b>. </br>La flecha será de ' + calculoFlecha() + ' mm.';
        }
    }
    return resultado;
    }