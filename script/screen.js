/************************************************
* STEPANDO (Screen)								*
* Author: Sebastian Ríos Ernst                  *
* Start date: 22/12/2012                        *
* Version date: 19/09/2013						*
* Version:0.1.1									*
*************************************************/

//SCREEN CLASS
var Screen = function() {
    
    //variables
    var currentStep;
    var stepCount;
    
    //translation variables
    var button_Author;
    var button_Share;
    var button_Donate;
    var button_Info;
    var button_Next;
    var button_Update;
    var button_Print;
    var text_Author;
    var text_Update;
    var text_Donation;
    var text_Answer;
    var text_Result;
    var alert_Empty;
    var alert_Text;
    var alert_Integer;
    var alert_Float;
    var alert_Email;
    var alert_Url;
    
	//methods
	//public method that prints the sequence's title and starts the aplication
	this.start = function() {
        currentStep = activeSequence.getStepByNum(0);
        stepCount = 0;
        
        var language = activeSequence.getSeqData('language');
        translate(language);
        var activeFooter = new Footer(language);
        activeFooter.start();
        
        var title = activeSequence.getSeqData('title');
        var info = activeSequence.getSeqData('info');
        var author = activeSequence.getSeqData('author');
        var email = activeSequence.getSeqData('email');
        var version = activeSequence.getSeqData('version');
        var date = activeSequence.getSeqData('date');
        var btc = activeSequence.getSeqData('donate')[0];
        
		var screenContent = '';
		screenContent += '<div class="step rounded boxShadow">';
		screenContent += '<span class=question>'+ title +'</span>';
		screenContent += '<table id=buttons><tr>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick="activeScreen.showInfo(\'sequence\')"><div id="infoButton_sequence" class="button rounded centered boxShadow">'+ button_Info +'</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick="activeScreen.showInfo(\'share\')"><div id="infoButton_share" class="button rounded centered boxShadow">'+ button_Share +'</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick="activeScreen.showInfo(\'donate\')"><div id="infoButton_donate" class="button rounded centered boxShadow">'+ button_Donate +'</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick="activeScreen.showInfo(\'author\')"><div id="infoButton_author" class="button rounded centered boxShadow">'+ button_Author +'</div></a></td>';
        screenContent += '</tr></table>';
        
        //author info
        screenContent += '<div id="info_author" class="rounded boxShadow result" style="display:none;"><span>'+ text_Author +': <a href="mailto:'+ email +'" target="_blank">'+ author +'</a></span><span><br>'+ text_Update +': <b>'+ date +'</b> (vers. '+ version +')</span></div>';
        //donation info
        screenContent += '<div id="info_donate" class="rounded boxShadow result" style="display:none;">';
        screenContent += '<span>'+ text_Donation +'</span>';
        screenContent += '<table id=buttons><tr>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);"><div id="infoButton_gittip" class="button rounded centered boxShadow">gittip</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);"><div id="infoButton_flattr"  class="button rounded centered boxShadow">flattr</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick="activeScreen.showInfo(\'bitcoin\')"><div id="infoButton_bitcoin" class="button rounded centered boxShadow">bitcoin</div></a></td>';
        screenContent += '</tr></table>';
        screenContent += '<div id="info_bitcoin" style="display:none;"><a href="bitcoin:'+ btc +'" target="_blank">'+ btc +'</a> (<a href="http://chart.apis.google.com/chart?chs=300x300&cht=qr&chl='+ btc +'&choe=UTF-8" target="_blank">qr code</a>)</div>';
        screenContent += '</div>';
        //share info
        screenContent += '<div id="info_share" class="rounded boxShadow result" style="display:none;">';
        screenContent += '<table id=buttons><tr>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick=""><div id="shareButton_iframe" class="button rounded centered boxShadow">iframe</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick=""><div id="shareButton_gplus" class="button rounded centered boxShadow">google+</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick=""><div id="shareButton_twitter" class="button rounded centered boxShadow">twitter</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick=""><div id="shareButton_facebook" class="button rounded centered boxShadow">facebook</div></a></td>';
        screenContent += '</tr></table>';
        screenContent += '</div>';
        //sequence info
        screenContent += '<div id="info_sequence" class="rounded boxShadow result" style="display:none;">'+ info +'</div>';
        
        screenContent += '</div>';
        screenContent += '<div id=steps></div>';
		document.getElementById('sequence').innerHTML = screenContent;
		document.querySelector('footer').style.display = 'none';
		addDivs();
        printStep();
	};

    //private method that translates the text to the sequence language
    var translate = function(language) {
        eval('button_Author = button_Author_JSON.'+language);
        eval('button_Donate = button_Donate_JSON.'+language);
        eval('button_Share = button_Share_JSON.'+language);
        eval('button_Info = button_Info_JSON.'+language);
        eval('button_Next = button_Next_JSON.'+language);
        eval('button_Update = button_Update_JSON.'+language);
        eval('button_Print = button_Print_JSON.'+language);
        eval('text_Author = text_Author_JSON.'+language);
        eval('text_Update = text_Update_JSON.'+language);
        eval('text_Donation = text_Donation_JSON.'+language);
        eval('text_Answer = text_Answer_JSON.'+language);
        eval('text_Result = text_Result_JSON.'+language);
        eval('alert_Empty = alert_Empty_JSON.'+language);
        eval('alert_Text = alert_Text_JSON.'+language);
        eval('alert_Integer = alert_Integer_JSON.'+language);
        eval('alert_Float = alert_Float_JSON.'+language);
        eval('alert_Email = alert_Email_JSON.'+language);
        eval('alert_Url = alert_Url_JSON.'+language);
    };
    
	//public method that shows the info message
	this.showInfo = function(ref) {
        if(document.getElementById('info_'+ref).style.display == 'none') {
            document.getElementById('infoButton_'+ref).style.backgroundColor = 'gray';
            document.getElementById('infoButton_'+ref).style.color = 'white';
            document.getElementById('infoButton_'+ref).style.borderColor = 'white';
            document.getElementById('info_'+ref).style.display = 'block';
        } else {
            document.getElementById('infoButton_'+ref).style.backgroundColor = 'white';
            document.getElementById('infoButton_'+ref).style.color = 'gray';
            document.getElementById('infoButton_'+ref).style.borderColor = 'gray';
            document.getElementById('info_'+ref).style.display = 'none';
        }
	};
	
	//private method that adds the html divs for the steps
	var addDivs = function() {
        var screenContent = '';
        for(var i=0; i<activeSequence.getSeqData('steps').length; i++) {
            screenContent += '<div class="step rounded boxShadow" id=step' + i + ' style="display:none;"></div>';
        }
        screenContent += '<div id=result class="step rounded boxShadow" style="display:none"></div>';
        document.getElementById('steps').innerHTML = screenContent;
	};
	
	//private method that prints the steps
	var printStep = function() {
        var ref = currentStep.getStepData('reference');
        var question = currentStep.getStepData('question');
        var type = currentStep.getStepData('type').toLowerCase();
        var option = currentStep.getStepData('option');
        var keyboard = '';
        var info = currentStep.getStepData('info');
        
        var screenContent = '';
		screenContent += '<span class=question>'+ question +'</span>';
		
		screenContent += '<div class="rounded boxShadow answer">';
		if(type === 'input') {
            switch(option.toLowerCase()) {
                case 'integer':
                case 'float':
                    keyboard = 'number';
                    break;
                case 'string':
                    keyboard = 'text';
                    break;
                case 'email':
                    keyboard = 'email';
                    break;
                case 'url':
                    keyboard = 'url';
                    break;
            }
            screenContent += '<input type="'+ keyboard +'" id=answer_'+ ref +' placeholder="'+ text_Answer +'" onkeydown="activeScreen.captureEnterKey(event, \''+ ref +'\');">';
		} else if(type === 'select') {
            screenContent += '<select id=answer_'+ ref +' onkeydown="activeScreen.captureEnterKey(event, \''+ ref +'\');">';
            for(var i=0; i<option.length; i++) {
                screenContent += '<option value="'+ option[i] +'">'+ option[i] +'</option>';
            }
            screenContent += '</select>';
		}
		screenContent += '</div>';
		
		screenContent += '<table id=buttons><tr>';
        screenContent += '<td style="float:left;"><a href="javascript:void(0);" id="nextStepButton_'+ ref +'" onclick="activeScreen.getStepAnswer(\''+ ref +'\')" style="display:block;"><div class="button rounded centered boxShadow">'+ button_Next +'</div></a><a href="javascript:void(0);" id="updateStepButton_'+ ref +'" onclick="activeScreen.updateStepAnswer(\''+ ref +'\')" style="display:none;"><div class="button rounded centered boxShadow">'+ button_Update +'</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick="activeScreen.showInfo(\''+ ref +'\')"><div id="infoButton_'+ ref +'" class="button rounded centered boxShadow">'+ button_Info +'</div></a></td>';
        screenContent += '</tr></table>';
        screenContent += '<div id="info_'+ ref +'" class="rounded boxShadow result" style="display:none;">'+ info +'</div>';
        screenContent += '<div id="alert_'+ ref +'" class="rounded boxShadow alert" style="display:none;"></div>';
		document.getElementById('step' + stepCount).innerHTML = screenContent;
		document.getElementById('step' + stepCount).style.display = 'block';
		window.scrollTo(0, document.body.scrollHeight);
		document.getElementById('answer_'+ ref).focus();
	};
	
	//public method that captures the Enter keypress
	this.captureEnterKey = function(event, ref) {   /*REVISAR CAPTURA Y FOCUS DEL INPUT*/
        if(event.keyCode == 13 || event.keyCode == 9) {
            if(document.getElementById('nextStepButton_'+ ref).style.display == 'block') {
                this.getStepAnswer(ref);
            } else {
                this.updateStepAnswer(ref);
            }
        }
	};
	
	//private method that prints the sequence result
	var printResult = function() {
        var result = activeSequence.getSeqData('result');
        var resultInfo = activeSequence.getSeqData('resultInfo');
        var author = activeSequence.getSeqData('author');
        var email = activeSequence.getSeqData('email');
        var date = activeSequence.getSeqData('date');
        var version = activeSequence.getSeqData('version');
        var btc = activeSequence.getSeqData('btc');
        
        var screenContent = '';
        screenContent += '<span class=question>'+ text_Result +':</span>';
        screenContent += '<div class="rounded boxShadow result">'+ result +'</div>';
        
        screenContent += '<table id=buttons><tr>';
        screenContent += '<td style="float:left;"><a href="javascript:void(0);" onclick="window.print()"><div id="print" class="button rounded centered boxShadow">'+ button_Print +'</div></a></td>';
        screenContent += '<td style="float:right;"><a href="javascript:void(0);" onclick="activeScreen.showInfo(\'result\')"><div id="infoButton_result" class="button rounded centered boxShadow">'+ button_Info +'</div></a></td>';
        screenContent += '</tr></table>';
        screenContent += '<div id="info_result" class="rounded boxShadow result" style="display:none;">'+ resultInfo +'</div>';
        document.getElementById('result').innerHTML = screenContent;
        document.getElementById('result').style.display = 'block';
        document.querySelector('footer').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
	};
	
	//private function that check a entered pattern
	var checkPattern = function(answer, pattern) {
        if(answer.match(pattern) === null) {
            return false;
        } else {
            return true;
        }
	};
	
	//private function that returns an alert
    var checkAnswer = function(answer, type, option) {
        if(answer === '') {
            return alert_Empty;
        }
        if(type === 'input') {
            if(option === 'string' && !isNaN(answer)) {
                return alert_Text;
            } else if(option === 'integer' && (isNaN(answer) || +answer%1 !== 0)) {
                return alert_Integer;
            } else if(option === 'float' && isNaN(answer)) {
                return alert_Float;
            } else if(option === 'email' && !checkPattern(answer,/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/)) {
                return alert_Email;
            } else if(option === 'url' && !checkPattern(answer,/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)) {
                return alert_Url;
            } else {
                return '';
            }
        } else if(type === 'select') {
            return '';
        }
	};
	
	//public method that gets the entered step answer
	this.getStepAnswer = function(ref) {
        var answer = document.getElementById('answer_'+ref).value;
        if(!isNaN(answer)) {
            answer = parseFloat(answer);
        }   //converts numbers entered has string to real numbers
        var type = currentStep.getStepData('type').toLowerCase();
        var option = currentStep.getStepData('option').toString().toLowerCase();
        var stepAlert = checkAnswer(answer, type, option);
        if(stepAlert === '') {
            currentStep.setStepAnswer(answer);
            document.getElementById("alert_" + ref).style.display = 'none';
            document.getElementById("nextStepButton_" + ref).style.display = 'none';
            document.getElementById("updateStepButton_" + ref).style.display = 'block';
            findNextStep();
        } else {
            document.getElementById('alert_' + ref).innerHTML = stepAlert;
            document.getElementById("alert_" + ref).style.display = 'block';
        }
	};
	
	//public method that updates a entered step answer
	this.updateStepAnswer = function(ref) {
        var tempStep = activeSequence.getStepByRef(ref);
        var answer = document.getElementById('answer_'+ref).value;
        var type = tempStep.getStepData('type').toLowerCase();
        var option = tempStep.getStepData('option').toString().toLowerCase();
        var stepAlert = checkAnswer(answer, type, option);
        if(stepAlert === '') {
            tempStep.setStepAnswer(answer);
            document.getElementById("alert_" + ref).style.display = 'none';
        } else {
            document.getElementById('alert_' + ref).innerHTML = stepAlert;
            document.getElementById("alert_" + ref).style.display = 'block';
        }
        if(typeof activeSequence.getSeqData('result') !== 'undefined') {
            activeSequence.addResult(sequenceResult());
            printResult();
        }
	};
	
	//private method that modifies the currentStep and the stepCount variables
	var findNextStep = function() {
        if(currentStep.getStepData('next') == 'result') {
            activeSequence.addResult(sequenceResult());
            printResult();
        } else {
            currentStep = activeSequence.getStepByRef(currentStep.getStepData('next'));
            stepCount++;
            printStep();
        }
	};
};

//variables
var activeScreen = new Screen();