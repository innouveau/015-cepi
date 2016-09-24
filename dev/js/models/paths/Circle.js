function Circle(app, parent, parentElement, r, centerPoint) {
    this.app = app;
    this.parent = parent;
    this.parentElement = parentElement;
    this.r = r;
    this.centerPoint = centerPoint;
    this.element = this.getElement();
    this.length = 2 * r * Math.PI;
}

Circle.prototype = Object.create(_NodeModel.prototype);

Circle.prototype.getElement = function() {
    var g = this.parentElement.append('g').attr({
        class: 'circle-set'
    });
    return g;
};

Circle.prototype.updateSubCircles = function(liveSidestreams) {
    var gap,
        length,
        l = liveSidestreams.length;
    this.element.selectAll("*").remove();
    if (l === 1) {
        this.element.append('circle').attr({
            r: this.r,
            stroke: liveSidestreams[0].color,
            fill: 'none',
            'stroke-width': 2
        });
    } else {
        gap = (125 / this.r);
        length = (360 - gap * l) / l;
        for (var i = 0; i < l; i++) {
            var liveSidestream = liveSidestreams[i],
                start = i * (length + gap) + 0.5 * gap,
                startAngle = start * (Math.PI / 180),
                endAngle = (start + length) * (Math.PI / 180),
                arc = d3.svg.arc().innerRadius(this.r).outerRadius(this.r + this.app.settings.properties.path.stroke).startAngle(startAngle).endAngle(endAngle);
            new Arc(this.app, this, this.element, liveSidestream, arc);
        }
    }
};

