//CreateSequence method creates a new sequence
createSequence(
    '', //Sequence language (en, es, gl, eu, ct, de, pt, it, fr, ru, zh)
    '', //Sequence title
    '', //Sequence info
    '', //Sequence author
    '', //Sequence author email
    '', //Sequence last version
    '', //Sequence last review date
 ['', '', '', ''], //Sequence donation adresses (BTC adress, flattr username, gittip username, paypal link)
    '' //Sequence result information
);

//AddStep methods creates new steps and adds them to the sequence
addStep(
    '', //Step reference
    '', //Step question
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
    /*
    
    LOGIC
    
    */
    return result;
}