function Position(app, snippet) {
    this.app = app;
    this.snippet = snippet;
    this.constants = {
        start: this.getRandomPositionInCircle(),
        spread: (Math.random() - 0.5) * 15
    };
    this.pipeline = this.getPipeline();
}

Position.prototype.getPipeline = function() {
    return this.spread(this.app.pipeline.coordinates);
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

Position.prototype.getRandomPositionInCircle = function() {
    var radius = 120,
        pt_angle = Math.random() * 2 * Math.PI,
        pt_radius_sq = Math.random() * radius * radius,
        x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle) + radius,
        y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle) + radius;
    return {
        x: x + 50,
        y: y
    }
};

Position.prototype.getTimeline = function(passiveFrames) {
    var preset = this.getPreset(),
        set = preset.concat(this.pipeline);
    for (var i = 0; i < Math.floor(passiveFrames / 10); i++) {
        set.unshift(null);
    }
    set.unshift(this.constants.start);
    return set;
};

Position.prototype.getPreset = function() {
    var preset = [],
        pipelineStart = this.pipeline[0],
        a = pipelineStart.x - this.constants.start.x,
        b  = pipelineStart.y - this.constants.start.y,
        length = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) ),
        steps = length / this.app.config.snippet.speed,
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