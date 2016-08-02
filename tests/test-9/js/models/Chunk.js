function Chunk(app, index, staticElement) {
    this.app = app;
    this.index = index;
    this.staticElement = staticElement;
    this.width = app.settings.chunk.width;
    this.height = app.settings.chunk.height;
    this.canvas = this.createCanvas();
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
        children.push(new Snippet(this, this.app, i, this.staticElement));
    }
    return children;
};