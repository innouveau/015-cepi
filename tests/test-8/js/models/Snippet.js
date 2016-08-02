function Snippet(parent, app, i, staticElement) {
    this.parent = parent;
    this.app = app;
    this.staticElement = staticElement;
    this.index = i + parent.index * this.app.settings.snippet.n;
    this.sidestream = new Sidestream(app, this.random(5));
    this.startPosition = this.getStart();
    this.currentPosition = {
        x: this.startPosition.x,
        y: this.startPosition.y
    };
}

Snippet.prototype = Object.create(_NodeModel.prototype);

Snippet.prototype.getStart = function() {
    var x = this.index % this.app.settings.snippet.perRow,
        y = Math.floor(this.index / this.app.settings.snippet.perRow);
    return {
        x: this.app.settings.container.width - x * this.app.settings.snippet.width,
        y: 360 + y * this.app.settings.snippet.height
    };
};

Snippet.prototype.animate = function(frame) {
    this.currentPosition.x = this.startPosition.x + frame * this.app.settings.snippet.speed;
    this.draw();
};

Snippet.prototype.draw = function() {
    if (this.currentPosition.x > 0 && this.currentPosition.x < this.app.settings.container.width) {
        var ctx = this.parent.canvas.ctx;
        ctx.beginPath();
        ctx.rect(this.currentPosition.x, this.currentPosition.y, this.app.settings.snippet.height, this.app.settings.snippet.height);
        ctx.fillStyle = this.sidestream.color;
        ctx.fill();
    }
};

Snippet.prototype.getCoordinate = function(point, direction) {
    return point[direction] + this.currentPosition[direction];
};


