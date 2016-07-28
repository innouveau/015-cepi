function Chunk(app, index) {
    this.app = app;
    this.index = index;
    this.width = app.config.chunk.width;
    this.height = app.config.chunk.height;
    this.style = {
        border: {
            normal: '#333',
            hover: '#f55'
        }
    };

    this.canvas = this.createCanvases();
    this.position = this.canvas.main.getGridPosition(index, this.app.config.chunk.n, this.app.config.chunk.margin);
    this.children = this.createSnippets();
    this.injectCanvases();
}

Chunk.prototype = Object.create(_NodeModel.prototype);


Chunk.prototype.createCanvases = function() {
    var canvas = {};
    canvas.main = this.createCanvas( 'chunk-' + this.index + '-main');
    canvas.snippets = this.createCanvas('chunk-' + this.index + '-snippets');
    return canvas;
};

Chunk.prototype.injectCanvases = function() {
    this.canvas.main.injectElements([this]);
    this.canvas.snippets.injectElements(this.children);
};


Chunk.prototype.createSnippets = function() {
    var children = [];
    for (var i = 0; i < this.app.config.snippet.n; i++) {
        var snippet = new Snippet(this, this.app, i);
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


