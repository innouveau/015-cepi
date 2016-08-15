function App(container) {
    this.container = container;
    this.settings = new Settings(this);
    this.paths = [];
    this.valorisations = [];
    this.sidestreams = [];
    this.streams = [];
    this.canvas = null;
}

App.prototype.init = function() {
    this.canvas = new Canvas(this);
    this.getSidestreams();
    this.getOutstreams();
    this.getPaths();
    this.getValorisations();
    this.canvas.buildFilters();
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

App.prototype.filter = function() {
    var actives = [];
    for (var i = 0, l = this.sidestreams.length; i < l; i++) {
        var sidestream = this.sidestreams[i];
        if (sidestream.visible) {
            actives.push(sidestream);
        }
    }
    for (var j = 0, jl = this.valorisations.length; j < jl; j++) {
        var valorisation = this.valorisations[j];
        console.log(valorisation);
        if (valorisation.hasSidestream(actives)) {
            valorisation.show();
        } else {
            valorisation.hide();
        }
    }
};



