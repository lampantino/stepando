/************************************************
 * STEPANDO (Menu)                              *
 * Author: Lampantino                           *
 * Start date: 22/12/2012						*
 * Version date: 17/07/2014                     *
 * Version:0.4.1                                *
 ************************************************/

//MENU CLASS
var Menu = function (currentLanguage) {
    //variables
    var totalLanguages = ['en', 'es', 'gl', 'eu', 'ct', 'de', 'pt', 'it', 'fr', 'ru', 'zh'];
    var language = (currentLanguage === '') ? 'en' : currentLanguage;
    var languages = [];

    //translation variables
    var text_Language;
    var text_Categories;
    var sequences_Categories = [];
    var sequences_Titles = [];
    var sequences_Adresses = [];

    //methods
    //public method that prints the menu
    this.start = function () {
        var activeFooter = new Footer(language);
        activeFooter.start();

        var screenContent = '';
        screenContent += '<div id=languages></div>';
        screenContent += '<div id=categories></div>';
        document.getElementById('menu').innerHTML = screenContent;
        translate(language);
        printLanguages();
        printCategories();
    };

    var printLanguages = function () {
        var screenContent = '';
        screenContent += '<div class="step leftside boxShadow">';
        screenContent += '<span class=question>' + text_Language + '</span>';
        screenContent += '<div class=buttons>';
        //Only load the languages with sequences
        var langSeq = '';
        for (var l = 0; l < totalLanguages.length; l++) {
            eval('langSeq = seq_' + totalLanguages[l] + '_JSON[0].category');
            if (langSeq !== '') {
                languages.push(totalLanguages[l]);
            }
        }
        //Load the first language with sequences
        var reload = true;
        for (var l = 0; l < languages.length; l++) {
            if (language === languages[l]) {
                reload = false;
            }
        }
        if (reload) {
            window.location.href = 'index.html?' + languages[0];
        }
        //print the buttons of the languages with sequences
        for (var i = languages.length - 1; i >= 0; i--) {
            screenContent += '<a href="index.html?' + languages[i] + '"style="float:right;"><div id="languageButton_' + languages[i] + '" class="button rounded centered boxShadow littleButton">' + languages[i] + '</div></a>';
        }
        screenContent += '</div></div>';
        document.getElementById('languages').innerHTML = screenContent;
        document.getElementById('languages').style.display = 'block';
        document.getElementById('languageButton_' + language).style.backgroundColor = 'lightgray';
        document.getElementById('languageButton_' + language).style.color = 'black';
        document.getElementById('languageButton_' + language).style.borderColor = 'white';
    };

    //private method that translates the text to the sequence language
    var translate = function (language) {
        eval('text_Language = text_Language_JSON.' + language);
        eval('text_Categories = text_Categories_JSON.' + language);
        eval('var seqNum = seq_' + language + '_JSON.length');
        for (var i = 0; i < seqNum; i++) {
            eval('sequences_Categories.push(seq_' + language + '_JSON[i].category)');
            eval('sequences_Titles.push(seq_' + language + '_JSON[i].title)');
            eval('sequences_Adresses.push(seq_' + language + '_JSON[i].adress)');
        }
    };

    var printCategories = function () {
        var screenContent = '';
        /*screenContent += '<div class="step rounded boxShadow leftBorderBlue">';
        if (sequences_Categories[0] === '') {
            screenContent += '<span class=question>Sorry. No sequences available</span>';
        } else {
            screenContent += '<span class=question>' + text_Categories + '</span>';
        }*/
        var category = '';
        for (var i = 0; i < sequences_Categories.length; i++) {
            if (sequences_Categories[i] != category) {
                screenContent += '<div class="step rightside boxShadow">';
                screenContent += '<div class=question style="text-align:right;">' + sequences_Categories[i] + '</div>';
                screenContent += '<div><ul class=sequences>';
                for (var j = 0; j < sequences_Titles.length; j++) {
                    if (sequences_Categories[i] == sequences_Categories[j]) {
                        screenContent += '<li><a href="index.html?' + sequences_Adresses[j] + '" class="gray">' + sequences_Titles[j] + '</a></li>';
                    }
                }
                screenContent += '</ul></div>';
                screenContent += '</div>';
                category = sequences_Categories[i];
            }
        }
        screenContent += '</div>';
        document.getElementById('categories').innerHTML = screenContent;
    };
};