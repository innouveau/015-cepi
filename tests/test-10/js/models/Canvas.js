function Canvas(app) {
    this.app = app;
    this.name = name;
    this.element = this.create();
}

Canvas.prototype.clear = function() {

};

Canvas.prototype.create = function() {
    return d3.select(this.app.container).append('svg').attr({
        width: '100%',
        height: '100%'
    });
};


