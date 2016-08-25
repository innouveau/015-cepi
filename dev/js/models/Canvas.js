function Canvas(app) {
    this.app = app;
    this.name = name;
    this.element = this.create();
    this.artboard = this.getArtboard();
    this.topFrame = this.getTopframe();
    this.paths = this.getPathsLayer();
    this.cover = this.getCoverLayer();
    this.static = this.getStaticLayer();
    this.raw = this.getRawLayer();
    this.addLabels();
    this.sidestreamLabels = [];
    this.bottomFrame = this.getBottomFrame();
}

Canvas.prototype.scroll = function(frame) {
    this.scrollWindow(frame, 'topFrame');
    this.scrollWindow(frame, 'bottomFrame');
    this.hideElements(frame);
};

Canvas.prototype.hideElements = function(frame) {
    // raw label
    if (frame > 8) {
        $(this.rawLabel[0]).fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.rawLabel[0]).fadeOut(this.app.settings.animation.labelFade);
    }

    // profit label
    if (frame > 680) {
        $(this.profitLabel[0]).fadeIn(this.app.settings.animation.labelFade);
        $('.roll').fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.profitLabel[0]).fadeOut(this.app.settings.animation.labelFade);
        $('.roll').fadeOut(this.app.settings.animation.labelFade);
    }

    // sidestream label
    if (frame > 1000) {
        $(this.sidestreamLabel[0]).fadeIn(this.app.settings.animation.labelFade);
    } else {
        $(this.sidestreamLabel[0]).fadeOut(this.app.settings.animation.labelFade);
    }
    // sidestream labels
    var startFrame = 800;
    for (var i = 0, l = this.sidestreamLabels.length; i < l; i++) {
        if (frame > (startFrame + i * 10)) {
            $(this.sidestreamLabels[i][0]).fadeIn(this.app.settings.animation.labelFade);
        } else {
            $(this.sidestreamLabels[i][0]).fadeOut(this.app.settings.animation.labelFade);
        }
    }
};


Canvas.prototype.scrollWindow = function(frame, window) {
    var y,
        pos = this.app.settings[window].positions,
        index = this.app.story.phase.index,
        direction = this.app.story.phase.direction,
        part,
        buffer = this.app.story.buffer;
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
    this[window].attr({
        transform: 'translate(' + this.app.settings[window].left + ',' + y + ')'
    });
};


// creation stuff

Canvas.prototype.create = function() {
    return d3.select(this.app.container).append('svg').attr({
        width: '100%',
        height: '100%'
    });
};

Canvas.prototype.getArtboard = function() {
    return this.element.append('g').attr({
        class: 'artboard',
        transform: 'translate(60, 0)'
    });
};

Canvas.prototype.getTopframe = function() {
    return this.artboard.append('g').attr({
        class: 'top-frame',
        transform: 'translate(' + this.app.settings.topFrame.left + ',' + this.app.settings.topFrame.positions[0]  + ')'
    });
};

Canvas.prototype.getPathsLayer = function () {
    return this.topFrame.append('g').attr({
        class: 'paths-container'
    });
};

Canvas.prototype.getCoverLayer = function () {
    return this.topFrame.append('g').attr({
        class: 'cover-paths-container'
    });
};

Canvas.prototype.getRawLayer = function () {
    return this.topFrame.append('g').attr({
        class: 'raw-container'
    });
};

Canvas.prototype.getStaticLayer = function () {
    return this.topFrame.append('g').attr({
        class: 'static-paths-container'
    });
};

Canvas.prototype.addLabels = function() {
    this.rawLabel = this._getLabel(this.topFrame, ['Raw Material:', 'Recycled Paper'], 130, 'right', this.app.settings.labels.raw.left, this.app.settings.labels.raw.top);
    this.profitLabel = this._getLabel(this.topFrame, ['Paper product', '(profit)'], 110, 'top', this.app.settings.labels.profit.left, this.app.settings.labels.profit.top);
    this.sidestreamLabel = this._getLabel(this.topFrame, ['Side streams', '(costs)'], 110, 'right', this.app.settings.labels.sidestream.left, this.app.settings.labels.sidestream.top);
    $(this.rawLabel[0]).hide();
    $(this.profitLabel[0]).hide();
    $(this.sidestreamLabel[0]).hide();
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

Canvas.prototype.getBottomFrame = function() {
    var settings = this.app.settings,
        header,
        graph;

    graph = this.artboard.append('g').attr({
        class: 'bottom-frame',
        transform: 'translate(' + settings.bottomFrame.left + ',' + settings.bottomFrame.positions[0] + ')'
    });
    this.createGraphHeader(graph, settings);
    this.createGraphBody(graph, settings);
    this.createAxis(this.bottomFrameBody, settings, 'x', ['Reducing costs / little extra profit'], ['Making serious money']);
    this.createAxis(this.bottomFrameBody, settings, 'y', ['Proven', 'Technology'], ['Technology', 'for pioneers']);
    return graph;
};

Canvas.prototype.createGraphHeader = function(graph, settings) {
    this.bottomFrameHeader = graph.append('g').attr({
        class: 'graph-header'
    });
};

Canvas.prototype.createGraphBody = function(graph, settings) {
    this.bottomFrameBody = graph.append('g').attr({
        class: 'graph-body',
        transform: 'translate(0,' + settings.bottomFrame.marginTop + ')'
    });
    this.valorisationContainer = this.bottomFrameBody.append('g').attr('class', 'valorisation-container');
};

Canvas.prototype.buildFilters = function() {
    this.createFilterSidestreams();
    this.createFilterValorisations();
    this.addSidestreamLabels();
};

Canvas.prototype.addSidestreamLabels = function() {
    var container = this.topFrame.append('g').attr({
        class: 'sidestream-labels',
        transform: 'translate(20,' + this.app.settings.filterSidestreams.labelsTop + ')'
    });
    for (var i = 0, l = this.app.sidestreams.length; i < l; i++) {
        var sidestream = this.app.sidestreams[i],
            lines = sidestream.name.split(' '),
            sideStreamLabel = container.append('g').attr({
                class: 'label-container',
                transform: 'translate(' + i * this.app.settings.filterSidestreams.setWidth + ',0)',
                display: 'none'
            });
        for (var j = 0, jl = lines.length; j < jl; j++) {
            sideStreamLabel.append('text').attr({
                class: 'sidestream-label',
                transform: 'translate(0,' + j * 15 + ')'
            }).text(lines[j]);
        }
        this.sidestreamLabels.push(sideStreamLabel);
    }
};

Canvas.prototype.createFilterSidestreams = function() {
    var filter = this.bottomFrameHeader.append('g').attr({
        class: 'filter filter-sidestreams',
        transform: 'translate(' + this.app.settings.filterSidestreams.left + ',' + this.app.settings.filterSidestreams.top + ')'
    });
    for (var i = 0, l = this.app.sidestreams.length; i < l; i++) {
        var sidestream = this.app.sidestreams[i],
            checkboxContainer = this._getCheckboxContainer(filter, i * this.app.settings.filterSidestreams.setWidth, 0, sidestream.color, ''),
            checkboxDisplay = this._getCheckboxDisplay(checkboxContainer),
            lines = sidestream.name.split(' ');

        for (var j = 0, jl = lines.length; j < jl; j++) {
            checkboxContainer.append('text').attr({
                class: 'sidestream-filter-label',
                x: -2,
                y: 34 + j * this.app.settings.typography.lineHeight
            }).text(lines[j]);
        }
        sidestream.elements.display = checkboxDisplay;
        (function(sidestream) {
            checkboxContainer.on('click', function () {
                sidestream.toggle();
            })
        })(sidestream);
    }
};

Canvas.prototype.createFilterValorisations = function() {
    var legenda = this.bottomFrame.append('g').attr({
        class: 'fitler filter-valorisations',
        transform: 'translate(' + this.app.settings.filterValorisations.left + ',' + this.app.settings.filterValorisations.top + ')'
    }),
    counter = 0,
    self = this;
    for (var i = 0, l = this.app.sets.length; i < l; i++) {
        var set = this.app.sets[i];
        legenda.append('text').attr({
            class: 'legend-header',
            x: 0,
            y: (counter * this.app.settings.filterValorisations.setHeight)
        }).text(set.name);
        counter+= 0.5;
        for (var j = 0, jl = set.children.length; j < jl; j++) {
            var valorisation = set.children[j];
            (function (valorisation) {
                valorisation.button.legend = new LegendButton(self.app, valorisation);

            })(valorisation);
            counter++;
        }
        // skip to make space for header
        counter++;
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
        yOffset = [],
        textAnchor = 'start';
    if (direction === 'y') {
        positions = [0, 0, 0, settings.bottomFrame.height - settings.bottomFrame.margin];
        arrow1 = 'M' + (positions[0] - 5) + ',' + (positions[1] + 7) + 'L' + (positions[0]) + ',' + positions[1] + 'L' + (positions[0] + 5) + ',' + (positions[1] + 7);
        arrow2 = 'M' + (positions[2] - 5) + ',' + (positions[3] - 7) + 'L' + (positions[2]) + ',' + positions[3] + 'L' + (positions[2] + 5) + ',' + (positions[3] - 7);
        xOffset = [-20, -20];
        yOffset = [6, -14];
    } else {
        positions = [0, settings.bottomFrame.height, settings.bottomFrame.width, settings.bottomFrame.height];
        arrow1 = 'M' + (positions[0] + 7) + ',' + (positions[1] -5) + 'L' + (positions[0]) + ',' + positions[1] + 'L' + (positions[0] + 7) + ',' + (positions[1] + 5);
        arrow2 = 'M' + (positions[2] - 7) + ',' + (positions[3] -5) + 'L' + (positions[2]) + ',' + positions[3] + 'L' + (positions[2] - 7) + ',' + (positions[3] + 5);
        xOffset = [0, -120];
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
    if (direction === 'y') {
        textAnchor = 'end'
    }
    for (var i = 0, l = label1.length; i < l; i++) {
        axis.append('text').attr({
            'text-anchor': textAnchor,
            class: 'graph-label',
            x: positions[0] + xOffset[0],
            y: positions[1] + yOffset[0] + i * this.app.settings.typography.lineHeight
        }).text(label1[i]);
    }
    for (var j = 0, jl = label2.length; j < jl; j++) {
        axis.append('text').attr({
            'text-anchor': textAnchor,
            class: 'graph-label',
            x: positions[2] + xOffset[1],
            y: positions[3] + yOffset[1] + j * this.app.settings.typography.lineHeight
        }).text(label2[j])
    }

};


