function App(container) {
    this.container = container;
    this.settings = new Settings(this);
    this.canvases = [];
    this.paths = [];
    this.valorisations = [];
    this.streams = [];
    this.canvas = null;
}

App.prototype.init = function() {
    this.canvas = new Canvas(this);
    this.getSidestreams();
    this.getOutstreams();
    this.getPaths();
    this.getValorisations();
    this.loaded();
};

App.prototype.getPaths = function() {
    for (var i = 0, l = paths.length; i < l; i++) {
        var path = paths[i];
        this.paths.push(
            new Path(this, path)
        );
    }
};

App.prototype.getValorisations = function() {
    for (var i = 0, l = valorisations.length; i < l; i++) {
        var valorisation = valorisations[i];
        this.valorisations.push(
            new Valorisation(this, valorisation)
        );
    }
};

App.prototype.getSidestreams = function() {
    for (var i = 0, l = sidestreams.length; i < l; i++) {
        var sidestream = sidestreams[i];
        this.streams.push(
            new Sidestream(this, sidestream)
        );
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

App.prototype.loaded = function() {
    $(this.container).addClass('loaded');
};

App.prototype.scroll = function(frame) {
    this.canvas.scroll(frame);
    for (var i = 0, l = this.paths.length; i < l; i++) {
        var path = this.paths[i];
        path.scroll(frame);
    }
};



