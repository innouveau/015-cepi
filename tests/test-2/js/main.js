$(window).ready(function(){

    window.app = new App();
    app.init($('.papier-container')[0]);
    app.draw();
    setTimeout(function(){
        app.intro();
    }, 1000);

});
