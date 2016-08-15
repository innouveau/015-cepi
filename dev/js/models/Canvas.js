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
    this.scrollPaths(frame);
    this.scrollGraph(frame);
};

Canvas.prototype.scrollPaths = function(frame) {
    var y,
        start = 300,
        end = 900;
    if (frame < start) {
        y = this.app.settings.path.startTop;
    } else if (frame < end) {
        y = this.app.settings.path.startTop + ((frame - start) / (end - start))  * (this.app.settings.path.endTop - this.app.settings.path.startTop);
    } else {
        y = this.app.settings.path.endTop
    }
    this.paths.attr({
        transform: 'translate(' + this.app.settings.path.left + ',' + y + ')'
    })
};

Canvas.prototype.scrollGraph = function(frame) {
    var y,
        start = 800,
        end = 1200;
    if (frame < start) {
        y = this.app.settings.graph.startTop;
    } else if (frame < end) {
        y = this.app.settings.graph.startTop + ((frame - start) / (end - start))  * (this.app.settings.graph.endTop - this.app.settings.graph.startTop);
        console.log(y);
    } else {
        y = this.app.settings.graph.endTop
    }
    this.graph.attr({
        transform: 'translate(0,' + y + ')'
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
        transform: 'translate(' + this.app.settings.path.left + ',' + this.app.settings.path.startTop  + ')'
    });
};

Canvas.prototype.getGraph = function() {
    var graph = this.artboard.append('g').attr({
        class: 'graph',
        transform: 'translate(0,' + this.app.settings.graph.startTop + ')'
    });
    graph.append('rect').attr({
        stroke: '#000',
        fill: 'none',
        width: this.app.settings.graph.width,
        height: this.app.settings.graph.height
    });
    return graph;
};