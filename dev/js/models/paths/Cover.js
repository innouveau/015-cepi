function Cover(app, path) {
    this.app = app;
    this.type = path.type;
    this.points = path.points;
    this.name = path.name;
    this.animationStart = path.animationStart;
    this.container = null;
    this.path = null;
    this.build();
    this.length = 0;
    this.measure();
}

Cover.prototype = Object.create(_NodeModel.prototype);

Cover.prototype.build = function() {
    this.container = this.app.canvas.layers.top.cover.append('g').attr({
        class: this.name
    });
    this.path = new CoverSubpath(this.app, this);
};

Cover.prototype.measure = function() {
    this.length = this.path.element[0][0].getTotalLength();
    this.path.init([this.length, 100 * this.length])
};


Cover.prototype.scroll = function(frame) {
    var delta = frame - this.animationStart;
    if (delta < 0) {
        delta = 0;
    }
    this.path.scroll(delta);
};