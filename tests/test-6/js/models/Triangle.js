function Triangle(app, size, rotation) {
    this.app = app;
    this.rotation = rotation;
    this.points = this.get(size);
}

Triangle.prototype.get = function(size) {
    var width = size,
        height = width * (Math.sqrt(3)/2),
        triangle = [{x:0, y:0},{x: width, y:0},{x:0.5 * width, y:height}],
        rounded;

    if (this.rotation) {
        triangle = this.rotate(triangle)
    }
    rounded = this.round(triangle);
    return rounded;
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


