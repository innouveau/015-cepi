function Static(name, path) {
    this.app = app;
    this.type = path.type;
    this.points = path.points;
    this.name = path.name;
    this.container = null;
    this.path = null;
    this.build();
    this.length = 0;
}

Static.prototype.build = function() {
    this.container = this.app.canvas.layers.top.static.append('g').attr({
        class: this.name
    });
    this.container.append('path').attr({
        'class': this.name,
        'd': this.points,
        'stroke': '#D6D6D6',
        'fill': 'none',
        'stroke-width': this.app.settings.path.stroke 
    });
};