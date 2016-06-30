function Canvas(element, app) {
    this.app = app;
    this.ctx = element.getContext('2d');
    this.width = $(element).outerWidth();
    this.height = $(element).outerHeight();
    this.position = {x:0, y:0};
}

Canvas.prototype = Object.create(_NodeModel.prototype);

Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
};


Canvas.prototype.draw = function() {
    this.clear();
    for (var i = 0, l = this.app.children.length; i < l; i++) {
        var chunk = this.app.children[i];
        chunk.drawTitle();
        for (var j = 0, jl = chunk.children.length; j < jl; j++) {
            var snippet = chunk.children[j];
            this.drawPoly(snippet.points.current, snippet.color);
        }
    }
};


Canvas.prototype.drawPoly = function(points, color) {
    var c = this.ctx;
    c.fillStyle = color;
    c.beginPath();
    c.moveTo(points[0].x, points[0].y);
    for (var i = 1, l = points.length; i < l; i++) {
        c.lineTo(points[i].x, points[i].y);
    }
    c.closePath();
    c.fill();
};


