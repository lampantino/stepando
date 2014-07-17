/************************************************
 * STEPANDO (About)                             *
 * Author: Lampantino                           *
 * Start date: 15/02/2014						*
 * Version date: 17/07/2014                     *
 * Version:0.4.1                                *
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
        
        screenContent += '<div class="step leftside boxShadow">';
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