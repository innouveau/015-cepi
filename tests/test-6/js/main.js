$(window).ready(function(){

    var container = document.getElementById('infographic');

    window.app = new App(container);
    app.init();


    addPhaseListeners();

});


function addPhaseListeners() {
    $(window).scroll(function(e){
        var top = $(document).scrollTop(),
            frame = Math.round(top / 3);
        app.draw(frame)
    })
}

