function Snippet(parent, app, canvas, config) {
    this.parent = parent;
    this.app = app;
    this.canvas = canvas;
    this.config = config;
    this.color = this.getRandomColor();
    // old, current and new to register an animation
    var currentPoints = this.updatePoints(this.canvas.getRandomPosition());
    this.points = {
        old: currentPoints,
        current: currentPoints,
        new: null
    }
}

Snippet.prototype.getRandomColor = function() {
    var a = Math.random(),
        grey;
    if (a < this.config.greyness) {
        grey = this.app.random(256);
        return 'rgb(' + grey + ',' + grey + ',' + grey + ')';
    } else {
        return 'rgb(' + this.app.random(256) + ',' + this.app.random(256) + ',' + this.app.random(256) + ')';
    }
};

Snippet.prototype.updatePoints = function(position) {
    var newTriangle = new Triangle(this.app, position, this.config.snippet.size);
    return newTriangle.points;
};

Snippet.prototype.animate = function(progress) {
    for (var i = 0, l = this.points.old.length; i < l; i++) {
        var oldPoint = this.points.old[i],
            newPoint = this.points.new[i],
            currentPoint = this.points.current[i];
        for(var axis in oldPoint) {
            currentPoint[axis] = (newPoint[axis] - oldPoint[axis]) * progress + oldPoint[axis];
        }
    }
};


