function Canvas(app) {
    this.app = app;
    this.element = null;
    this.artboard = null;
    this.create();
}

Canvas.prototype.create = function() {
    var x = $(window).outerWidth() / 2 - 95;
    $(this.app.container).empty();
    this.element = d3.select(this.app.container).append('svg').attr({
        width: '100%',
        height: '100%'
    });
    this.artboard = this.element.append('g').attr({
        class: 'artboard',
        transform: 'translate(' + x + ', 10)'
    });
};