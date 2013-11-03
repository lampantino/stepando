/************************************************
* STEPANDO (Menu)                               *
* Author: Sebastian Ríos Ernst                  *
* Start date: 22/12/2012						*
* Version date: 03/11/2013                      *
* Version:0.2.0                                 *
*************************************************/

//MENU CLASS
var Menu = function(currentLanguage) {
    //variables
    var language = (currentLanguage === '')? 'en': currentLanguage;
    
    //translation variables
    var text_Language;
    var text_Categories;
    var sequences_Categories = [];
    var sequences_Titles = [];
    var sequences_Adresses = [];
    
    //methods
    //public method that prints the menu
    this.start = function() {
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
    
    var printLanguages = function() {
        var screenContent = '';
        screenContent += '<div class="step rounded boxShadow">';
		screenContent += '<span class=question>'+ text_Language +'</span>';
		screenContent += '<table id=buttons><tr>';
		var languages = ['en','es','gl','eu','ct','de','pt','it','fr','ru','zh'];
		for(var i=languages.length-1; i>=0; i--) {
            screenContent += '<td style="float:right;"><a href="index.html?'+ languages[i] +'"><div id="languageButton_'+ languages[i] +'" class="button rounded centered boxShadow littleButton">'+ languages[i] +'</div></a></td>';
		}
        screenContent += '</tr></table>';
        screenContent += '</div>';
        document.getElementById('languages').innerHTML = screenContent;
        document.getElementById('languages').style.display = 'block';
        document.getElementById('languageButton_'+ language).style.backgroundColor = 'gray';
        document.getElementById('languageButton_'+ language).style.color = 'white';
        document.getElementById('languageButton_'+ language).style.borderColor = 'white';
    };
    
    //private method that translates the text to the sequence language
    var translate = function(language) {
        eval('text_Language = text_Language_JSON.'+language);
        eval('text_Categories = text_Categories_JSON.'+language);
        eval('var seqNum = seq_'+ language +'_JSON.length');
        for(var i=0; i<seqNum; i++) {
            eval('sequences_Categories.push(seq_'+ language +'_JSON[i].category)');
            eval('sequences_Titles.push(seq_'+ language +'_JSON[i].title)');
            eval('sequences_Adresses.push(seq_'+ language +'_JSON[i].adress)');
        }
    };
    
    var printCategories = function() {
        var screenContent = '';
        screenContent += '<div class="step rounded boxShadow">';
		screenContent += '<span class=question>'+ text_Categories +'</span>';
		var category = '';
		for(var i = 0; i < sequences_Categories.length; i++) {
            if(sequences_Categories[i] != category) {
                screenContent += '<div class="step rounded boxShadow">';
                screenContent += '<span class=question>'+ sequences_Categories[i] +'</span>';
                screenContent += '<ul>';
                for(var j = 0; j < sequences_Titles.length; j++) {
                    if(sequences_Categories[i] == sequences_Categories[j]) {
                        screenContent += '<li><a href="index.html?'+ sequences_Adresses[j] +'" class="gray">'+ sequences_Titles[j] +'</a></li>';
                    }
                }
                screenContent += '</ul>';
                screenContent += '</div>';
                category = sequences_Categories[i];
            }
		}
        screenContent += '<br></div><br>';
		document.getElementById('categories').innerHTML = screenContent;
    };
};