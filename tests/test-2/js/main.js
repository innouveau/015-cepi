$(window).ready(function(){

    var container = document.getElementById('infographic');

    window.app = new App(container);
    app.init();
    setTimeout(function(){
        app.intro();
    }, 500);
    setTimeout(function(){
        //app.justAMove();
    }, 5000);

});
