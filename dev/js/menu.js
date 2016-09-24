getScreenWidth();

$(window).ready(function(){
    initHamburger();
});

$(window).resize(function(){
    getScreenWidth();
});

function getScreenWidth() {
    var width = $(window).outerWidth(),
        height = $(window).outerHeight();
    if (width < 700) {
        window.device = 0; // smartphone
    } else if (width < 768) {
        window.device = 1; // tablet portrait
    } else if (width < 1024) {
        window.device = 2; // table landscape
    } else {
        window.device = 3; // desktop
    }
}


function initHamburger() {
    var hamburgerOpen = false;

    $('#hamburger').click(function() {
        if (hamburgerOpen) {
            hamburgerHide();
        } else {
            hamburgerShow();
        }

    });

    $('body').click(function(event) {
        if (window.device === 0) {
            if (isHamburger(event.target)) {
                hamburgerHide();
            }
        }
    });

    function hamburgerHide() {
        $('.menu').hide();
        $('body').removeClass('hamburger-open');
        hamburgerOpen = false;
    }

    function hamburgerShow() {
        $('.menu').show();
        $('body').addClass('hamburger-open');
        hamburgerOpen = true;

    }

    function isHamburger(element) {
        if ($(element).attr('id') === 'hamburger' || $(element).parents('#hamburger').length > 0) {
            return false;
        } else {
            return true;
        }
    }
}
