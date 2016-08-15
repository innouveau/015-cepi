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
    var color,
        stroke,
        subname;
    if (this.index > -1) {
        color = this.sidestream.color;
        stroke = this.app.settings.path.stroke;
        subname = this.index;
    } else {
        color = '#fff';
        stroke = this.app.settings.path.stroke + 1;
        subname = 'cover'
    }
    return this.parent.container.append('path').attr({
            'class': this.parent.name + '-sub-' + subname,
            'd': this.parent.points,
            'stroke': color,
            'fill': 'none',
            'stroke-width': stroke
        });
};

Subpath.prototype.init = function(set) {
    this.set = set;
    this.element.attr({
        'stroke-dasharray': set
    });
};

Subpath.prototype.scroll = function(frame) {
    var offset;
    if (this.index > -1) {
        offset = -frame;
    } else {
        offset = -3 * frame;
    }
    this.element.attr({
        'stroke-dashoffset': offset
    });
};