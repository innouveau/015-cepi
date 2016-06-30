function Snippet() {
    this.config = {
        container: {
            width: 0,
            height: 0,
            margin: 20
        },
        chunk: {
            n: 1
        },
        snippet: {
            n: 1,
            size: 10,
            corners: 3
        },
        greyness: 0.9
    };

    this.elements = {
        container: null
    };
    this.chunks = [];

}

Snippet.prototype.init = function(element) {
    $(element).html('');
    this.elements.container = d3.select(element).append('svg').attr({
        width: '100%',
        height: '100%'
    });
    this.config.container.width = $(element).outerWidth();
    this.config.container.height = $(element).outerHeight();
};

Snippet.prototype.redraw = function(n, size, corners, greyness) {
    var self = this;
    this.elements.container.selectAll("*").remove();
    this.config.snippet.n = n;
    this.config.snippet.size = size;
    this.config.snippet.corners = corners;
    this.config.greyness = greyness;
    for (var i = 0; i < this.config.chunk.n; i++) {
        this.createChunk(i);
    }
    setTimeout(function(){
        self.animate();
    }, 1000);
};



// creators

Snippet.prototype.createChunk = function(index) {
    var chunk = {
        selector: this.elements.container.append('g').attr('class', 'chunk chunk-' + index),
        snippets: []
    };
    this.chunks.push(chunk);
    for (var i = 0; i < this.config.snippet.n; i++) {
        this.createSnippet(chunk, i);
    }
};

Snippet.prototype.animate = function() {
    // for (var i = 0, l = this.chunks.length; i < l; i++) {
    //     var chunk = this.chunks[i];
    //     for (var j = 0, jl = chunk.snippets.length; j < jl; j++) {
    //         var snippet = chunk.snippets[j],
    //             newPosition = this.position();
    //         snippet.position = newPosition;
    //         snippet.selector
    //         console.log("p");
    //     }
    // }
    var self = this;
    d3.selectAll('.snippet').transition().duration(2000).attr('transform', function(){
        return self.getTransform(self.position());
    });
};

Snippet.prototype.createSnippet = function(chunk, index) {
    var self = this,
        position = this.randomPosition(),
        snippetForm = getPoly(this.config.snippet.corners, this.config.snippet.size),
        snippet = {};
    snippet.position = position;
    snippet.selector = chunk.selector.append('g').attr({
        'class': 'snippet snippet-' + index,
        'transform': this.getTransform(position)
    });
    snippet.selector.append('polygon').attr({
        points: snippetForm,
        fill: self.getColor()
    });
    chunk.snippets.push(snippet);
};

Snippet.prototype.getTransform = function(position) {
    transform =  'translate(' + position.x;
    transform += ',' + position.y;
    transform += ') rotate(' + this.random(360) + ')';
    return transform;
};



// helpers

Snippet.prototype.getColor = function() {
    var a = Math.random(),
        grey;
    if (a < this.config.greyness) {
        grey = this.random(256);
        return 'rgb(' + grey + ',' + grey + ',' + grey + ')';
    } else {
        return 'rgb(' + this.random(256) + ',' + this.random(256) + ',' + this.random(256) + ')';
    }
};

Snippet.prototype.random = function(a) {
    return Math.round(Math.random() * a);
};

Snippet.prototype.randomPosition = function() {
    return {
        x: this.config.container.margin + this.random(this.config.container.width - 2 * this.config.container.margin),
        y: this.config.container.margin + this.random(this.config.container.height - 2 * this.config.container.margin)
    }
};

Snippet.prototype.position = function() {
    var radius = this.config.container.width / 2 - this.config.container.margin,
        pt_angle = Math.random() * 2 * Math.PI,
        pt_radius_sq = Math.random() * radius * radius,
        x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle) + this.config.container.margin + radius,
        y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle) + this.config.container.margin + radius;
    return {
        x: x,
        y: y
    }
};
