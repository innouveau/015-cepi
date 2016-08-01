function Snippet(parent, app, i, staticElement) {
    this.parent = parent;
    this.app = app;
    this.staticElement = staticElement;
    this.index = i + parent.index * this.app.settings.snippet.n;
    this.color = this.getRandomColor();
    this.triangle = new Triangle(this.app, this.app.settings.snippet.size, true);
    this.position = new Position(this.app, this);
    this.timeline = this.position.getTimeline(this.index);
    this.canAnimate = true;
    this.parent.canvas.updated = true;
    this.currentFrame = 0;
    this.currentPosition = this.timeline[this.currentFrame];
}

Snippet.prototype = Object.create(_NodeModel.prototype);


Snippet.prototype.enlighten = function() {
    return Math.round((1 + this.app.settings.lightness) * this.random(256));
};

Snippet.prototype.animate = function(frame) {
    this.currentFrame = frame;
    // TODO catch the last currentFrame when skipping frames by scrolling
    if (this.timeline[this.currentFrame]) {
        this.currentPosition = this.timeline[this.currentFrame];
    }
    this.draw();
};

Snippet.prototype.draw = function() {
    var ctx = this.parent.canvas.ctx;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.getCoordinate(this.triangle.points[0], 'x'), this.getCoordinate(this.triangle.points[0], 'y'));
    for (var i = 1, l = this.triangle.points.length; i < l; i++) {
        ctx.lineTo(this.getCoordinate(this.triangle.points[i], 'x'), this.getCoordinate(this.triangle.points[i], 'y'));
    }
    ctx.closePath();
    ctx.fill();
};

Snippet.prototype.getCoordinate = function(point, direction) {
    return point[direction] + this.currentPosition[direction];
};

Snippet.prototype.getRandomColor = function() {
    var a = Math.random(),
        grey;
    if (a < this.app.settings.greyness) {
        grey = this.enlighten();
        return 'rgb(' + grey + ',' + grey + ',' + grey + ')';
    } else {
        return 'rgb(' + this.enlighten() + ',' + this.enlighten() + ',' + this.enlighten() + ')';
    }
};


