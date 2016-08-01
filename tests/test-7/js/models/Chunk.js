function Chunk(app, index, staticElement) {
    this.app = app;
    this.index = index;
    this.staticElement = staticElement;
    this.width = app.settings.chunk.width;
    this.height = app.settings.chunk.height;
    this.canvas = this.createCanvas();
    this.position = new Position(this.app, this);
    this.children = this.createSnippets();
    this.injectCanvases();
}



Chunk.prototype.createCanvas = function() {
    var canvas = new Canvas(this, this.app, this.staticElement, 'canvas-' + this.index);
    this.app.canvases.push(canvas);
    return canvas;
};


Chunk.prototype.injectCanvases = function() {
    this.canvas.injectElements(this.children);
};

Chunk.prototype.createSnippets = function() {
    var children = [];
    for (var i = 0; i < this.app.settings.snippet.n; i++) {
        var snippet = new Snippet(this, this.app, i, this.staticElement);
        children.push(snippet);
    }
    return children;
};

// helpers

Chunk.prototype.getX = function() {
    return this.position.x;
};

Chunk.prototype.getY = function() {
    return this.position.y;
};

Chunk.prototype.getWidth = function() {
    return this.width;
};

Chunk.prototype.getHeight = function() {
    return this.height;
};

Chunk.prototype.click = function() {
  console.log(this.title);
};

Chunk.prototype.hover = function() {
    // this.drawBorder('hover');
    // for (var i = 0, l = this.children.length; i < l; i++) {
    //     var element = this.children[i];
    //     element.points.new = element.updatePoints(element.parent.getRandomPositionInCircle(), true);
    // }
    // this.canvas.main.animation.start(1000);
};

Chunk.prototype.draw = function() {
    // var ctx = this.canvas.main.ctx;
    // ctx.beginPath();
    // ctx.lineWidth = '1';
    // ctx.strokeStyle = this.style.border[style];
    // ctx.rect(this.getX(), this.getY(), this.width, this.height);
    // ctx.stroke();
};


