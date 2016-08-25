function App(container) {
    this.container = container;
    this.settings = new Settings(this);
    this.paths = [];
    this.sets = [];
    this.valorisations = [];
    this.sidestreams = [];
    this.streams = [];
    this.canvas = null;
    this.story = new Story(this);
    this.disclaimerShowed = true;
}

App.prototype.init = function() {
    this.canvas = new Canvas(this);
    this.getSidestreams();
    this.getOutstreams();
    this.getPaths();
    this.getValorisations();
    this.canvas.buildFilters(); // execute after valorisations and sidestreams are injected
    this.loaded();
};

App.prototype.getPaths = function() {
    for (var i = 0, l = paths.length; i < l; i++) {
        var path = paths[i],
            model;
        switch (path.type) {
            case 'regular':
                model = new Path(path);
                this.paths.push(model);
                break;
            case 'static':
                model = new Static(this, path);
                break;
            case 'cover':
                model = new Cover(this, path);
                this.paths.push(model);
                break;
        }
    }
};

App.prototype.getValorisations = function() {
    for (var i = 0, l = sets.length; i < l; i++) {
        var set = sets[i],
            setModel = new Set(this, set);
        this.sets.push(setModel);
        for (var j = 0, jl = set.valorisations.length; j < jl; j++) {
            var valorisation = set.valorisations[j],
                valorisationModel = new Valorisation(this, valorisation);
            this.valorisations.push(valorisationModel);
            setModel.children.push(valorisationModel);
        }
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
    this.story.scroll(frame);
    this.canvas.scroll(frame);
    for (var i = 0, l = this.paths.length; i < l; i++) {
        var path = this.paths[i];
        path.scroll(frame);
    }
};

App.prototype.filter = function() {
    for (var j = 0, jl = this.valorisations.length; j < jl; j++) {
        var valorisation = this.valorisations[j];
        valorisation.update();
    }
};


