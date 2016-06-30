function _NodeModel() {}


_NodeModel.prototype.getRandomPosition = function(margin) {
    return {
        x: margin + this.app.random(this.width - 2 * margin),
        y: margin + this.app.random(this.height - 2 * margin)
    }
};

_NodeModel.prototype.getRandomPositionInCircle = function() {
    var radius = Math.min(this.width, this.height) / 2,
        pt_angle = Math.random() * 2 * Math.PI,
        pt_radius_sq = Math.random() * radius * radius,
        x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle) + radius,
        y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle) + radius;
    return {
        x: x + this.position.x + (this.width - 2 * radius) / 2,
        y: y + this.position.y + (this.height - 2 * radius) / 2
    }
};

_NodeModel.prototype.getGridPosition = function(i, l, margin) {
    var unitsPerLine = Math.ceil(Math.sqrt(l)),
        x = i % unitsPerLine,
        y = Math.floor(i / unitsPerLine);
    return {
        x: x * (this.width / unitsPerLine) + margin,
        y: y * (this.height / unitsPerLine) + margin
    }
};

_NodeModel.prototype.getCenter = function() {
    return {
        x: this.width / 2,
        y: this.height / 2
    }
};