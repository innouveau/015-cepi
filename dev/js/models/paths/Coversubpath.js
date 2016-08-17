function CoverSubpath(app, parent) {
    this.app = app;
    this.parent = parent;
    this.element = this.create();
    this.set = [];
}

CoverSubpath.prototype = Object.create(_NodeModel.prototype);


CoverSubpath.prototype.create = function() {
    return this.parent.container.append('path').attr({
        'class': this.parent.name + '-sub-cover',
        'd': this.parent.points,
        'stroke': '#fff',
        'fill': 'none',
        'stroke-width': this.app.settings.path.stroke + 1
    });
};

CoverSubpath.prototype.init = function(set) {
    this.set = set;
    this.element.attr({
        'stroke-dasharray': set
    });
};

CoverSubpath.prototype.scroll = function(frame) {
    this.element.attr({
        'stroke-dashoffset': -3 * frame
    });
};