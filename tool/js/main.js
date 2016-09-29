$(window).ready(function(){
    var container = document.getElementById('infographic');
    addPhaseListeners();
    window.app = new App(container);

});


function addPhaseListeners() {
    $(window).scroll(function(e){
        var top = $(document).scrollTop();
        if (top < 0) {
            // prevents safari negative values
            top = 0;
        }
        app.scroll(top);
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
