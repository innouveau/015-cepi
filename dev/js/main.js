$(window).ready(function(){

    initHamburger();
    var container = document.getElementById('infographic');

    window.app = new App(container);
    app.init();

    $(window).scrollTop(0);
    addPhaseListeners();

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
        if (window.app.settings.device === 0) {
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
