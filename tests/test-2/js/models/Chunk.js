function Chunk(app, canvas, config, position, index) {
    this.app = app;
    this.canvas = canvas;
    this.config = config;
    this.children = [];
    this.width = config.chunk.width;
    this.height = config.chunk.height;
    this.position = position;
    this.title = 'Valorisation ' + (index + 1);
    this.createSnippets();
    this.drawTitle();
}

Chunk.prototype = Object.create(_NodeModel.prototype);

Chunk.prototype.drawTitle = function() {
    this.canvas.ctx.font = this.config.typography.title.font;
    this.canvas.ctx.fillStyle = this.config.typography.title.color;
    this.canvas.ctx.fillText(this.title, this.position.x, this.position.y - 20);
};

Chunk.prototype.createSnippets = function() {
    for (var i = 0; i < this.config.snippet.n; i++) {
        var snippet = new Snippet(this, this.app, this.canvas, this.config);
        this.children.push(snippet);
    }
};



