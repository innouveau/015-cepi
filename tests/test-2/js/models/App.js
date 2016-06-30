function App() {
    this.config = {
        chunk: {
            n: 1
        },
        snippet: {
            n: 1,
            size: 10,
            corners: 3
        },
        greyness: 0.9,
        animation: {
            frequency: (1000 / 60)
        }
    };
    this.canvas = null;
    this.chunks = [];
    this.animation = null;
}

App.prototype.init = function(canvas) {
    $(canvas).html('');
    this.canvas = new Canvas(canvas, this);
    this.animation = new Animation(this, this.canvas, this.config);
};

App.prototype.reset = function(n, size, corners, greyness) {
    var self = this;
    this.chunks = [];
    this.draw(n, size, corners, greyness);
};

App.prototype.set = function(n, size, corners, greyness) {
    this.config.snippet.n = n;
    this.config.snippet.size = size;
    this.config.snippet.corners = corners;
    this.config.greyness = greyness;
    for (var i = 0; i < this.config.chunk.n; i++) {
        var chunk = new Chunk(this, this.canvas, this.config);
        this.chunks.push(chunk);
    }
};

App.prototype.draw = function() {
    this.canvas.draw();
};


App.prototype.intro = function() {
    var elements = this.getSnippets();
    // set elements to new position
    for (var i = 0, l = elements.length; i < l; i++) {
        var element = elements[i];
        element.points.new = element.updatePoints(this.canvas.getRandomPositionInCircle());
    }
    this.animation.start(elements, 200);
};

App.prototype.getSnippets = function() {
    var elements = [];
    for (var i = 0, l = this.chunks.length; i < l; i++) {
        var chunk = this.chunks[i];
        for (var j = 0, jl = chunk.snippets.length; j < jl; j++) {
            var snippet = chunk.snippets[j];
            elements.push(snippet);
        }
    }
    return elements;
};

App.prototype.random = function(a) {
    return Math.round(Math.random() * a);
};



