function Arc(app, parent, parentElement, sidestream, arc) {
    this.app = app;
    this.parent = parent;
    this.parentElement = parentElement;
    this.sidestream = sidestream;
    this.arc = arc;
    this.element = this.create();
}

Arc.prototype = Object.create(_NodeModel.prototype);


Arc.prototype.create = function() {
    return this.parentElement .append('path').attr({
        'class': 'radar-part',
        'd': this.arc,
        'fill': this.sidestream.color
    });
};

