function Snippet(parent, app, i) {
    var position = parent.canvas.main.getRandomPositionInCircle();
    this.parent = parent;
    this.app = app;
    this.index = i + parent.index * this.app.config.snippet.n;
    this.color = this.getRandomColor();
    this.triangle = new Triangle(this.app, this.app.config.snippet.size, true);
    this.position = new Position(this.app, this);
    this.timeline = this.position.getTimeline(this.index);
    this.canAnimate = true;
    this.parent.canvas.snippets.updated = true;
    this.currentFrame = 0;
    this.currentPosition = this.timeline[this.currentFrame];
}



Snippet.prototype.enlighten = function() {
    return Math.round((1 + this.app.config.lightness) * this.app.random(256));
};

Snippet.prototype.animate = function() {
    this.currentFrame++;
    if (this.timeline[this.currentFrame]) {
        this.currentPosition = this.timeline[this.currentFrame];
    }
};

Snippet.prototype.draw = function() {
    var ctx = this.parent.canvas.snippets.ctx;
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
    if (a < this.app.config.greyness) {
        grey = this.enlighten();
        return 'rgb(' + grey + ',' + grey + ',' + grey + ')';
    } else {
        return 'rgb(' + this.enlighten() + ',' + this.enlighten() + ',' + this.enlighten() + ')';
    }
};


