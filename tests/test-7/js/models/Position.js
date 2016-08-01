function Position(app, snippet) {
    this.app = app;
    this.element = snippet;
    this.constants = {
        spread: (Math.random() - 0.5) * 10,
        start: this.getRandomPositionInCircle()
    };
    this.pipeline = [];
    this.init();
}

Position.prototype = Object.create(_NodeModel.prototype);

Position.prototype.init = function() {
    if (!this.element.staticElement) {
        this.pipeline = this.getPipeline();
        this.constants.end = this.getRandomPositioninSquare();
    }
};

Position.prototype.getPipeline = function() {
    return this.spread(this.app.settings.path.coordinates);
};

Position.prototype.spread = function(set) {
    var newCoordinates = [];
    for (var i = 0, l = set.length; i < l; i++) {
        var oldCoordinate = set[i],
            newCoordinate = {};
        newCoordinate.x = oldCoordinate.x + this.constants.spread;
        newCoordinate.y = oldCoordinate.y + this.constants.spread;
        newCoordinates.push(newCoordinate);
    }
    return newCoordinates;
};



Position.prototype.getTimeline = function(passiveFrames) {
    var set = [],
        roadFromCircle,
        roadToSquare;
    if (this.element.staticElement) {
        set.push(this.constants.start);
    } else {
        roadFromCircle = this.getroadFromCircle();
        roadToSquare = this.getRoadToSquare();
        set = set.concat(roadFromCircle);
        set = set.concat(this.pipeline);
        // add waiting time, to launch snippets one by one
        for (var i = 0; i < Math.floor(passiveFrames / 4); i++) {
            set.unshift(null);
        }
        // initial position
        set.unshift(this.constants.start);
    }
    return set;
};

Position.prototype.getroadFromCircle = function() {
    var preset = [],
        pipelineStart = this.pipeline[0],
        a = pipelineStart.x - this.constants.start.x,
        b  = pipelineStart.y - this.constants.start.y,
        length = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) ),
        steps = length / this.app.settings.snippet.speed,
        vector = {
            x: a / steps,
            y: b / steps
        };
    for (var i = 0; i < steps; i++) {
        var coordinate = {
            x: this.constants.start.x + i * vector.x,
            y: this.constants.start.y + i * vector.y
        };
        preset.push(coordinate);
    }
    return preset;
};

Position.prototype.getRoadToSquare = function() {
    var thisSet = [],
        pipelineEnd = this.pipeline[this.pipeline.length - 1],
        a = this.constants.end.x - pipelineEnd.x,
        b  = this.constants.end.y - pipelineEnd.y,
        length = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) ),
        steps = length / this.app.settings.snippet.speed,
        vector = {
            x: a / steps,
            y: b / steps
        };
    for (var i = 0; i < steps; i++) {
        var coordinate = {
            x: pipelineEnd.x + i * vector.x,
            y: pipelineEnd.y + i * vector.y
        };
        thisSet.push(coordinate);
    }
    return thisSet;
};

Position.prototype.getRandomPositioninSquare = function(margin) {
    var width = 250,
        height = 250,
        position = {
            x: 750,
            y: 500
        };
    return {
        x: position.x + this.random(width),
        y: position.y + this.random(width)
    }
};

Position.prototype.getRandomPositionInCircle = function() {
    var radius = 120,
        pt_angle = Math.random() * 2 * Math.PI,
        pt_radius_sq = Math.random() * radius * radius,
        x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle) + radius,
        y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle) + radius;
    return {
        x: x + 10,
        y: y + 125
    }
};

Position.prototype.getGridPosition = function(i, l, margin) {
    var unitsPerLine = Math.ceil(Math.sqrt(l)),
        x = i % unitsPerLine,
        y = Math.floor(i / unitsPerLine);
    return {
        x: x * (this.width / unitsPerLine) + margin,
        y: y * (this.height / unitsPerLine) + margin
    }
};



