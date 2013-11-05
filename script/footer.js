/************************************************
 * STEPANDO (Footer)                            *
 * Author: Sebastian Ríos Ernst                 *
 * Start date: 22/12/2012						*
 * Version date: 03/11/2013                     *
 * Version:0.2.0                                *
 ************************************************/

//FOOTER CLASS
var Footer = function (currentLanguage) {
    //variables
    var language = (currentLanguage === '') ? 'en' : currentLanguage;

    //translation variables
    var button_Contact;
    var button_About;
    var button_License;

    //methods
    //public method that prints the footer
    this.start = function () {
        translate(language);

        var screenContent = '';
        screenContent += '<table id=buttons class=centered>';
        screenContent += '<tr>';
        screenContent += '<td style="float:left;">© 2013 stepando</td>';
        screenContent += '<td style="float:right; margin-left:10px;"><a href="contact.html" target="_blank">' + button_Contact + '</a></td>';
        screenContent += '<td style="float:right; margin-left:10px;"><a href="about.html" target="_blank">' + button_About + '</a></td>';
        screenContent += '<td style="float:right; margin-left:10px;"><a href="license.html" target="_blank">' + button_License + '</a></td>';
        screenContent += '</tr>';
        screenContent += '</table>';
        document.querySelector('footer').innerHTML = screenContent;
    };

    //private method that translates the text to the sequence language
    var translate = function (language) {
        eval('button_Contact = button_Contact_JSON.' + language);
        eval('button_About = button_About_JSON.' + language);
        eval('button_License = button_License_JSON.' + language);
    };
};