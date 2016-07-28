function App(container) {
    this.config = {
        container: {
            width: 0,
            height: 0
        },
        chunk: {
            n: 6,
            width: 80,
            height: 80,
            margin: 40
        },
        snippet: {
            n: 250,
            size: 5,
            corners: 3,
            speed: 5
        },
        greyness: 0.8,
        lightness: 0.3,
        animation: {
            frequency: (1000 / 20)
        },
        typography: {
            title: {
                font: '14px Arial',
                color: '#000'
            }
        }
    };
    this.container = container;
    this.canvases = [];
    this.state = null;
    this.phase = null;
    this.pipeline = null;
    this.children = [];
}

App.prototype.init = function() {
    this.measureContainer();
    this.pipeline = new Path(this);
    // maintain this order: create elements, state
    // create the elements
    for (var i = 0; i < this.config.chunk.n; i++) {
        var chunk = new Chunk(this, i);
        this.children.push(chunk);
    }
    // use the toplayer to be able to track events
    this.state = new State(this, this.container);
    this.phase = new Phase(this);
    this.draw();
    this.animate(20000);
};

App.prototype.measureContainer = function(canvases) {
    this.config.container.width = $(this.container).outerWidth();
    this.config.container.height = $(this.container).outerHeight();
};

// main

App.prototype.draw = function(time) {
    for (var i = 0, l = this.canvases.length; i < l; i++) {
        var canvas = this.canvases[i];
        if (canvas.updated) {
            canvas.update();
        }
    }
};

App.prototype.animate = function(time) {
    for (var i = 0, l = this.canvases.length; i < l; i++) {
        var canvas = this.canvases[i];
        if (canvas.updated) {
            canvas.animation.start(time);
        }
    }
};

// helpers

App.prototype.random = function(a) {
    return Math.round(Math.random() * a);
};

// set collectors


App.prototype.getSnippets = function() {
    var elements = [];
    for (var i = 0, l = this.children.length; i < l; i++) {
        var chunk = this.children[i];
        for (var j = 0, jl = chunk.children.length; j < jl; j++) {
            var snippet = chunk.children[j];
            elements.push(snippet);
        }
    }
    return elements;
};