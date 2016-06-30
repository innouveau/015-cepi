function Triangle(app, position, size, rotation) {
    this.app = app;
    this.rotation = rotation;
    this.points = this.get(position, size);
}

Triangle.prototype.get = function(position, size) {
    var width = size,
        height = width * (Math.sqrt(3)/2),
        triangle = [{x:0, y:0},{x: width, y:0},{x:0.5 * width, y:height}],
        rotated,
        shifted,
        rounded;

    if (this.rotation) {
        triangle = this.rotate(triangle)
    }
    shifted = this.shift(triangle, position);
    rounded = this.round(shifted);
    return rounded;
};

Triangle.prototype.shift = function(points, position) {
    var shifted = [];
    for (var i = 0, l = points.length; i < l; i++) {
        var point = points[i],
            newPoint = {
                x: point.x + position.x,
                y: point.y + position.y
            };
        shifted.push(newPoint);
    }
    return shifted;
};

Triangle.prototype.rotate = function(triangle) {
    var rotated = [],
        angle = this.app.random(360);
    for (var i = 0; i < 3; i++) {
        var side = triangle[i],
            newSide = {};
        newSide.x = side.x * Math.cos(angle) + side.y * Math.sin(angle);
        newSide.y = side.y * Math.cos(angle) - side.x * Math.sin(angle);
        rotated.push(newSide);
    }
    return rotated;
};

Triangle.prototype.round = function(points) {
    var rounded = [];
    for (var i = 0, l = points.length; i < l; i++) {
        var point = points[i],
            newPoint = {
                x: Math.round(point.x),
                y: Math.round(point.y)
            };
        rounded.push(newPoint);
    }
    return rounded;
};


