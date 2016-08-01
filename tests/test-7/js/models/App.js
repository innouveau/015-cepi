function App(container) {
    this.container = container;
    this.settings = new Settings(this);
    this.state = new State(this, this.container);
    this.canvases = [];
    this.children = [];
}

App.prototype.init = function() {
    for (var i = 0; i < (this.settings.chunk.n + this.settings.chunk.staticElements); i++) {
        var staticElement = false,
            chunk;
        if (i >= this.settings.chunk.n) {
            staticElement = true;
        }
        chunk = new Chunk(this, i, staticElement);
        this.children.push(chunk);
    }
    this.gotoFrame(0);
    this.loaded();
};

App.prototype.loaded = function() {
    $(this.container).addClass('loaded');
};

// main

App.prototype.gotoFrame = function(frame) {
    for (var i = 0, l = this.canvases.length; i < l; i++) {
        var canvas = this.canvases[i];
        canvas.update(frame);
    }
};


// App.prototype.getSnippets = function() {
//     var elements = [];
//     for (var i = 0, l = this.children.length; i < l; i++) {
//         var chunk = this.children[i];
//         for (var j = 0, jl = chunk.children.length; j < jl; j++) {
//             var snippet = chunk.children[j];
//             elements.push(snippet);
//         }
//     }
//     return elements;
// };