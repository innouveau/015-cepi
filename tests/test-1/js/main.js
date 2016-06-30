$(window).ready(function(){

    window.snippet = new Snippet();
    snippet.init($('.snippet-container')[0]);
    redraw();

});

function redraw() {
    var n = $('#input-n').val(),
        size = $('#input-size').val(),
        corners = $('#input-corners').val(),
        greyness = $('#input-greyness').val();
    snippet.redraw(n, size, corners, greyness);
}

