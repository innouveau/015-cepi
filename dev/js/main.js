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
        app.scroll(top);
        scrollChapters(top);
    });

    document.addEventListener("keydown", function(e) {
        if (e.keyCode == '49') {
            $(document).scrollTop(0);
            app.showTop();
        } else if (e.keyCode == '50') {
            $(document).scrollTop(3000);
            app.showGraph();
        }
    });
}

function initChapters() {
    var offset = 400,
        margin = 10,
        intro = $('.intro'),
        top = parseInt(intro.css('top')) + intro.outerHeight(),
        thisTop = top,
        destination = top + margin;

    $('.chapter').each(function(index) {
        thisTop += offset;
        $(this).attr('top', thisTop).attr({
            destination: destination,
            i: index + 1
        }).css('top', thisTop);
        destination += $(this).outerHeight() + margin;
    
    });
    $('.scroll-trigger').fadeIn(500);
}

function scrollChapters(pixels) {
    var chapterInZone = false,
        currentPhase = 0,
        currentInZone = null,
        direction = 0,
        fadeZone = 100;
    if (pixels > 5) {
        $('.scroll-trigger').fadeOut(500);
    }
    $('.chapter').each(function(){
        var thisTop = parseInt($(this).attr('top')) - pixels,
            destination = parseInt($(this).attr('destination')),
            difference = thisTop - destination,
            index = parseInt($(this).attr('i'));

        // reached endzone
        // make chapter sticky
        if (thisTop <= destination) {
            thisTop = destination;
            // hightest entered destination
            currentPhase = index;
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

function openDisclaimer() {
    $('.disclaimer').fadeIn(100);
}

function closeDisclaimer() {
    $('.disclaimer').fadeOut(100);
}