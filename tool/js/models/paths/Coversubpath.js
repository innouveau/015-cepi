function CoverSubpath(app, parent) {
    this.app = app;
    this.parent = parent;
    this.animationStart = parent.animationStart;
    this.element = this.create();
}

CoverSubpath.prototype = Object.create(_NodeModel.prototype);


CoverSubpath.prototype.create = function() {
    return this.parent.container.append('path').attr({
        'data-animation-start': this.animationStart,
        'class': this.parent.name + '-sub-cover cover-sub-path',
        'd': this.parent.points,
        'stroke': '#fff',
        'fill': 'none',
        'stroke-width': this.app.settings.properties.path.stroke + 1
    });
};

CoverSubpath.prototype.init = function(set) {
    this.element.attr({
        'stroke-dasharray': set
    });
};