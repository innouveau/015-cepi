function App() {
    this.config = {
        chunk: {
            n: 16,
            width: 100,
            height: 100,
            margin: 40
        },
        snippet: {
            n: 700,
            size: 7,
            corners: 3
        },
        greyness: 0.8,
        lightness: 0.3,
        animation: {
            frequency: (1000 / 60)
        },
        typography: {
            title: {
                font: '14px Arial',
                color: '#000'
            }
        }
    };
    this.canvas = null;
    this.children = [];
    this.animation = null;
}

App.prototype.init = function(canvas) {
    $(canvas).html('');
    this.canvas = new Canvas(canvas, this);
    this.animation = new Animation(this, this.canvas, this.config);
    for (var i = 0; i < this.config.chunk.n; i++) {
        var position = this.canvas.getGridPosition(i, this.config.chunk.n, this.config.chunk.margin),
            chunk = new Chunk(this, this.canvas, this.config, position, i);
        this.children.push(chunk);
    }
};

App.prototype.draw = function() {
    this.canvas.draw();
};


App.prototype.intro = function() {
    var elements = this.getSnippets(),
        time1 = 10000,
        self = this;
    // set elements to new position
    for (var i = 0, l = elements.length; i < l; i++) {
        var element = elements[i];
        element.points.new = element.updatePoints(element.parent.getRandomPositionInCircle(), true);
    }
    this.animation.start(elements, time1);
};

App.prototype.toCorner = function() {
    var elements = this.getSnippets();
    // set elements to new position
    for (var i = 0, l = elements.length; i < l; i++) {
        var element = elements[i];
        element.points.new = element.updatePoints(this.canvas.getCenter(), false);
    }
    this.animation.start(elements, 200);
};

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

App.prototype.random = function(a) {
    return Math.round(Math.random() * a);
};



