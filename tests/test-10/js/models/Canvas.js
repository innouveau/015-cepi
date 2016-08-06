function Canvas(app) {
    this.app = app;
    this.name = name;
    this.element = this.create();
    this.stage = {
        position: {
            x: 0,
            y: 0
        },
        element: null
    };
    this.artboard = {
        position: {
            x: 20,
            y: 20
        },
        element: null
    };
    this.createStage();
    this.createArtboard();
}

Canvas.prototype.scroll = function(frame) {
    this.stage.position.y = -0.25 * frame;
    this.stage.element.attr({
        transform: 'translate(' + this.stage.position.x + ',' + this.stage.position.y + ')'
    })
};
Canvas.prototype.clear = function() {

};

Canvas.prototype.create = function() {
    return d3.select(this.app.container).append('svg').attr({
        width: '100%',
        height: '100%'
    });
};

Canvas.prototype.createStage = function() {
    this.stage.element = this.element.append('g').attr({
        class: 'stage',
        transform: 'translate(' + this.stage.position.x + ',' + this.stage.position.y + ')'
    });
};

Canvas.prototype.createArtboard = function() {
    this.artboard.element = this.stage.element.append('g').attr({
        class: 'artboard',
        transform: 'translate(' + this.artboard.position.x + ',' + this.artboard.position.y + ')'
    });
};
