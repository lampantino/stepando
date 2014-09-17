/************************************************
 * STEPANDO (Screen)                            *
 * Author: Lampantino                           *
 * Start date: 22/12/2012						*
 * Version date: 17/07/2014                     *
 * Version:0.4.1                                *
 ************************************************/

//SCREEN CLASS
var Screen = function () {

    //variables
    var currentStep;

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
    var text_Share;
    var text_Iframe;
    var text_Answer;
    var text_Result;
    var alert_Text;
    var alert_Integer;
    var alert_Float;
    var alert_Email;
    var alert_Url;

    //methods
    //public method that prints the sequence's title and starts the aplication
    this.start = function () {
        currentStep = activeSequence.getStepByNum(0);
        stepCount = 0;
        var url = window.location.href;
        var urlPercent = encodeURIComponent(url);

        var language = activeSequence.getSeqData('language');
        translate(language);
        var activeFooter = new Footer(language);
        activeFooter.start();

        var title = activeSequence.getSeqData('title');
        var titlePercent = encodeURIComponent(title);
        var info = activeSequence.getSeqData('info');
        var author = activeSequence.getSeqData('author');
        var email = activeSequence.getSeqData('email');
        var version = activeSequence.getSeqData('version');
        var date = activeSequence.getSeqData('date');
        var btc = activeSequence.getSeqData('donate')[0];
        var flattr = activeSequence.getSeqData('donate')[1];
        var gittip = activeSequence.getSeqData('donate')[2];
        var paypal = activeSequence.getSeqData('donate')[3];
        
        var screenContent = '';
        screenContent += '<div class="step leftside boxShadow" style="display:block">';
        screenContent += '<div class=question >' + title + '</div>';
        
        screenContent += '<div class="buttons" style="display:inline-block;width:100%;"><a href="javascript:void(0);" onclick="activeScreen.showInfo(\'sequence\')" style="float:right"><div id="infoButton_sequence" class="button rounded centered boxShadow">' + button_Info + '</div></a>';
        screenContent += '<a href="javascript:void(0);" onclick="activeScreen.showInfo(\'share\')" style="float:right"><div id="infoButton_share" class="button rounded centered boxShadow">' + button_Share + '</div></a>';
        screenContent += '<a href="javascript:void(0);" onclick="activeScreen.showInfo(\'donate\')" style="float:right"><div id="infoButton_donate" class="button rounded centered boxShadow">' + button_Donate + '</div></a>';
        screenContent += '<a href="javascript:void(0);" onclick="activeScreen.showInfo(\'author\')" style="float:right"><div id="infoButton_author" class="button rounded centered boxShadow">' + button_Author + '</div></a></div>';
                
        //author info
        screenContent += '<div id="info_author" class="rounded boxShadow info" style="display:none;"><p>' + text_Author + ': <a href="mailto:' + email + '" target="_blank">' + author + '</a></p><p>' + text_Update + ': <b>' + date + '</b> (vers. ' + version + ')</p></div>';
        //donation info
        screenContent += '<div id="info_donate" class="rounded boxShadow info" style="display:none;">';
        screenContent += '<p>' + text_Donation + '</p>';
        //donation->paypal button
        screenContent += '<div class=buttons><a href="' + paypal + '" target="_blank" style="float:right;"><div id="infoButton_paypal" class="button rounded centered boxShadow">paypal</div></a>';
        //donation->gittip button
        screenContent += '<a href="https://www.gittip.com/' + gittip + '" target="_blank" style="float:right;"><div id="infoButton_gittip" class="button rounded centered boxShadow">gittip</div></a>';
        //donation->flattr button
        screenContent += '<a href="https://flattr.com/submit/auto?user_id=' + flattr + '&url=' + url + '&title=' + titlePercent + '" target="_blank"style="float:right;"><div id="infoButton_flattr" class="button rounded centered boxShadow">flattr</div></a>';
        //donation->bitcoin button
        screenContent += '<a href="javascript:void(0);" onclick="activeScreen.showInfo(\'bitcoin\')" style="float:right;"><div id="infoButton_bitcoin" class="button rounded centered boxShadow">bitcoin</div></a></div>';
        //donation->bitcoin info
        screenContent += '<div id="info_bitcoin" style="display:none;"><a href="bitcoin:' + btc + '" target="_blank">' + btc + '</a> (<a href="http://chart.apis.google.com/chart?chs=300x300&cht=qr&chl=' + btc + '&choe=UTF-8" target="_blank">qr code</a>)</div>';
        screenContent += '</div>';
        //share info
        screenContent += '<div id="info_share" class="rounded boxShadow info" style="display:none;">';
        screenContent += '<p>' + text_Share + '</p>';
        //share->email button
        screenContent += '<div class=buttons><a href="mailto:?subject=' + title + '&body=Stepando%20-%20' + titlePercent + ':%0D%0A' + urlPercent + '" style="float:right;"><div id="infoButton_email" class="button rounded centered boxShadow">email</div></a>';
        //share->iframe button
        screenContent += '<a href="javascript:void(0);" onclick="activeScreen.showInfo(\'iframe\')" style="float:right;"><div id="infoButton_iframe" class="button rounded centered boxShadow">iframe</div></a>';
        //share->googleplus button
        screenContent += '<a href="https://plus.google.com/share?url=' + url + '" target="_blank" style="float:right;"><div id="shareButton_gplus" class="button rounded centered boxShadow">google+</div></a>';
        //share->twitter button
        screenContent += '<a href="https://twitter.com/intent/tweet?original_referer=' + url + '&text=' + title + '&url=' + url + '&via=stepando.com" target="_blank" style="float:right;"><div id="shareButton_twitter" class="button rounded centered boxShadow">twitter</div></a>';
        //share->facebook button        
        screenContent += '<a href="https://www.facebook.com/sharer/sharer.php?u=' + url + '" target="_blank" style="float:right;"><div id="shareButton_facebook" class="button rounded centered boxShadow">facebook</div></a></div>';
        //share->iframe info
        screenContent += '<div id="info_iframe" class="rounded boxShadow info" style="display:none;position:relative;top:-10px;background:none;">';
        screenContent += '<span style="line-height: 2;">' + text_Iframe + '</span>';
        screenContent += '<textarea class="iframe" rows="2" style="width:100%;"><iframe src="' + url + '" style="border:none;width:200px;height:400px;overflow-x:hidden;"></iframe></textarea>';
        screenContent += '</div>';

        screenContent += '</div>';
        //sequence info
        screenContent += '<div id="info_sequence" class="rounded boxShadow info" style="display:none;">' + info + '</div>';

        screenContent += '</div>';
        screenContent += '<div id=steps></div>';
        document.getElementById('sequence').innerHTML = screenContent;
        //hides the empty donation buttons 
        if (btc === '') {
            document.getElementById('infoButton_bitcoin').style.display = 'none';
        }
        if (flattr === '') {
            document.getElementById('infoButton_flattr').style.display = 'none';
        }
        if (gittip === '') {
            document.getElementById('infoButton_gittip').style.display = 'none';
        }
        if (paypal === '') {
            document.getElementById('infoButton_paypal').style.display = 'none';
        }
        if (btc === '' && flattr === '' && gittip === '' && paypal === '') {
            document.getElementById('infoButton_donate').style.display = 'none';
        }
        document.querySelector('footer').style.display = 'none';
        addDivs();
        printStep();
    };

    //private method that translates the text to the sequence language
    var translate = function (language) {
        eval('button_Author = button_Author_JSON.' + language);
        eval('button_Donate = button_Donate_JSON.' + language);
        eval('button_Share = button_Share_JSON.' + language);
        eval('button_Info = button_Info_JSON.' + language);
        eval('button_Next = button_Next_JSON.' + language);
        eval('button_Update = button_Update_JSON.' + language);
        eval('button_Print = button_Print_JSON.' + language);
        eval('text_Author = text_Author_JSON.' + language);
        eval('text_Update = text_Update_JSON.' + language);
        eval('text_Donation = text_Donation_JSON.' + language);
        eval('text_Share = text_Share_JSON.' + language);
        eval('text_Iframe = text_Iframe_JSON.' + language);
        eval('text_Answer = text_Answer_JSON.' + language);
        eval('text_Result = text_Result_JSON.' + language);
        eval('text_Comments = text_Comments_JSON.' + language);
        eval('alert_Text = alert_Text_JSON.' + language);
        eval('alert_Integer = alert_Integer_JSON.' + language);
        eval('alert_Float = alert_Float_JSON.' + language);
        eval('alert_Email = alert_Email_JSON.' + language);
        eval('alert_Url = alert_Url_JSON.' + language);
    };

    //public method that shows the info message
    this.showInfo = function (ref) {
        if (document.getElementById('info_' + ref).style.display == 'none') {
            document.getElementById('infoButton_' + ref).style.backgroundColor = 'lightgray';
            document.getElementById('infoButton_' + ref).style.color = 'black';
            document.getElementById('infoButton_' + ref).style.borderColor = 'white';
            document.getElementById('info_' + ref).style.display = 'block';
        } else {
            document.getElementById('infoButton_' + ref).style.backgroundColor = 'white';
            document.getElementById('infoButton_' + ref).style.color = 'black';
            document.getElementById('infoButton_' + ref).style.borderColor = 'lightgray';
            document.getElementById('info_' + ref).style.display = 'none';
        }
    };

    //private method that adds the html divs for the steps
    var addDivs = function () {
        var screenContent = '';
        for (var i = 0; i < activeSequence.getSeqData('steps').length; i++) {
            screenContent += '<div class="step rightside boxShadow" id=step' + i + ' style="display:none;"></div>';
        }
        screenContent += '<div id=result class="step leftside " style="display:none"></div>';
        screenContent += '<div id=comments class="step leftside " style="display:none"></div>';
        document.getElementById('steps').innerHTML = screenContent;
    };

    //private method that prints the steps
    var printStep = function () {
        var ref = currentStep.getStepData('reference');
        var question = currentStep.getStepData('question');
        var type = currentStep.getStepData('type').toLowerCase();
        var option = currentStep.getStepData('option');
        var keyboard = '';
        var info = currentStep.getStepData('info');
        var stepNum = activeSequence.getStepNumByRef(ref);

        var screenContent = '';
        screenContent += '<div id="question_' + ref + '" class=question>' + question + '</div>';

        screenContent += '<div class="rounded boxShadow answer">';
        if (type === 'input') {
            switch (option.toLowerCase()) {
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
            screenContent += '<input type="' + keyboard + '" id=answer_' + ref + ' placeholder="' + text_Answer + '" onkeydown="activeScreen.captureEnterKey(event, \'' + ref + '\');">';
        } else if (type === 'select') {
            screenContent += '<select id=answer_' + ref + ' onkeydown="activeScreen.captureEnterKey(event, \'' + ref + '\');">';
            for (var i = 0; i < option.length; i++) {
                screenContent += '<option value="' + option[i] + '">' + option[i] + '</option>';
            }
            screenContent += '</select>';
        }
        screenContent += '</div>';

        screenContent += '<div style="display:inline-block;width:100%;"><a href="javascript:void(0);" id="nextStepButton_' + ref + '" onclick="activeScreen.getStepAnswer(\'' + ref + '\')" style="display:block;float:left;"><div class="button rounded centered boxShadow">' + button_Next + '</div></a><a href="javascript:void(0);" id="updateStepButton_' + ref + '" onclick="activeScreen.updateStepAnswer(\'' + ref + '\')" style="display:none;float:left;"><div class="button rounded centered boxShadow">' + button_Update + '</div></a>';
        screenContent += '<a href="javascript:void(0);" onclick="activeScreen.showInfo(\'' + ref + '\')" style="float:right"><div id="infoButton_' + ref + '" class="button rounded centered boxShadow">' + button_Info + '</div></a></div>';
        
        screenContent += '<div id="info_' + ref + '" class="rounded boxShadow info" style="display:none;">' + info + '</div>';
        screenContent += '<div id="alert_' + ref + '" class="rounded boxShadow alert" style="display:none;"></div>';
        
        
        screenContent += '<div id="confirm_'+ref+'" style="display:none">';
        screenContent += '<div class="rounded boxShadow alert" style="float:left">Si actualiza se borrarán los pasos posteriores, ¿desea continuar?</div>';
        screenContent += '<div class=buttons><a href="javascript:void(0);" onclick="activeScreen.confirmUpdate(\'' + ref + '\', true)" style="float:left"><div class="littleButton rounded centered boxShadow alert">Si</div></a>';
        screenContent += '<a href="javascript:void(0);" onclick="activeScreen.confirmUpdate(\'' + ref + '\', false)" style="float:left"><div class="littleButton rounded centered boxShadow alert">No</div></a></div>';
        screenContent += '</div>';
        
        screenContent += '</div>';
        document.getElementById('step' + stepNum).innerHTML = screenContent;
        document.getElementById('step' + stepNum).style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
        document.getElementById('answer_' + ref).focus();
    };

    //public method that captures the Enter keypress
    this.captureEnterKey = function (event, ref) { /*REVISAR CAPTURA Y FOCUS DEL INPUT*/
        if (event.keyCode == 13 || event.keyCode == 9) {
            if (document.getElementById('nextStepButton_' + ref).style.display == 'block') {
                this.getStepAnswer(ref);
                /*if(event.keyCode == 9) {
                    var nextStepRef = activeSequence.getStepByRef(currentStep.getStepData('next'));
                    document.getElementById('infoButton_' + ref).focus();
                }*/

            } else {
                this.updateStepAnswer(ref);
            }
        }
    };

    //private method that prints the sequence result
    var printResult = function () {
        var result = activeSequence.getSeqData('result');
        var resultInfo = activeSequence.getSeqData('resultInfo');
        var author = activeSequence.getSeqData('author');
        var email = activeSequence.getSeqData('email');
        var date = activeSequence.getSeqData('date');
        var version = activeSequence.getSeqData('version');
        var btc = activeSequence.getSeqData('btc');

        var screenContent = '';
        screenContent += '<div class=question>' + text_Result + ':</div>';
        screenContent += '<div class="rounded boxShadow result">' + result + '</div>';

        screenContent += '<div class=buttons><a href="javascript:void(0);" onclick="window.print()" style="float:left;"><div id="print" class="button rounded centered boxShadow">' + button_Print + '</div></a>';
        screenContent += '<a href="javascript:void(0);" onclick="activeScreen.showInfo(\'result\')" style="float:right;"><div id="infoButton_result" class="button rounded centered boxShadow">' + button_Info + '</div></a></div>';
        screenContent += '<div id="info_result" class="rounded boxShadow info" style="display:none;">' + resultInfo + '</div>';
        document.getElementById('result').innerHTML = screenContent;
        document.getElementById('result').style.display = 'block';
        printComments();
    };
    
    //private method that prints the sequence comments
    var printComments = function () {
        
        var screenContent = '';
        screenContent += '<div class=question>' + text_Comments + ':</div>';
        
        //starts Disqus code
        screenContent += '<div id="disqus_thread"></div>';
        var disqus_shortname = "stepando";
        var args = location.search.substr(1).split(':');
        var disqus_identifier = args[1];
        
        (function() {
            var dsq = document.createElement("script");
            dsq.type = "text/javascript";
            dsq.async = true;
            dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";
            (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);
            console.log('eoeo');
        })();
        screenContent += '<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>';
        screenContent += '<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>';
        //ends Disqus code
        
        document.getElementById('comments').innerHTML = screenContent;
        document.getElementById('comments').style.display = 'block';
        document.querySelector('footer').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    };

    //private function that check a entered pattern
    var checkPattern = function (answer, pattern) {
        if (answer.match(pattern) === null) {
            return false;
        } else {
            return true;
        }
    };

    //private function that returns an alert
    var checkAnswer = function (answer, type, option) {
        if (type === 'input') {
            if (option === 'string' && (!isNaN(answer) || answer == '')) {
                return alert_Text;
            } else if (option === 'integer' && (isNaN(answer) || +answer % 1 !== 0 || answer == '') && answer !== 0) {
                return alert_Integer;
            } else if (option === 'float' && (isNaN(answer) || answer == '') && answer !== 0) {
                return alert_Float;
            } else if (option === 'email' && (!checkPattern(answer, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/) || answer == '')) {
                return alert_Email;
            } else if (option === 'url' && (!checkPattern(answer, /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) || answer == '')) {
                return alert_Url;
            } else {
                return '';
            }
        } else if (type === 'select') {
            return '';
        }
    };

    //public method that gets the entered step answer
    this.getStepAnswer = function (ref) {
        var answer = document.getElementById('answer_' + ref).value;
        var type = currentStep.getStepData('type').toLowerCase();
        var option = currentStep.getStepData('option').toString().toLowerCase();
        if (option === 'integer' || option === 'float') {
            answer = parseFloat(answer);
        } //converts numbers entered as string to real numbers
        var stepAlert = checkAnswer(answer, type, option);
        if (stepAlert === '') {
            currentStep.setStepAnswer(answer);
            if (option === 'integer' || option === 'float') {
                answer = parseFloat(answer);
            } //converts numbers entered as string to real numbers
            document.getElementById('alert_' + ref).style.display = 'none';
            document.getElementById('nextStepButton_' + ref).style.display = 'none';
            document.getElementById('updateStepButton_' + ref).style.display = 'block';
            var nextStep = findNextStep(currentStep);
            if (nextStep === 'result') {
                activeSequence.addResult(sequenceResult());
                printResult();
            } else {
                currentStep = activeSequence.getStepByRef(nextStep);
                printStep();
            }
        } else {
            document.getElementById('alert_' + ref).innerHTML = stepAlert;
            document.getElementById('alert_' + ref).style.display = 'block';
        }
    };

    //public method that updates a entered step answer
    this.updateStepAnswer = function (ref) {
        var tempStep = activeSequence.getStepByRef(ref);
        var answer = document.getElementById('answer_' + ref).value;
        var type = tempStep.getStepData('type').toLowerCase();
        var option = tempStep.getStepData('option').toString().toLowerCase();
        var stepAlert = checkAnswer(answer, type, option);
        if (stepAlert === '') {
            if (option === 'integer' || option === 'float') {
                answer = parseFloat(answer);
            } //converts numbers entered as string to real numbers
            tempStep.setStepAnswer(answer);
            document.getElementById('alert_' + ref).style.display = 'none';
            
            var nextStep = findNextStep(tempStep);
            
            if(tempStep.getStepData('next') === '') {
                
                //document.getElementById('confirm_' + ref).style.display = 'block';
                
                
                
                var stepNum = activeSequence.getStepNumByRef(ref);
                var totalSteps = activeSequence.getSeqData('steps').length;
                
                for (var i = stepNum+1; i < totalSteps; i++) {
                    document.getElementById('step' + i).style.display = 'none';
                }
                document.querySelector('footer').style.display = 'none';
                document.getElementById('comments').style.display = 'none';
                if(nextStep === 'result') {
                    activeSequence.addResult(sequenceResult());
                    printResult();
                } else {
                    currentStep = activeSequence.getStepByRef(nextStep);
                    document.getElementById('result').style.display = 'none';
                    activeSequence.addResult(undefined);
                    printStep();
                }
            }
            
            if (nextStep === 'result' || typeof activeSequence.getSeqData('result') !== 'undefined') {
                activeSequence.addResult(sequenceResult());
                printResult();
            }

        } else {
            document.getElementById('alert_' + ref).innerHTML = stepAlert;
            document.getElementById('alert_' + ref).style.display = 'block';
        }
    };
    
    
    this.confirmUpdate = function(ref, answer) {
        if(answer == true) {
            document.getElementById('confirm_' + ref).style.display = 'none';
            return true;
        } else {
            document.getElementById('confirm_' + ref).style.display = 'none';
            return false;
        }
    }
    
    
    //private method that modifies the currentStep
    var findNextStep = function (step) {
        var nextStep = step.getStepData('next');
        if (nextStep === '') { //if there is no nextStep then execute the function
            var reference = step.getStepData('reference');
            eval('nextStep = ' + reference + '_nextStep()');
        }
        return nextStep;
    };
};

//variables
var activeScreen = new Screen();