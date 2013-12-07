//createSequence method creates a new sequence
createSequence(
    'es', //Sequence language
    'Calcular una viga de acero', //Sequence title
    'Calcula la viga de acero en función de las cargas introducidas', //Sequence info
    'Lampantino', //Sequence author
    'sre.quereck@gmail.com', //Sequence author email
    '0.1', //Sequence last version
    '11/09/2013', //Sequence last review date
 ['1NYcpukkrV6UywyJkggWkv7FwhDhijtM1C', 'https://flattr.com/submit/auto?user_id=lampantino&url=https%3A%2F%2Fc9.io%2Flampantino%2Fstepando%2Fworkspace%2Findex.html%3Fengineering%26vigaacero', 'https://www.gittip.com/lampantino'], //Sequence donation adresses
    'Estos resultados son orientativos y únicamente útiles para un predimensionado' //Sequence result information
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'luz', //Step reference
    '¿Qué luz tiene la viga?', //Step question
    'Input', //Step type
    'Float', //Step option
    'faja', //Next step
    'Ha de introducir la dimensión en metros' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'faja', //Step reference
    '¿Qué faja de carga tiene el paño?', //Step question
    'Input', //Step type
    'Float', //Step option
    'pesoPropio', //Next step
    'Ha de introducir la dimensión en metros' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'pesoPropio', //Step reference
    '¿Cuál es el peso propio del forjado?', //Step question
    'Input', //Step type
    'Float', //Step option
    'sobrecarga', //Next step
    'Ha de introducir el peso en kN/m2' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'sobrecarga', //Step reference
    '¿Cuál es la sobrecarga del forjado?', //Step question
    'Input', //Step type
    'Float', //Step option
    'perfil', //Next step
    'Ha de introducir el peso en kN/m2' //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep(
    'perfil', //Step reference
    '¿A qué serie pertenece el perfil que desea calcular?', //Step question
    'Select', //Step type
 ['IPE', 'IPN'], //Step option
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
    var viga = function (vLuz, vFaja, vInercia, vModulo, vFlechaLimite, vPesoPropio, vSobreCarga) {
        // Propiedades
        // Geometría	
        var luz = vLuz; // en m
        var faja = vFaja; // en m
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
            return (cargaLinealMayorada * luz * luz / 8) * 1000000 / tensionAcero;
        };
        // Funci��n que devuleve la inercia necesaria de una viga isostática (en cm4)
        this.calculoInercia = function () {
            var cargaLineal = (pesoPropio * 1 + sobreCarga * 1) * faja;
            return (5 * cargaLineal * luz * luz * luz * luz) * 100000000 / (384 * moduloAcero * luz / flechaLimite);
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
    var perfil = function (nombre, modulo, inercia) {
        //Propiedades
        var nombreSerie = nombre; //Relación de tamaños de los perfiles de la serie
        var moduloSerie = modulo; //Relación de los módulos resistentes correspondientes (en cm3)
        var inerciaSerie = inercia; //Relación de las inercias correspondientes (en cm4)
        //Métodos
        // Función que devuelve el perfil buscado
        this.encontrarPerfil = function (valor, listaSerie) {
            var encontrado = true;
            var resultado = "No existe ningún perfil que soporte esa carga";
            var i = 0;
            while (encontrado) {
                if (valor < listaSerie[i]) {
                    resultado = nombreSerie[i];
                    encontrado = false;
                } else if (i >= listaSerie.length) {
                    encontrado = false;
                }
                i++;
            }
            return resultado;
        };
        this.getModulo = function () {
            return moduloSerie;
        };
        //Función que devuelve la inercia
        this.getInercia = function () {
            return inerciaSerie;
        };
    };

    // Creamos un objeto de la clase perfil para perfiles de la serie IPE
    var IPE = new perfil(
 ["IPE80", "IPE100", "IPE120", "IPE140", "IPE160", "IPE180", "IPE200", "IPE220", "IPE240", "IPE270", "IPE300", "IPE330", "IPE360", "IPE400", "IPE450", "IPE500", "IPE550", "IPE600"], [20, 34.2, 53, 77.3, 109, 146, 194, 252, 324, 429, 557, 713, 904, 1160, 1500, 1930, 2440, 3070], [80.1, 171, 318, 541, 869, 1320, 1940, 2770, 3890, 5790, 8360, 11770, 16270, 23130, 33740, 48200, 67120, 92080]
    );

    // Creamos un objeto de la clase perfil para perfiles de la serie IPN
    var IPN = new perfil(
 ["IPN80", "IPN100", "IPN120", "IPN140", "IPN160", "IPN180", "IPN200", "IPN220", "IPN240", "IPN260", "IPN280", "IPN300", "IPN320", "IPN340", "IPN360", "IPN380", "IPN400", "IPN450", "IPN500", "IPN550", "IPN600"], [19.5, 34.2, 54.7, 81.9, 117, 161, 214, 278, 354, 442, 542, 653, 782, 923, 1090, 1260, 1460, 2040, 2750, 3610, 4630], [77.8, 171, 328, 573, 935, 1450, 2140, 3060, 4250, 5740, 7590, 9800, 12510, 15700, 19610, 24010, 29210, 45850, 68740, 99180, 139000]
    );

    // Creamos un objeto de la clase viga para la viga a calcular
    var vigaCalculo = new viga();

    // Definimos las variables que van a albergar el nombre del perfil último y de servicio;
    var perfilUltimo;
    var perfilServicio;

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
        perfilUltimo = IPE.encontrarPerfil(vigaCalculo.calculoModulo(), IPE.getModulo());
        perfilServicio = IPE.encontrarPerfil(vigaCalculo.calculoInercia(), IPE.getInercia());
        break;
    case "IPN":
        perfilUltimo = IPN.encontrarPerfil(vigaCalculo.calculoModulo(), IPN.getModulo());
        perfilServicio = IPN.encontrarPerfil(vigaCalculo.calculoInercia(), IPN.getInercia());
        break;
    }

    if (perfilUltimo === 'No existe ningún perfil que soporte esa carga' || perfilServicio === 'No existe ningún perfil que soporte esa carga') {
        resultado = 'No existe ningún perfil que soporte esa carga';
    } else if (error !== '') {
        resultado = error;
    } else {
        resultado = 'El perfil necesario a resistencia es un <b>' + perfilUltimo + '</b>. </br>El perfil necesario a servicio es un <b>' + perfilServicio + '</b>.';
    }
    return resultado;
}


//https://c9.io/lampantino/stepando/workspace/index.html?science&vigaacero