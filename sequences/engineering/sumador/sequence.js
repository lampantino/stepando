//createSequence method creates a new sequence
createSequence (
    'es',                                               //Sequence language
	'Suma 4 números',                                   //Sequence title
	'Calcula el resultado de sumar 4 números',          //Sequence info
	'Sebastian Ríos Ernst',								//Sequence author
	'sre.quereck@gmail.com',                            //Sequence author email
	'0.1',												//Sequence last version
	'11/09/2013',										//Sequence last review date
	'1NYcpukkrV6UywyJkggWkv7FwhDhijtM1C',               //Sequence BTC address for donation
	'Estos resultados son orientativos y únicamente útiles para un predimensionado' //Sequence result information
);

//addStep methods creates new steps and adds them to the sequence
addStep (
	'numero1',											//Step reference
	'¿Cuál es el primer número?',						//Step question
	'Select',											//Step type
	['1','2','4'],										//Step option
	'numero2',                                          //Next step
    'Ha de introducir un número'                        //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep (
	'numero2',											//Step reference
	'¿Cuál es el segundo número?',                      //Step question
	'Input',											//Step type
	'Float',											//Step option
	'numero3',                                          //Next step
	'Ha de introducir un número'                        //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep (
	'numero3',											//Step reference
	'¿Cuál es el tercer número?',						//Step question
	'Input',											//Step type
	'Float',											//Step option
	'numero4',                                          //Next step
    'Ha de introducir un número'                        //Step info
);

//addStep methods creates new steps and adds them to the sequence
addStep (
	'numero4',											//Step reference
	'¿Cuál es el cuarto número?',						//Step question
	'Input',											//Step type
	'Float',											//Step option
	'result',                                           //Next step
    'Ha de introducir un número'                        //Step info
);

//sequenceResult function contains the sequence logic and returns the result
function sequenceResult() {
    var numero1 = getAnswer('numero1');
	var numero2 = getAnswer('numero2');
	var numero3 = getAnswer('numero3');
	var numero4 = getAnswer('numero4');
	return numero1 + numero2 + numero3 + numero4;
}

//https://c9.io/lampantino/stepando/workspace/index.html?science&sumador



