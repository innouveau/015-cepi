$(window).ready(function(){

    var container = document.getElementById('infographic'),
        storyline = document.getElementById('storyline');

    window.app = new App(container);
    window.director = new Director(storyline);
    director.init();
    //app.init();
    
});
