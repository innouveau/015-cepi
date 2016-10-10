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
    if (window.device === 0) {
        $('.disclaimer').removeClass('hidden')
    } else {
        $('.disclaimer').fadeIn(100);
    }

}

function closeDisclaimer() {
    $('.overlay').hide();
    if (window.device === 0) {
        $('.disclaimer').addClass('hidden')
    } else {
        $('.disclaimer').fadeOut(100);
    }
}

// window.time = null;
// window.testMe = function() {
//     console.log("Starting test\n------------------------------------");
//     window.time = new Date();
//     $('html').animate({
//         scrollTop: 200
//     }, 400, function(){
//         $('html').animate({
//             scrollTop: 600
//         }, 100, function(){
//             $('html').animate({
//                 scrollTop: 1200
//             }, 1000, function(){
//                 $('html').animate({
//                     scrollTop: 0
//                 }, 100)
//             })
//         });
//     });
// };