function Path(path) {
    this.app = app;
    this.type = path.type;
    this.points = path.points;
    this.name = path.name;
    this.sidestreams = path.sidestreams;
    this.animationStart = path.animationStart;
    this.cover = path.cover;
    this.dash = path.dash;
    this.gap = path.gap;
    this.container = null;
    this.subpaths = [];
    this.coversubPath = null;
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
    var cont;
    if (this.name === 'raw') {
        cont = 'raw';
    } else {
        cont = 'paths';
    }
    this.container = this.app.canvas[cont].append('g').attr({
        class: this.name
    });
    for (var i = 0, l = this.sidestreams.length; i < l; i++) {
        var stream = this.app.streams[this.sidestreams[i]];
        this.subpaths.push(new Subpath(this.app, this, stream, i));
    }
    if (this.cover) {
        this.coversubPath = new CoverSubpath(this.app, this);
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
    if (this.cover) {
        this.coversubPath.init([this.settings.length, 1000 * this.settings.length]);
    }
};

Path.prototype.scroll = function(frame) {
    for (var i = 0, l = this.subpaths.length; i < l; i++) {
        var subpath = this.subpaths[i];
        subpath.scroll(frame);
    }
    var delta = frame - this.animationStart;
    if (delta < 0) {
        delta = 0;
    }
    if (this.cover) {
        this.coversubPath.scroll(delta);
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