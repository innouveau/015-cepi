$(window).ready(function(){

    var container = document.getElementById('infographic');

    window.app = new App(container);
    app.init();

    $(window).scrollTop(0);

    initChapters();
    addPhaseListeners();

});


function addPhaseListeners() {
    $(window).scroll(function(e){
        var top = $(document).scrollTop(),
            frame = Math.round(top / 3);
        app.draw(frame);
        scrollChapters(top);
        moveScene(top);
    })
}

function initChapters() {
    var height = 0.3 * $(window).outerHeight();
    $('.chapter').each(function(index){
        var thisTop = height + (index + 1) * 400,
            destination = 0;
        $(this).prevAll().each(function(){
            destination += $(this).outerHeight() + 20;
        });
        $(this).attr('top', thisTop).attr('destination', destination).css('top', thisTop);
    
    })
}

function scrollChapters(pixels) {
    $('.chapter').each(function(index){
        var thisTop = parseInt($(this).attr('top')) - pixels,
            destination = parseInt($(this).attr('destination')),
            difference = thisTop - destination,
            fadeZone = 100;
        // make chapter sticky
        if (thisTop < destination) {
            thisTop = destination;
        }
        $(this).css('top', thisTop);
        // fade in chapter
        if (difference < fadeZone) {
            $(this).css('opacity', (1 - difference / fadeZone));
        } else {
            $(this).css('opacity', 0);
        }
    })
}

function moveScene(pixels) {
    if (pixels > 500 && pixels < 1200) {
        $('#infographic').css('top', (125 - pixels / 4));
    }
    if (pixels < 500) {
        $('#infographic').css('top', 0);
    }
}
