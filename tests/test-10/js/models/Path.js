function Path(name, app, position, points) {
    this.app = app;
    this.points = points;
    this.position = position;
    this.name = name;
    this.container = null;
    this.elements = [];
    this.settings = {
        length: 0,
        dashes: 0
    };
    this.build();
    this.init();
    this.sets = this.intialSets();
    this.assignDashes();

}

Path.prototype = Object.create(_NodeModel.prototype);


Path.prototype.init = function() {
    this.settings.length = this.elements[0].d3Element[0][0].getTotalLength();
    this.settings.dashes = Math.ceil(this.settings.length / this.app.settings.path.dash)
};

Path.prototype.build = function() {
    this.container = this.app.canvas.element.append('g').attr({
        class: this.name,
        transform: 'translate(' + this.position.x + ',' + this.position.y + ')'
    });
    for (var i = 0, l = this.app.settings.sidestream.sets.length; i < l; i++) {
        this.buildElement(i);
    }
};

Path.prototype.buildElement = function(i) {
    var strokeArray = this.getStrokeArray(0),
        sidestream = this.app.settings.sidestream.sets[i],
        d3Element = this.container.append('path').attr({
            'class': this.name + '-sub-' + i,
            'd': this.points,
            'stroke': sidestream.color,
            'fill': 'none',
            'stroke-width': this.app.settings.path.stroke
        });
    this.elements.push({
        d3Element: d3Element,
        sidestream: sidestream
    })
};

Path.prototype.assignDashes = function() {
    for (var i = 0, l = this.app.settings.sidestream.sets.length; i < l; i++) {
        this.elements[i].d3Element.attr({
            'stroke-dasharray': this.sets[i]
        });
    }
};

Path.prototype.animate = function(frame) {
    // var x = frame % (this.app.settings.path.dash * 5);
    // for (var i = 0, l = this.elements.length; i < l; i++) {
    //     var strokeArray = this.getStrokeArray(x);
    //     this.elements[i].d3Element.attr({
    //         'stroke-dasharray': strokeArray
    //     })
    // }

};

Path.prototype.intialSets = function() {
    var sets = [[],[],[],[],[],[]],
        steps = Math.ceil(this.settings.length / this.app.settings.path.dash),
        gap,
        hit;

    for (var i = 0; i < steps; i++) {
        if (i % 2 === 0) {
            gap = true;
            hit = -1;
        } else {
            gap = false;
            hit = this.random(6);
        }


        for (var j = 0, jl = sets.length; j < jl; j++) {
            if (gap || j !== hit) {
                sets[j].push(false)
            } else {
                sets[j].push(true);
            }
        }
    }
    return this.setsToStrokeArray(sets);
};

Path.prototype.setsToStrokeArray = function(sets) {
    var newSets = [[],[],[],[],[],[]];
    for (var i = 0, l = sets.length; i < l; i++) {
        var set = sets[i],
            newSet = newSets[i];
        for (var j = 0, jl = set.length; j < jl; j++) {
            var entry = set[j];
            if ((entry && newSet[newSet.length - 1] !== 0) || newSet.length === 0) {
                newSet.push(this.app.settings.path.dash);
                newSet.push(0);
            } else {
                newSet[newSet.length - 1] += this.app.settings.path.dash;
            }

        }
    }
    return newSets;
};


Path.prototype.getStrokeArray = function(x) {
    var set = [];
    for (var i = 0; i < this.settings.dashes; i++) {
        set.push(
            (5 * this.app.settings.path.dash),
            this.app.settings.path.dash
        );
    }
    set.unshift((x));
    return set;
};