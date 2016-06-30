$(window).ready(function(){

    window.app = new App();
    app.init($('.papier-container')[0]);
    app.set(12000, 10, 3, 0.8);
    app.draw();
    app.intro();
});
