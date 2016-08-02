function Chunk(app, index, staticElement) {
    this.app = app;
    this.index = index;
    this.staticElement = staticElement;
    this.width = app.settings.chunk.width;
    this.height = app.settings.chunk.height;
    this.position = this.getGridPosition(index, this.app.settings.chunk.n);
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

Chunk.prototype.getGridPosition = function(i, l) {
    var unitsPerLine = Math.ceil(Math.sqrt(l)),
        x = i % unitsPerLine,
        y = Math.floor(i / unitsPerLine);
    console.log(x,y, unitsPerLine);
    return {
        x: (x + 0.5) * (this.app.settings.grid.width / unitsPerLine) + this.app.settings.grid.position.x,
        y: (y + 0.5) * (this.app.settings.grid.height / unitsPerLine) + this.app.settings.grid.position.y
    }
};