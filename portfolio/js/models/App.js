function App(container) {
    this.container = container;
    this.settings = {};
    this.paths = [];
    this.sidestreams = [];
    this.streams = [];
    this.canvas = null;
    this.selection = null;
    this.timer = null;
    this.init();
}

App.prototype.init = function() {
    $('html').scrollTop(0);
    this.settings = new Settings(this);
    this.canvas = new Canvas(this);
    this.getSidestreams();
    this.getOutstreams();
    this.getPaths();
    this.selection = d3.selectAll('.sub-path');
    this.play();
};

App.prototype.empty = function() {
    this.settings = new Settings(this);
    this.paths = [];
    this.sidestreams = [];
    this.streams = [];
};

App.prototype.getPaths = function() {
    for (var i = 0, l = paths.length; i < l; i++) {
        var path = paths[i],
            model = new Path(this, path);
        this.paths.push(model);
    }
};


App.prototype.getSidestreams = function() {
    for (var i = 0, l = sidestreams.length; i < l; i++) {
        var sidestream = sidestreams[i],
            model = new Sidestream(this, sidestream);
        this.streams.push(model);
        this.sidestreams.push(model);
    }
};

App.prototype.getOutstreams = function() {
    for (var i = 0, l = outstreams.length; i < l; i++) {
        var outstream = outstreams[i];
        this.streams.push(
            new Outstream(this, outstream)
        );
    }
};

App.prototype.play = function() {
    var self = this,
        i = 0;
    this.timer = setInterval(function(){
        self.selection.attr({
            'stroke-dashoffset': 0.75 * i
        });
        i++;
    }, 20);
};

App.prototype.stop = function() {
    clearInterval(this.timer);
};