function Canvas(element, app, chunk) {
    this.app = app;
    this.element = element;
    this.ctx = element.getContext('2d');
    this.width = $(element).outerWidth();
    this.height = $(element).outerHeight();
    this.position = {x:0, y:0};
    this.chunk = chunk;
    this.updated = false;
    this.animation = new Animation(app, this);
}

Canvas.prototype = Object.create(_NodeModel.prototype);

Canvas.prototype.update = function() {
    this.clear();
    var chunk = this.chunk;
    chunk.drawTitle();
    //chunk.drawBorder('normal');
    for (var j = 0, jl = chunk.children.length; j < jl; j++) {
        var snippet = chunk.children[j];
        snippet.draw(snippet.points.current, snippet.color);
    }
};

Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
};


