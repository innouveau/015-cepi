function Path(name, sidestream, app, position, dash, gap, points) {
    this.app = app;
    this.points = points;
    this.position = position;
    this.name = name;
    this.sidestreams = sidestream;
    this.dash = dash;
    this.gap = gap;
    this.container = null;
    this.subpaths = [];
    this.settings = {
        length: 0,
        dashes: 0
    };

    this.build();
    this.measure();
    this.sets = this.intialSets();
    this.assignDashes();
}

Path.prototype = Object.create(_NodeModel.prototype);

Path.prototype.build = function() {
    this.container = this.app.canvas.element.append('g').attr({
        class: this.name,
        transform: 'translate(' + this.position.x + ',' + this.position.y + ')'
    });
    for (var i = 0, l = this.sidestreams.length; i < l; i++) {
        var sidestream = this.app.settings.sidestream.sets[this.sidestreams[i]];
        this.subpaths.push(new Subpath(this.app, this, sidestream, i));
    }
};

Path.prototype.measure = function() {
    this.settings.length = this.subpaths[0].element[0][0].getTotalLength();
    this.settings.dashes = Math.ceil(this.settings.length / this.dash)
};


Path.prototype.assignDashes = function() {
    for (var i = 0, l = this.subpaths.length; i < l; i++) {
        this.subpaths[i].init(this.sets[i]);
    }
};

Path.prototype.scroll = function(frame) {
    for (var i = 0, l = this.subpaths.length; i < l; i ++) {
        var subpath = this.subpaths[i];
        subpath.scroll(frame);
    }
};

Path.prototype.intialSets = function() {
    var set = [],
        steps = Math.ceil(this.settings.length / (this.dash + this.gap)),
        hit;
    for (var i = 0; i < steps; i++) {
        hit = this.random(this.sidestreams.length);
        set.push(hit);
    }
    return this.setsToStrokeArray(set);
};

Path.prototype.setsToStrokeArray = function(set) {
    var newSets = [];
    for (var i = 0, l = set.length; i < l; i++) {
        var hit = set[i];
        for (var j = 0, jl = this.sidestreams.length; j < jl; j++) {
            if (!newSets[j]) {
                // create the dash-array, start with a dash and a gap
                // (because it is impossible to start with a gap)
                newSets.push([this.dash, this.gap]);
            }
            var newSet = newSets[j];
            if (hit === j) {
                // add a dash and a gap
                newSet.push(this.dash);
                newSet.push(this.gap);
            } else {
                // make the existing gap longer
                newSet[newSet.length - 1] += (this.dash + this.gap);
            }
        }
    }
    return newSets;
};