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
    this.createStage();
    this.artboard = this.getArtboard();
    this.paths = this.getPaths();
    this.graph = this.getGraph();
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

Canvas.prototype.getArtboard = function() {
    return this.stage.element.append('g').attr({
        class: 'artboard',
        transform: 'translate(20,20)'
    });
};

Canvas.prototype.getPaths = function() {
    return this.artboard.append('g').attr({
        class: 'paths',
        transform: 'translate(50,0)'
    });
};

Canvas.prototype.getGraph = function() {
    var graph = this.artboard.append('g').attr({
        class: 'graph',
        transform: 'translate(0,' + this.app.settings.graph.top + ')'
    });
    graph.append('rect').attr({
        stroke: '#000',
        fill: 'none',
        width: this.app.settings.graph.width,
        height: this.app.settings.graph.height
    });
    return graph;
};