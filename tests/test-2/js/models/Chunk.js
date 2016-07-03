function Chunk(app, index) {
    this.app = app;
    this.children = [];
    this.width = app.config.chunk.width;
    this.height = app.config.chunk.height;
    this.style = {
        border: {
            normal: '#333',
            hover: '#f55'
        }
    };
    this.title = 'Valorisation ' + (index + 1);
    this.canvas = this.createCanvas();
    this.position = this.canvas.getGridPosition(index, this.app.config.chunk.n, this.app.config.chunk.margin);
    this.createSnippets();
    this.drawTitle();
}

Chunk.prototype = Object.create(_NodeModel.prototype);

Chunk.prototype.createCanvas = function() {
    var canvas = document.createElement('CANVAS'),
        canvasModel;
    canvas.width = this.app.config.container.width;
    canvas.height = this.app.config.container.height;
    this.app.container.appendChild(canvas);
    canvasModel = new Canvas(canvas, this.app, this);
    this.app.canvases.push(canvasModel);
    return canvasModel;
};

Chunk.prototype.drawTitle = function() {
    this.canvas.ctx.font = this.app.config.typography.title.font;
    this.canvas.ctx.fillStyle = this.app.config.typography.title.color;
    this.canvas.ctx.fillText(this.title, this.position.x, this.position.y - 20);
};

Chunk.prototype.createSnippets = function() {
    for (var i = 0; i < this.app.config.snippet.n; i++) {
        var snippet = new Snippet(this, this.app);
        this.children.push(snippet);
    }
};

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

Chunk.prototype.drawBorder = function(style) {
    var ctx = this.canvas.ctx;
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = this.style.border[style];
    ctx.rect(this.getX(), this.getY(), this.width, this.height);
    ctx.stroke();
};

Chunk.prototype.click = function() {
  console.log(this.title);
};

Chunk.prototype.hover = function() {
    this.drawBorder('hover');
    for (var i = 0, l = this.children.length; i < l; i++) {
        var element = this.children[i];
        element.points.new = element.updatePoints(element.parent.getRandomPositionInCircle(), true);
    }
    this.app.animation.start(this.children, 1000);
};


