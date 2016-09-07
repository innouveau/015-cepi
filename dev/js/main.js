$(window).ready(function(){

    var container = document.getElementById('infographic');

    window.app = new App(container);
    app.init();

    $(window).scrollTop(0);
    addPhaseListeners();

});

function addPhaseListeners() {
    $(window).scroll(function(e){
        var top = $(document).scrollTop(),
            edge = 1400,
            acceleration = 5;
        if (top < 0) {
            // prevents safari negative values
            top = 0;
        }
        if (top > edge) {
            top = (top - edge) * acceleration + edge;
        }
        app.scroll(top);
    });

    document.addEventListener('keydown', function(e) {
        if (e.keyCode == '49') {
            $(document).scrollTop(0);
        } else if (e.keyCode == '50') {
            $(document).scrollTop(3000);
        }
    });
}

function openDisclaimer() {
    $('.overlay').show();
    $('.disclaimer').fadeIn(100);
}

function closeDisclaimer() {
    $('.overlay').hide();
    $('.disclaimer').fadeOut(100);
}
