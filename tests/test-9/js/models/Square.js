function Square(app, rotation) {
    this.app = app;
    this.rotation = rotation;
    this.points = this.get();
}

Square.prototype = Object.create(_NodeModel.prototype);

Square.prototype.get = function() {
    var width = this.app.settings.snippet.width,
        height = this.app.settings.snippet.height
    return this.rotate([
        {x: 0, y: 0},
        {x: width, y: 0},
        {x: width, y: height},
        {x: 0, y: height}
    ]);
};

Square.prototype.rotate = function(body) {
    var rotated = [],
        angle = this.random(360),
        s = Math.sin(angle),
        c = Math.cos(angle);
    for (var i = 0; i < body.length; i++) {
        var point = body[i],
            newPoint = {};
        newPoint.x = point.x * Math.cos(angle) + point.y * Math.sin(angle);
        newPoint.y = point.y * Math.cos(angle) - point.x * Math.sin(angle);
        rotated.push(newPoint);
    }
    return rotated;
};

Square.prototype.round = function(points) {
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


