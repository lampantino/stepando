/************************************************
 * STEPANDO (Main)                              *
 * Author: Lampantino                           *
 * Start date: 22/12/2012						*
 * Version date: 03/11/2013                     *
 * Version:0.2.0                                *
 ************************************************/

//MAIN

//loader method loads the menu or a called sequence
var loader = function () {
    var args = location.search.substr(1).split('&');
    if (args[1] === undefined) {
        var activeMenu = new Menu(args[0]);
        window.onload = function () {
            document.getElementById('sequence').style.display = 'none';
            activeMenu.start();
        };

    } else {
        var seqSrc = "sequences/" + args[0] + "/" + args[1] + "/sequence.js";
        var seqFile = document.createElement('script');
        seqFile.src = seqSrc;
        document.getElementsByTagName('head')[0].appendChild(seqFile);
        window.onload = function () {
            document.getElementById('menu').style.display = 'none';
            activeScreen.start();
        };
    }
};

loader();