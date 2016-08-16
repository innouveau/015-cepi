function Coverpath(app, parent) {
    this.app = app;
    this.parent = parent;
    this.element = this.create();
    this.set = [];
}

Coverpath.prototype = Object.create(_NodeModel.prototype);


Coverpath.prototype.create = function() {
    return this.parent.container.append('path').attr({
        'class': this.parent.name + '-sub-cover',
        'd': this.parent.points,
        'stroke': '#fff',
        'fill': 'none',
        'stroke-width': this.app.settings.path.stroke + 1
    });
};

Coverpath.prototype.init = function(set) {
    this.set = set;
    this.element.attr({
        'stroke-dasharray': set
    });
};

Coverpath.prototype.scroll = function(frame) {
    this.element.attr({
        'stroke-dashoffset': -3 * frame
    });
};