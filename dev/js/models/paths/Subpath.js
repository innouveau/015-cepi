function Subpath(app, parent, sidestream, index) {
    this.app = app;
    this.parent = parent;
    this.sidestream = sidestream;
    this.index = index;
    this.element = this.create();
    this.set = [];
}

Subpath.prototype = Object.create(_NodeModel.prototype);


Subpath.prototype.create = function() {
    return this.parent.container.append('path').attr({
        'class': this.parent.name + '-sub-' + this.index,
        'd': this.parent.points,
        'stroke': this.sidestream.color,
        'fill': 'none',
        'stroke-width': this.app.settings.properties.path.stroke
    });
};

Subpath.prototype.init = function(set) {
    this.set = set;
    this.element.attr({
        'stroke-dasharray': set
    });
};

Subpath.prototype.scroll = function(frame) {
    this.element.attr({
        'stroke-dashoffset': -frame
    });
};