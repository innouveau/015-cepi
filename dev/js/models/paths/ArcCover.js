function ArcCover(app, parent) {
    this.app = app;
    this.parent = parent;
    this.arc = this.getArc();
    this.element = this.build();
}

ArcCover.prototype.getArc = function() {
    return d3.svg.arc().innerRadius(0).outerRadius(this.app.settings.radar.r / 1.7).startAngle(0);
};

ArcCover.prototype.build = function() {
    return this.parent.element.append('path').datum({
        endAngle: 0
    }).attr({
        'class': 'radar-cover',
        'd': this.arc,
        'fill': '#fff'
    });
};

ArcCover.prototype.close = function() {
    this.element.transition().duration(this.app.settings.radar.animation).attrTween('d', this.arcTween(2 * Math.PI));
};

ArcCover.prototype.open = function() {
    var element = this.element;
    element.transition().duration(this.app.settings.radar.animation).attrTween('d', this.arcTween(0));
};

// https://bl.ocks.org/mbostock/5100636
ArcCover.prototype.arcTween = function(newAngle) {
    var self = this;
    return function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
            d.endAngle = interpolate(t);
            return self.arc(d);
        };
    };
};