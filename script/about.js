/************************************************
 * STEPANDO (About)                             *
 * Author: Lampantino                           *
 * Start date: 15/02/2014						*
 * Version date: 17/02/2014                     *
 * Version:0.3.0                                *
 ************************************************/

//ABOUT CLASS
var About = function (currentLanguage) {
    //variables
    var language = currentLanguage;
    
    //translation variables
    var text_titleAbout;
    var text_projectAbout;
    var text_projectDonation;
    var text_projectContact;    

    //methods
    //public method that prints the about information
    this.start = function () {
        var activeFooter = new Footer(language);
        activeFooter.start();
        
        translate(language);
        var screenContent = '';
        screenContent += '<div class="step leftside boxShadow">';
        screenContent += '<span class=question>'+text_titleAbout+'</span>';
        screenContent += '</div>';
        
        screenContent += '<div class="step rightside boxShadow">';
        screenContent += '<p>'+text_projectAbout+'</p>';
        screenContent += '</div>';
        
        screenContent += '<div class="step rightside boxShadow">';
        screenContent += '<p>'+text_projectDonation+'</p>';
        screenContent += '</div>';
        
        screenContent += '<div class="step rightside boxShadow">';
        screenContent += '<p>'+text_projectContact+'</p>';
        screenContent += '</div>';
        
        document.getElementById('about').innerHTML = screenContent;
    };

    //private method that translates the text to the sequence language
    var translate = function (language) {
        eval('text_titleAbout = text_titleAbout_JSON.' + language);
        eval('text_projectAbout = text_projectAbout_JSON.'+ language);
        eval('text_projectDonation = text_projectDonation_JSON.'+ language);
        eval('text_projectContact = text_projectContact_JSON.'+ language);
    };

    
};