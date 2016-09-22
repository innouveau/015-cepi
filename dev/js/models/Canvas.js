function Canvas(app) {
    this.app = app;
    this.element = null;
    this.timedElements = [];

    // these elements are used by other models to inject stuff
    this.layers = {
        top: {
            paths: null,
            cover: null,
            static: null,
            raw: null
        },
        bottom: {
            graphHeader: null,
            valorisations: null,
            axis: null
        },
        labels: {
            container: null
        }
    };
    this.bars = [];
    this.labels = {
        sidestreams: []
    };

    // these elements are all the elements that are responsive
    this.elements = {
        artboard: null,
        topFrame: null,
        rawLabel: null,
        profitLabel: null,
        sidestreamLabel: null,
        productionLabel: null,
        bottomFrame: null,
        graphHeaderText: null,
        filterSidestreams: null,
        graphBody: null,
        sidestreamLabels: null
    };
    this.create();
    this.drawn = true;
}

Canvas.prototype.createTimedElement = function(element, settings) {
    var timedElement = new Timer(this.app, element, settings);
    this.timedElements.push(timedElement);
};

Canvas.prototype.redraw = function() {
    this.setPositions();
    this.createAxes();
};

Canvas.prototype.setPositions = function() {
    // redraw axis
    for (var propertyName in this.elements) {
        var coordinates = this.app.settings.sizes[propertyName];
        this.elements[propertyName].attr({
            transform: 'translate(' + coordinates[0] + ', ' + coordinates[1] + ')'
        });
    }
};


Canvas.prototype.scroll = function(frame) {
    for (var i = 0, l = this.timedElements.length; i < l; i++) {
        this.timedElements[i].scroll(frame);
    }
    this.hideElements(frame);
};

Canvas.prototype.hideElements = function(frame) {
    // profit label
    if (frame > 620) {
        $(this.elements.profitLabel[0]).fadeIn(this.app.settings.animation.labelFade);
        $('.roll').fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.elements.profitLabel[0]).fadeOut(this.app.settings.animation.labelFade);
        $('.roll').fadeOut(this.app.settings.animation.labelFade);
    }

    // sidestream label
    if (frame > 1000) {
        $(this.elements.sidestreamLabel[0]).fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.elements.sidestreamLabel[0]).fadeOut(this.app.settings.animation.labelFade);
    }
    if (frame > 200) {
        $(this.elements.productionLabel[0]).fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.elements.productionLabel[0]).fadeOut(this.app.settings.animation.labelFade);
    }

    // sidestream bars
    for (var j = 0, jl = this.bars.length; j < jl; j++) {
        var sidestreamBar = this.app.settings.timing.sidestreamBars[j];
        if (frame > sidestreamBar) {
            $(this.bars[j][0]).show();
        } else {
            $(this.bars[j][0]).hide();
        }
    }

    if (frame > 50) {
        $('body').addClass('active');
    } else {
        $('body').removeClass('active');
    }
};



// creation stuff

Canvas.prototype.create = function() {
    $(this.app.container).empty();
    this.element = d3.select(this.app.container).append('svg').attr({
        width: '100%',
        height: '100%'
    });
    this.createArtboard()
};

Canvas.prototype.createArtboard = function() {
    this.elements.artboard = this.element.append('g').attr({
        class: 'artboard'
    });
    this.createTopFrame();
    this.createBottomFrame();
};

Canvas.prototype.createTopFrame = function() {
    var labelsContainer;
    this.elements.topFrame = this.elements.artboard.append('g').attr({
        class: 'top-frame'
    });
    this.createTimedElement(this.elements.topFrame, this.app.settings.timing.topFrame);
    this.createPathsContainers();
    labelsContainer = this.elements.topFrame.append('g').attr('class', 'labels-container');
    this.addLabels(labelsContainer);
    this.addBars(labelsContainer);
    this.adddProductionLabel(labelsContainer);
};

Canvas.prototype.createPathsContainers = function() {
    var pathsContainer = this.elements.topFrame.append('g').attr('class', 'paths-container');
    this.layers.top.paths = pathsContainer.append('g').attr({
        class: 'paths-container'
    });
    this.layers.top.cover = pathsContainer.append('g').attr({
        class: 'cover-paths-container'
    });
    this.layers.top.static = pathsContainer.append('g').attr({
        class: 'static-paths-container'
    });
    this.layers.top.raw = pathsContainer.append('g').attr({
        class: 'raw-container'
    });
};

Canvas.prototype.addLabels = function(labelsContainer) {
    this.elements.rawLabel = this._getLabel(labelsContainer, ['Raw Material:', 'Paper for Recycling'], 150, 'right');
    this.elements.profitLabel = this._getLabel(labelsContainer, ['Paper product', '(profit)'], 120, 'top');
    this.elements.sidestreamLabel = this._getLabel(labelsContainer, ['Side streams', '(costs)'], 110, 'right');
    $(this.elements.profitLabel[0]).hide();
    $(this.elements.sidestreamLabel[0]).hide();
};

Canvas.prototype.addBars = function(labelsContainer) {
    for (var i = 0; i < 6; i++) {
        var container = labelsContainer.append('g').attr({
            class: 'sidestream-bar',
            transform: 'translate(' + (i * 100) + ',' + 420 + ')'
        });
        container.append('line').attr({
            x1: 0,
            y1: 0,
            x2: 20,
            y2: 0
        });
        this.bars.push(container);
        $(container[0]).hide();
    }
};

Canvas.prototype.adddProductionLabel = function(labelsContainer) {
    var container = labelsContainer.append('g').attr({
        class: 'lightlabel'
    });
    container.append('text').attr({
        x: 0,
        y: 0
    }).text('Paper production process: schematic representation');
    this.elements.productionLabel = container;
    $(container[0]).hide();
};






// graph / bottom

Canvas.prototype.createBottomFrame = function() {
    this.elements.bottomFrame = this.elements.artboard.append('g').attr({
        class: 'bottom-frame'
    });
    this.createTimedElement(this.elements.bottomFrame, this.app.settings.timing.bottomFrame);
    this.createGraphHeader();
    this.createGraphBody();
};

Canvas.prototype.createGraphBody = function() {
    this.elements.graphBody = this.elements.bottomFrame.append('g').attr({
        class: 'graph-body'
    });
    this.layers.bottom.axis = this.elements.graphBody.append('g').attr('class', 'axis-container');
    this.layers.bottom.valorisations = this.elements.graphBody.append('g').attr('class', 'valorisation-container');
    this.createAxes();
};

Canvas.prototype.createAxes = function() {
    this.layers.bottom.axis.selectAll("*").remove();
    this._createAxis(this.layers.bottom.axis, this.app.settings, 'x', ['Reducing costs'], ['Generating additional income']);
    this._createAxis(this.layers.bottom.axis, this.app.settings, 'y', ['Proven', 'Technology'], ['Technology', 'for pioneers']);
};

Canvas.prototype.createGraphHeader = function() {
    this.layers.bottom.graphHeader = this.elements.bottomFrame.append('g').attr({
        class: 'graph-header'
    });
    this.layers.bottom.graphHeader.append('line').attr({
        class: 'graph-top-bar',
        x1: 0,
        y1: 0,
        x2: 630,
        y2: 0
    });
    this.elements.graphHeaderText = this.layers.bottom.graphHeader.append('g').attr({
        class: 'graph-header-texts'
    });
    this.elements.graphHeaderText.append('text').attr({
        class: 'graph-header-text',
        x: 0,
        y: 0
    }).text('Side stream valorisation opportunities');
    this.elements.graphHeaderText.append('text').attr({
        class: 'graph-header-sub',
        x: 0,
        y: 32
    }).text('The graph shows the potential of 14 side stream valorisation technologies, indicatively ordered by their ');
    this.elements.graphHeaderText.append('text').attr({
        class: 'graph-header-sub',
        x: 0,
        y: 48
    }).text('economic potential and by their technology readiness level. Click on the circles to explore the opportunities.');
};



Canvas.prototype.createSidestreamContent = function() {
    this.createLegend();
    this.createSidestreamLabels();
    this.createFilterSidestreams();
};


Canvas.prototype.createLegend = function() {
    var self = this;
    for (var i = 0, l = this.app.sets.length; i < l; i++) {
        var set = this.app.sets[i];
        for (var j = 0, jl = set.children.length; j < jl; j++) {
            var valorisation = set.children[j];
            (function (valorisation) {
                valorisation.button.legend = new LegendButton(self.app, valorisation);
            })(valorisation);
        }
    }
};

Canvas.prototype.createSidestreamLabels = function() {
    this.elements.sidestreamLabels = this.elements.artboard.append('g').attr({
        class: 'sidestream-labels'
    });
    this.createTimedElement(this.elements.sidestreamLabels, this.app.settings.timing.sidestreamLabels);
    for (var i = 0, l = this.app.sidestreams.length; i < l; i++) {
        var sidestream = this.app.sidestreams[i],
            lines = sidestream.name.split(' '),
            sideStreamLabel = this.elements.sidestreamLabels.append('g').attr({
                class: 'label-container',
                transform: 'translate(' + i * 100 + ',0)'
            });
        for (var j = 0, jl = lines.length; j < jl; j++) {
            sideStreamLabel.append('text').attr({
                class: 'sidestream-label',
                transform: 'translate(0,' + j * 15 + ')'
            }).text(lines[j]);
        }
        this.labels.sidestreams.push(sideStreamLabel);
    }
};

Canvas.prototype.createFilterSidestreams = function() {
    var label, labelText;
    this.elements.filterSidestreams = this.layers.bottom.graphHeader.append('g').attr({
        class: 'filter filter-sidestreams'
    });
    label = this.elements.filterSidestreams.append('g').attr({
        transform: 'translate(' + 630 + ', 10)'
    });
    labelText = ['Filter by', 'side stream'];
    for (var j = 0; j < 2; j++) {
        label.append('text').attr({
            x: 0,
            y: j * 12
        }).text(labelText[j])
    }
    for (var i = 0, l = this.app.sidestreams.length; i < l; i++) {
        var sidestream = this.app.sidestreams[i],
            checkboxContainer = this._getCheckboxContainer(this.elements.filterSidestreams, i * 100, 0, sidestream.color, '');
        sidestream.elements.display = this._getCheckboxDisplay(checkboxContainer);
        (function(sidestream) {
            checkboxContainer.on('click', function () {
                sidestream.toggle();
            })
        })(sidestream);
    }
};

Canvas.prototype._createAxis = function(graph, settings, direction, label1, label2) {
    var axis = graph.append('g').attr('class', 'graph-axis graph-axis-' + direction),
        positions = [],
        arrow1,
        arrow2,
        xOffset = [],
        yOffset = [];
    if (direction === 'y') {
        positions = [0, 0, 0, settings.graph.height - settings.graph.margin];
        arrow1 = 'M' + (positions[0] - 5) + ',' + (positions[1] + 7) + 'L' + (positions[0]) + ',' + positions[1] + 'L' + (positions[0] + 5) + ',' + (positions[1] + 7);
        arrow2 = 'M' + (positions[2] - 5) + ',' + (positions[3] - 7) + 'L' + (positions[2]) + ',' + positions[3] + 'L' + (positions[2] + 5) + ',' + (positions[3] - 7);
        xOffset = [20, 20];
        yOffset = [6, -14];
    } else {
        positions = [settings.graph.margin, settings.graph.height + settings.graph.margin, settings.graph.width, settings.graph.height + settings.graph.margin];
        arrow1 = 'M' + (positions[0] + 7) + ',' + (positions[1] -5) + 'L' + (positions[0]) + ',' + positions[1] + 'L' + (positions[0] + 7) + ',' + (positions[1] + 5);
        arrow2 = 'M' + (positions[2] - 7) + ',' + (positions[3] -5) + 'L' + (positions[2]) + ',' + positions[3] + 'L' + (positions[2] - 7) + ',' + (positions[3] + 5);
        xOffset = [0, -175];
        yOffset = [30, 30];
    }
    axis.append('line').attr({
        class:'graph-axis-line',
        x1: positions[0],
        y1: positions[1],
        x2: positions[2],
        y2: positions[3]
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
    for (var i = 0, l = label1.length; i < l; i++) {
        axis.append('text').attr({
            class: 'graph-label',
            x: positions[0] + xOffset[0],
            y: positions[1] + yOffset[0] + i * this.app.settings.typography.lineHeight
        }).text(label1[i]);
    }
    for (var j = 0, jl = label2.length; j < jl; j++) {
        axis.append('text').attr({
            class: 'graph-label',
            x: positions[2] + xOffset[1],
            y: positions[3] + yOffset[1] + j * this.app.settings.typography.lineHeight
        }).text(label2[j])
    }

};


// helpers

Canvas.prototype._getLabel = function(parent, texts, width, position) {
    var height = texts.length * 14 + 12,
        distance = 100,
        x1, y1, x2, y2, cx, cy, rx, ry, tx, ty;
    g = parent.append('g').attr({
        class: 'label'
    });
    switch (position) {
        case 'top':
            x1 = 0; y1 = height; x2 = 0; y2 = distance + height; cx = 0; cy = distance + height; rx = -0.5 * width; ry = 0; tx = -0.5 * width + 15; ty = 0;
            break;
        case 'bottom':
            x1 = 0; y1 = 0; x2 = 0; y2 = distance; cx = 0; cy = 0; rx = -0.5 * width; ry = distance; tx = -0.5 * width + 15; ty = distance;
            break;
        case 'right':
            x1 = 0; y1 = 20; x2 = distance; y2 = 20; cx = 0; cy = 20; rx = distance; ry = 0; tx = distance + 15; ty = 0;
            break;
    }
    g.append('circle').attr({
        cx: cx,
        cy: cy,
        r: 5,
        fill: '#000'
    });
    g.append('line').attr({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        stroke: '#000'
    });
    g.append('rect').attr({
        x: rx,
        y: ry,
        width: width,
        height: height,
        fill: '#000'
    });
    for (var i = 0, l = texts.length; i < l; i++) {
        g.append('text').attr({
            x: tx,
            y: ty + 16 + i * 15,
            class: 'label'
        }).text(texts[i]);
    }
    return g;
};

Canvas.prototype._getCheckboxContainer = function(parent, x, y, color, name) {
    var checkboxContainer = parent.append('g').attr({
        class: 'checkbox-container',
        transform: 'translate(' + x + ',' + y + ')'
    });
    checkboxContainer.append('rect').attr({
        class: 'checkbox',
        stroke: color,
        width: 16,
        height: 16
    });
    if (name) {
        checkboxContainer.append('text').attr({
            class: 'checkbox-label',
            x: 24,
            y: 14
        }).text(name);
    }
    return checkboxContainer;
};

Canvas.prototype._getCheckboxDisplay = function(container) {
    var display = container.append('g');
    display.append('line').attr({
        class: 'checkbox-check',
        x1: 4,
        y1: 4,
        x2: 12,
        y2: 12
    });
    display.append('line').attr({
        class: 'checkbox-check',
        x1: 12,
        y1: 4,
        x2: 4,
        y2: 12
    });
    return display;
};

