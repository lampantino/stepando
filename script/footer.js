/************************************************
 * STEPANDO (Footer)                            *
 * Author: Lampantino                           *
 * Start date: 22/12/2012						*
 * Version date: 17/07/2014                     *
 * Version:0.4.1                                *
 ************************************************/

//FOOTER CLASS
var Footer = function (currentLanguage) {
    //variables
    var language = (currentLanguage === '') ? 'en' : currentLanguage;

    //translation variables
    var button_Contact;
    var button_About;
    var button_License;
    var url_license;

    //methods
    //public method that prints the footer
    this.start = function () {
        translate(language);

        var screenContent = '';
        screenContent += '<div id=buttons>';
        screenContent += '<span style="float:left;">© 2012-2014 stepando (beta 0.4.1)</span>';
        screenContent += '<td style="float:right; margin-left:15px;"><a href="index.html?'+language+':about" style="float:right; margin-left:15px;color:white;">' + button_About + '</a>';
        screenContent += '<a href="'+ url_license +'" target="_blank" style="float:right; margin-left:15px;color:white;">' + button_License + '</a>';
        screenContent += '</div>';
        document.querySelector('footer').innerHTML = screenContent;
    };

    //private method that translates the text to the sequence language
    var translate = function (language) {
        eval('button_Contact = button_Contact_JSON.' + language);
        eval('button_About = button_About_JSON.' + language);
        eval('button_License = button_License_JSON.' + language);
        
        var license = function(language) {
            var url = '';
            switch(language) {
                    case 'en':
                        url = 'http://www.gnu.org/licenses/gpl-3.0-standalone.html';
                        break;
                    case 'es':
                        url = 'http://hjmacho.github.io/translation_GPLv3_to_spanish/';
                        break;
                    case 'gl':
                        url = 'http://www.mancomun.org/GPL3_GL/gpl_gl_v3.html';
                        break;
                    case 'eu':
                        url = 'http://hjmacho.github.io/translation_GPLv3_to_spanish/';
                        break;
                    case 'ct':
                        url = 'http://hjmacho.github.io/translation_GPLv3_to_spanish/';
                        break;
                    case 'de':
                        url = 'http://www.gnu.de/documents/gpl-3.0.de.html';
                        break;
                    case 'pt':
                        url = 'http://www.gnu.org/licenses/gpl-3.0-standalone.html';
                        break;
                    case 'it':
                        url = 'http://katolaz.homeunix.net/gplv3/gplv3-it-final.html';
                        break;
                    case 'fr':
                        url = 'http://www.rodage.org/gpl-3.0.fr.txt';
                        break;
                    case 'ru':
                        url = 'http://rusgpl.ru/rusgpl.html';
                        break;
                    case 'zh':
                        url = 'http://www.chinasona.org/gnu/gnuv3-tc.html';
                        break;
            }
            return url;
        }
        url_license = license(language);
    };
};