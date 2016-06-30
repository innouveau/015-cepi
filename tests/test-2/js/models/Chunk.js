function Chunk(app, canvas, config) {
    this.app = app;
    this.canvas = canvas;
    this.config = config;
    this.snippets = [];
    this.createSnippets();
}

Chunk.prototype.createSnippets = function() {
    for (var i = 0; i < this.config.snippet.n; i++) {
        var snippet = new Snippet(this, this.app, this.canvas, this.config);
        this.snippets.push(snippet);
    }
};



