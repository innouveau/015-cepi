function Canvas(element, app) {
    this.app = app;
    this.ctx = element.getContext('2d');
    this.width = $(element).outerWidth();
    this.height = $(element).outerHeight();
    this.margin = 20;
}

Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
};


Canvas.prototype.draw = function() {
    this.clear();
    for (var i = 0, l = this.app.chunks.length; i < l; i++) {
        var chunk = this.app.chunks[i];
        for (var j = 0, jl = chunk.snippets.length; j < jl; j++) {
            var snippet = chunk.snippets[j];
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

Canvas.prototype.getRandomPosition = function() {
    return {
        x: this.margin + this.app.random(this.width - 2 * this.margin),
        y: this.margin + this.app.random(this.height - 2 * this.margin)
    }
};

Canvas.prototype.getRandomPositionInCircle = function() {
    var radius = this.width / 2 - this.margin,
        pt_angle = Math.random() * 2 * Math.PI,
        pt_radius_sq = Math.random() * radius * radius,
        x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle) + this.margin + radius,
        y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle) + this.margin + radius;
    return {
        x: x,
        y: y
    }
};


