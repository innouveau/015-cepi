function Snippet(parent, app, i, staticElement) {
    this.parent = parent;
    this.app = app;
    this.staticElement = staticElement;
    this.index = i + parent.index * this.app.settings.snippet.n;
    this.sidestream = new Sidestream(app, this.random(9));
    this.body = new Square(this.app);
    this.position = new Position(this.app, this);
    this.timeline = this.position.getTimeline(this.index);
    this.canAnimate = true;
    this.parent.canvas.updated = true;
    this.currentFrame = 0;
    this.currentPosition = this.timeline[this.currentFrame];
    this.lastFrame = this.timeline.length - 1;
}

Snippet.prototype = Object.create(_NodeModel.prototype);

Snippet.prototype.animate = function(frame) {
    if (frame > this.lastFrame) {
        this.currentFrame = this.lastFrame;
    } else {
        this.currentFrame = frame;
    }
    if (this.timeline[this.currentFrame] !== null) {
        this.currentPosition = this.timeline[this.currentFrame];
    }
    this.draw();
};

Snippet.prototype.draw = function() {
    var ctx = this.parent.canvas.ctx;
    ctx.fillStyle = this.sidestream.color;
    ctx.beginPath();
    ctx.moveTo(this.getCoordinate(this.body.points[0], 'x'), this.getCoordinate(this.body.points[0], 'y'));
    for (var i = 1, l = this.body.points.length; i < l; i++) {
        ctx.lineTo(this.getCoordinate(this.body.points[i], 'x'), this.getCoordinate(this.body.points[i], 'y'));
    }
    ctx.closePath();
    ctx.fill();
};

Snippet.prototype.getCoordinate = function(point, direction) {
    return point[direction] + this.currentPosition[direction];
};


