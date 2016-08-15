function Canvas(app) {
    this.app = app;
    this.name = name;
    this.element = this.create();
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
        start = this.app.settings.path.startFrame,
        end = this.app.settings.path.endFrame;
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
        start = this.app.settings.graph.startFrame,
        end = this.app.settings.graph.endFrame;
    if (frame < start) {
        y = this.app.settings.graph.startTop;
    } else if (frame < end) {
        y = this.app.settings.graph.startTop + ((frame - start) / (end - start))  * (this.app.settings.graph.endTop - this.app.settings.graph.startTop);
    } else {
        y = this.app.settings.graph.endTop
    }
    // fading of valorisations
    if ( frame > (end - 100)) {
        $('.valorisation').fadeIn(this.app.settings.valorisation.fade);
    } else {
        $('.valorisation').fadeOut(this.app.settings.valorisation.fade);
    }
    this.graph.attr({
        transform: 'translate(' + this.app.settings.graph.left + ',' + y + ')'
    })
};

Canvas.prototype.create = function() {
    return d3.select(this.app.container).append('svg').attr({
        width: '100%',
        height: '100%'
    });
};

Canvas.prototype.getArtboard = function() {
    return this.element.append('g').attr({
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
    var settings = this.app.settings,
        header,
        graph;

    graph = this.artboard.append('g').attr({
        class: 'graph',
        transform: 'translate(' + settings.graph.left + ',' + settings.graph.startTop + ')'
    });
    this.createHeader(graph, settings);
    this.createBody(graph, settings);
    this.createAxis(this.graphBody, settings, 'x', 'Reducing costs / little extra profit', 'Making serious money');
    this.createAxis(this.graphBody, settings, 'y', 'Proven Technology', 'Technology for pioneers');
    return graph;
};

Canvas.prototype.createHeader = function(graph, settings) {
    var header = graph.append('g').attr({
        class: 'graph-header'
    });
    header.append('line').attr({
        class: 'graph-top-bar',
        x1: 0,
        y1: 0,
        x2: settings.graph.width,
        y2: 0
    });
    header.append('text').attr({
        class: 'graph-header-text',
        x: 10,
        y: 40
    }).text('Side stream valorization opportunities');
    header.append('text').attr({
        class: 'graph-header-sub',
        x: 10,
        y: 62
    }).text('Choose the side stream(s) you would like to valorisate:');
};

Canvas.prototype.createBody = function(graph, settings) {
    this.graphBody = graph.append('g').attr({
        class: 'graph-body',
        transform: 'translate(30,' + settings.graph.marginTop + ')'
    });
};

Canvas.prototype.createAxis = function(graph, settings, direction, label1, label2) {
    var axis = graph.append('g').attr('class', 'graph-axis graph-axis-' + direction),
        positions = [],
        arrow1,
        arrow2,
        xOffset = [],
        yOffset = [];
    if (direction === 'y') {
        positions = [-settings.graph.margin, settings.graph.margin, -settings.graph.margin, settings.graph.height - settings.graph.margin];
        arrow1 = 'M' + (positions[0] - 5) + ',' + (positions[1] + 7) + 'L' + (positions[0]) + ',' + positions[1] + 'L' + (positions[0] + 5) + ',' + (positions[1] + 7);
        arrow2 = 'M' + (positions[2] - 5) + ',' + (positions[3] - 7) + 'L' + (positions[2]) + ',' + positions[3] + 'L' + (positions[2] + 5) + ',' + (positions[3] - 7);
        xOffset = [20, 20];
        yOffset = [10, -10];
    } else {
        positions = [settings.graph.margin, settings.graph.height + settings.graph.margin, settings.graph.width - settings.graph.margin, settings.graph.height + settings.graph.margin];
        arrow1 = 'M' + (positions[0] + 7) + ',' + (positions[1] -5) + 'L' + (positions[0]) + ',' + positions[1] + 'L' + (positions[0] + 7) + ',' + (positions[1] + 5);
        arrow2 = 'M' + (positions[2] - 7) + ',' + (positions[3] -5) + 'L' + (positions[2]) + ',' + positions[3] + 'L' + (positions[2] - 7) + ',' + (positions[3] + 5);
        xOffset = [0, -120];
        yOffset = [30, 30];
    }
    axis.append('line').attr({
        'class':'graph-axis-line',
        'x1': positions[0],
        'y1': positions[1],
        'x2': positions[2],
        'y2': positions[3]
    });
    axis.append('path').attr({
        d: arrow1,
        class: 'arrowhead',
        fill: 'none'
    });
    axis.append('path').attr({
        d: arrow2,
        class: 'arrowhead',
        fill: 'none'
    });
    axis.append('text').attr({
        class: 'graph-label',
        x: positions[0] + xOffset[0],
        y: positions[1] + yOffset[0]
    }).text(label1);
    axis.append('text').attr({
        class: 'graph-label',
        x: positions[2] + xOffset[1],
        y: positions[3] + yOffset[1]
    }).text(label2)
};
