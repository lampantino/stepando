/************************************************
 * STEPANDO (Sequence)                          *
 * Author: Lampantino                           *
 * Start date: 22/12/2012						*
 * Version date: 17/07/2014                     *
 * Version:0.4.1                                *
 ************************************************/

//SEQUENCE CLASS
var Sequence = function (language, title, info, author, email, version, date, donate, resultInfo) {

    //variables
    var seqLang = language; //Sequence language
    var seqTitle = title; //Sequence title
    var seqInfo = info; //Sequence info
    var seqAuthor = author; //Sequence author
    var seqEmail = email; //Sequence author email
    var seqVersion = version; //Sequence last version
    var seqDate = date; //Sequence last review date
    var seqDonate = donate; //Sequence donation methods
    var steps = []; //Sequence steps array
    var seqResult; //Sequence result
    var seqResultInfo = resultInfo; //Sequence result information

    //methods
    //public method addStep adds a step instance to de steps array
    this.addStep = function (stepRef, stepQuestion, stepType, stepOption, nextStep, stepInfo) {
        steps.push(new Step(stepRef, stepQuestion, stepType, stepOption, nextStep, stepInfo));
    };

    //public method getStep returns the step from a given step reference
    this.getStepByRef = function (ref) {
        for (var i = 0; i < steps.length; i++) {
            if (steps[i].getStepData('reference') === ref) {
                return steps[i];
            }
        }
    };

    //public method getFirstStep returns the first step from the steps array
    this.getStepByNum = function (number) {
        return steps[number];
    };
    
    //public method getStepNumByRef returns the step position in the steps array
    this.getStepNumByRef = function (ref) {
        for(var i=0; i<steps.length; i++) {
            if(steps[i].getStepData('reference') === ref) {
                return i
            }
        }
    };
    
    //public method addResult defines the sequence result from given data
    this.addResult = function (result) {
        seqResult = result;
    };

    //public method getSeqData returns the sequence asked data
    this.getSeqData = function (seqData) {
        seqData = seqData.toLowerCase();
        var answer;
        switch (seqData) {
        case 'language':
            answer = seqLang;
            break;
        case 'title':
            answer = seqTitle;
            break;
        case 'info':
            answer = seqInfo;
            break;
        case 'author':
            answer = seqAuthor;
            break;
        case 'email':
            answer = seqEmail;
            break;
        case 'version':
            answer = seqVersion;
            break;
        case 'date':
            answer = seqDate;
            break;
        case 'donate':
            answer = seqDonate;
            break;
        case 'steps':
            answer = steps;
            break;
        case 'result':
            answer = seqResult;
            break;
        case 'resultinfo':
            answer = seqResultInfo;
            break;
        }
        return answer;
    };
};

var activeSequence;

//createSequence method allows the sequence creation
var createSequence = function (seqLang, seqTitle, seqInfo, seqAuthor, seqEmail, seqVersion, seqDate, seqDonate, seqResultInfo) {
    activeSequence = new Sequence(seqLang, seqTitle, seqInfo, seqAuthor, seqEmail, seqVersion, seqDate, seqDonate, seqResultInfo);
};
//createSequence method allows the sequence creation
var createSequence = function (seqLang, seqTitle, seqInfo, seqAuthor, seqEmail, seqVersion, seqDate, seqDonate, seqResultInfo) {
    activeSequence = new Sequence(seqLang, seqTitle, seqInfo, seqAuthor, seqEmail, seqVersion, seqDate, seqDonate, seqResultInfo);
};