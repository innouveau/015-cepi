$(window).ready(function(){

    var container = document.getElementById('infographic');

    window.app = new App(container);
    app.init();
    setTimeout(function(){
        app.intro();
    }, 500);

    addPhaseListeners();

});


function addPhaseListeners() {
    document.onkeydown = checkKey;
}

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        app.phase.prev();
    } else if (e.keyCode == '39') {
        app.phase.next();
    }

}