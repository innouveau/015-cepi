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
        var top = $(document).scrollTop();
        gotoFrame(top);
    });

    document.addEventListener("keydown", function(e) {
        if (e.keyCode == '49') {
            $(document).scrollTop(0);
            gotoFrame(0);
        } else if (e.keyCode == '50') {
            $(document).scrollTop(3000);
            gotoFrame(3000);
        }
    });



    function gotoFrame(frame) {
        app.scroll(frame);
        scrollChapters(frame);
    }

}

function initChapters() {
    var intro = $('.intro'),
        pause = 0,
        height = parseInt(intro.css('top')) + intro.outerHeight() + pause;
    $('.chapter').each(function(index){
        var thisTop = height + (index + 1) * 400,
            destination = 40;
        $(this).prevAll().each(function(){
            destination += $(this).outerHeight() + 10;
        });
        $(this).attr('top', thisTop).attr({
            destination: destination,
            i: index + 1,
            active: '0'
        }).css('top', thisTop);
    
    })
}

function scrollChapters(pixels) {
    var chapterInZone = false,
        currentPhase = 0,
        currentInZone = null,
        direction = 0,
        fadeZone = 100;
    $('.chapter').each(function(){
        var thisTop = parseInt($(this).attr('top')) - pixels,
            destination = parseInt($(this).attr('destination')),
            difference = thisTop - destination,
            index = parseInt($(this).attr('i'));

        // reached endzone
        // make chapter sticky
        if (thisTop <= destination) {
            $(this).addClass('destination');
            thisTop = destination;
            // hightest entered destination
            currentPhase = index;
        } else {
            $(this).removeClass('destination');
        }

        // fade in chapter
        if (difference < fadeZone) {
            $(this).css('opacity', (1 - difference / fadeZone));
            if (difference > -fadeZone) {
                currentInZone = index;
                chapterInZone = true;
                direction = difference;
            }
        } else {
            $(this).css('opacity', 0);
        }



        $(this).css('top', thisTop);

    });
    app.setPhase(currentPhase);
    if (currentInZone !== app.phase.index) {
        app.setDirection(direction);
    } else {
        app.setDirection(0);
    }

}
