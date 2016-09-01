function Canvas(app) {
    this.app = app;
    this.name = name;
    this.element = this.create();
    this.artboard = this.getArtboard();
    this.layers = {
        top: {
            container: null,
            paths: null,
            cover: null,
            static: null,
            raw: null
        },
        bottom: {
            container: null,
            header: null,
            body: null,
            valorisations: null
        },
        labels: {
            container: null
        }
    };
    this.labels = {
        raw: null,
        profit: null,
        sidestream: null,
        sidestreams: [],
        production: null
    };
    this.bars = [];
    this.drawn = false;
    this.draw();
}

Canvas.prototype.draw = function() {
    this.createTopframe();
    this.createPathsLayer();
    this.createCoverLayer();
    this.createStaticLayer();
    this.createRawLayer();
    this.addLabels();
    this.addBars();
    this.addLightlabels();
    this.createBottomFrame();
    this.drawn = true;
};


// creation stuff

Canvas.prototype.create = function() {
    $(this.app.container).empty();
    return d3.select(this.app.container).append('svg').attr({
        width: '100%',
        height: '100%'
    });
};

Canvas.prototype.getArtboard = function() {
    return this.element.append('g').attr({
        class: 'artboard',
        transform: 'translate(' + this.app.settings.sizes.artboard.left + ', ' + this.app.settings.sizes.artboard.top + ')'
    });
};

Canvas.prototype.createTopframe = function() {
    this.layers.top.container = this.artboard.append('g').attr({
        class: 'top-frame',
        transform: 'translate(' + this.app.settings.sizes.layers.top.left + ',' + this.app.settings.sizes.layers.top.positions[0]  + ')'
    });
};

Canvas.prototype.createPathsLayer = function () {
    this.layers.top.paths = this.layers.top.container.append('g').attr({
        class: 'paths-container'
    });
};

Canvas.prototype.createCoverLayer = function () {
    this.layers.top.cover = this.layers.top.container.append('g').attr({
        class: 'cover-paths-container'
    });
};


Canvas.prototype.createStaticLayer = function () {
    this.layers.top.static = this.layers.top.container.append('g').attr({
        class: 'static-paths-container'
    });
};

Canvas.prototype.createRawLayer = function () {
    this.layers.top.raw = this.layers.top.container.append('g').attr({
        class: 'raw-container'
    });
};

Canvas.prototype.addLabels = function() {
    this.labels.raw = this._getLabel(this.layers.top.container, ['Raw Material:', 'Paper for Recycling'], 150, 'right', this.app.settings.sizes.labels.raw.left, this.app.settings.sizes.labels.raw.top);
    this.labels.profit = this._getLabel(this.layers.top.container, ['Paper product', '(profit)'], 120, 'top', this.app.settings.sizes.labels.profit.left, this.app.settings.sizes.labels.profit.top);
    this.labels.sidestream = this._getLabel(this.layers.top.container, ['Sidestreams', '(costs)'], 110, 'right', this.app.settings.sizes.labels.sidestream.left, this.app.settings.sizes.labels.sidestream.top);
    $(this.labels.profit[0]).hide();
    $(this.labels.sidestream[0]).hide();
};

Canvas.prototype.addBars = function() {
    for (var i = 0; i < 6; i++) {
        var container = this.layers.top.container.append('g').attr({
            class: 'sidestream-bar',
            transform: 'translate(' + (this.app.settings.sizes.layers.top.bar.left + (i * this.app.settings.sizes.filterSidestreams.setWidth)) + ',' + this.app.settings.sizes.layers.top.bar.top + ')'
        });
        container.append('line').attr({
            x1: 0,
            y1: 0,
            x2: this.app.settings.sizes.layers.top.bar.width,
            y2: 0
        });
        this.bars.push(container);
        $(container[0]).hide();
    }
};

Canvas.prototype.addLightlabels = function() {
        var container = this.layers.top.container.append('g').attr({
            class: 'lightlabel',
            transform: 'translate(260,268)'
        });
        container.append('text').attr({
            x: 0,
            y: 0
        }).text('Paper production process: schematic representation');
        this.labels.production = container;
        $(container[0]).hide();
};


Canvas.prototype._getLabel = function(parent, texts, width, position, x, y) {
    var height = texts.length * 14 + 12,
        distance = 100,
        x1, y1, x2, y2, cx, cy, rx, ry, tx, ty;
        g = parent.append('g').attr({
        class: 'label',
        transform: 'translate(' + x + ',' + y + ')'
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



// graph / bottom

Canvas.prototype.createBottomFrame = function() {
    var settings = this.app.settings,
        graph;
    this.layers.bottom.container = this.artboard.append('g').attr({
        class: 'bottom-frame',
        transform: 'translate(' + settings.sizes.layers.bottom.left + ',' + settings.sizes.layers.bottom.positions[0] + ')'
    });
    this.createGraphHeader();
    this.createGraphBody();
    this.createAxis(this.layers.bottom.body, settings, 'x', ['Reducing costs'], ['Generating additional income']);
    this.createAxis(this.layers.bottom.body, settings, 'y', ['Proven', 'Technology'], ['Technology', 'for pioneers']);
};

Canvas.prototype.createGraphHeader = function() {
    this.layers.bottom.header = this.layers.bottom.container.append('g').attr({
        class: 'graph-header'
    });
    this.layers.bottom.header.append('line').attr({
        class: 'graph-top-bar',
        x1: 0,
        y1: 0,
        x2: this.app.settings.sizes.layers.bottom.width,
        y2: 0
    });
    this.layers.bottom.header.append('text').attr({
        class: 'graph-header-text',
        x: 0,
        y: this.app.settings.sizes.layers.bottom.header
    }).text('Sidestream valorization opportunities');
    this.layers.bottom.header.append('text').attr({
        class: 'graph-header-sub',
        x: 0,
        y: this.app.settings.sizes.layers.bottom.header + 32
    }).text('The graph shows the potential of 16 sidestream valorisation technologies, indicatively ordered by their ');
    this.layers.bottom.header.append('text').attr({
        class: 'graph-header-sub',
        x: 0,
        y: this.app.settings.sizes.layers.bottom.header + 48
    }).text('economic potential and by their technology readyness level.');
};

Canvas.prototype.createGraphBody = function() {
    this.layers.bottom.body = this.layers.bottom.container.append('g').attr({
        class: 'graph-body',
        transform: 'translate(0,' + this.app.settings.sizes.layers.bottom.marginTop + ')'
    });
    this.layers.bottom.valorisations =  this.layers.bottom.body.append('g').attr('class', 'valorisation-container');
};

Canvas.prototype.buildFilters = function() {
    this.createFilterSidestreams();
    this.createLegend();
    this.addSidestreamLabels();
};

Canvas.prototype.addSidestreamLabels = function() {
    this.layers.labels.container = this.artboard.append('g').attr({
        class: 'sidestream-labels',
        transform: 'translate(' + this.app.settings.sizes.layers.labels.left + ',' + this.app.settings.sizes.layers.labels.positions[0] + ')'
    });
    for (var i = 0, l = this.app.sidestreams.length; i < l; i++) {
        var sidestream = this.app.sidestreams[i],
            lines = sidestream.name.split(' '),
            sideStreamLabel = this.layers.labels.container.append('g').attr({
                class: 'label-container',
                transform: 'translate(' + i * this.app.settings.sizes.layers.labels.offset + ',0)'
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
    var filter = this.layers.bottom.header.append('g').attr({
        class: 'filter filter-sidestreams',
        transform: 'translate(' + this.app.settings.sizes.filterSidestreams.left + ',' + this.app.settings.sizes.filterSidestreams.top + ')'
    }),
    label = filter.append('g').attr({
        transform: 'translate(' + this.app.settings.sizes.filterSidestreams.labelLeft + ', 10)'
    }),
    labelText = ['Filter by', 'sidestream'];
    for (var j = 0; j < 2; j++) {
        label.append('text').attr({
            x: 0,
            y: j * 12
        }).text(labelText[j])
    }
    for (var i = 0, l = this.app.sidestreams.length; i < l; i++) {
        var sidestream = this.app.sidestreams[i],
            checkboxContainer = this._getCheckboxContainer(filter, i * this.app.settings.sizes.filterSidestreams.setWidth, 0, sidestream.color, '');
        sidestream.elements.display = this._getCheckboxDisplay(checkboxContainer);
        (function(sidestream) {
            checkboxContainer.on('click', function () {
                sidestream.toggle();
            })
        })(sidestream);
    }
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

Canvas.prototype.createAxis = function(graph, settings, direction, label1, label2) {
    var axis = graph.append('g').attr('class', 'graph-axis graph-axis-' + direction),
        positions = [],
        arrow1,
        arrow2,
        xOffset = [],
        yOffset = [];
    if (direction === 'y') {
        positions = [0, 0, 0, settings.sizes.layers.bottom.height - settings.sizes.layers.bottom.margin];
        arrow1 = 'M' + (positions[0] - 5) + ',' + (positions[1] + 7) + 'L' + (positions[0]) + ',' + positions[1] + 'L' + (positions[0] + 5) + ',' + (positions[1] + 7);
        arrow2 = 'M' + (positions[2] - 5) + ',' + (positions[3] - 7) + 'L' + (positions[2]) + ',' + positions[3] + 'L' + (positions[2] + 5) + ',' + (positions[3] - 7);
        xOffset = [20, 20];
        yOffset = [6, -14];
    } else {
        positions = [settings.sizes.layers.bottom.margin, settings.sizes.layers.bottom.height + settings.sizes.layers.bottom.margin, settings.sizes.layers.bottom.width, settings.sizes.layers.bottom.height + settings.sizes.layers.bottom.margin];
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

Canvas.prototype.scroll = function(frame) {
    this.scrollWindow(frame, 'top');
    this.scrollWindow(frame, 'bottom');
    this.scrollWindow(frame, 'labels');
    this.hideElements(frame);
};

Canvas.prototype.hideElements = function(frame) {
    // profit label
    if (frame > 680) {
        $(this.labels.profit[0]).fadeIn(this.app.settings.animation.labelFade);
        $('.roll').fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.labels.profit[0]).fadeOut(this.app.settings.animation.labelFade);
        $('.roll').fadeOut(this.app.settings.animation.labelFade);
    }

    // sidestream label
    if (frame > 1000) {
        $(this.labels.sidestream[0]).fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.labels.sidestream[0]).fadeOut(this.app.settings.animation.labelFade);
    }
    if (frame > 200) {
        $(this.labels.production[0]).fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.labels.production[0]).fadeOut(this.app.settings.animation.labelFade);
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


Canvas.prototype.scrollWindow = function(frame, window) {
    var y,
        pos = this.app.settings.sizes.layers[window].positions,
        index = this.app.story.phase.index,
        direction = this.app.story.phase.direction,
        part,
        buffer = this.app.settings.sizes.story.buffer;
    if (direction !== 0) {
        var current,
            next;
        if (this.app.story.phase.direction > 0) {
            current = pos[index];
            next = pos[index - 1];
            part = (buffer - direction) / buffer;
        } else {
            current = pos[index];
            next = pos[index + 1];
            part = (buffer + direction) / buffer;
        }
        y = current + (next - current) * part;
    } else {
        y = pos[index];
    }
    this.layers[window].container.attr({
        transform: 'translate(' + this.app.settings.sizes.layers[window].left + ',' + y + ')'
    });
};
