function App(container) {
    this.container = container;
    this.settings = {};
    this.paths = [];
    this.sets = [];
    this.valorisations = [];
    this.sidestreams = [];
    this.streams = [];
    this.canvas = null;
    this.story = {};
    this.frame = 0;
    this.init();
    this.animate = {
        open: true,
        fps: 12
    }
}

App.prototype.init = function() {
    this.settings = new Settings(this);
    this.story = new Story(this);
    this.canvas = new Canvas(this);
    this.getSidestreams();
    this.getOutstreams();
    this.getPaths();
    this.getValorisations();
    // execute after valorisations and sidestreams are injected
    this.canvas.createSidestreamContent();
    // if that is done, we can set all the positions right
    this.canvas.setPositions();
    $(document).scrollTop(0);
    this.loaded();
};

App.prototype.redraw = function() {
    $('.valoriation-popup').remove();
    this.empty();
    this.init();

};

App.prototype.empty = function() {
    this.settings = new Settings(this);
    this.paths = [];
    this.sets = [];
    this.valorisations = [];
    this.sidestreams = [];
    this.streams = [];
};

App.prototype.getPaths = function() {
    var thisPaths;
    if (window.device > 1) {
        thisPaths = paths;
    } else if (window.device === 1){
        thisPaths = pathsTablet;
    } else {
        thisPaths = pathsMobile;
    }

    for (var i = 0, l = thisPaths.length; i < l; i++) {
        var path = thisPaths[i],
            model;
        switch (path.type) {
            case 'regular':
                model = new Path(this, path);
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
    $('.legend').empty(); // empty for a redraw
    for (var i = 0, l = sets.length; i < l; i++) {
        var set = sets[i],
            setModel = new Set(this, set);
        this.sets.push(setModel);
        for (var j = 0, jl = set.valorisations.length; j < jl; j++) {
            var valorisation = set.valorisations[j],
                valorisationModel = new Valorisation(this, setModel, valorisation);
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
    $('body').addClass('loaded');
};

App.prototype.scroll = function(frame) {
    var self = this;

    function scrollActions() {
        console.log("!");
        self.story.scroll(frame);
        self.canvas.scroll(frame);
        for (var i = 0, l = self.paths.length; i < l; i++) {
            var path = self.paths[i];
            path.scroll(frame);
        }
        self.frame = frame;
    }
    if (this.animate.open) {
        this.animate.open = false;
        window.requestAnimationFrame(scrollActions);
        setTimeout(function(){
            self.animate.open = true;
        }, (1000 /self.animate.fps))
    }


};

App.prototype.filter = function() {
    for (var j = 0, jl = this.valorisations.length; j < jl; j++) {
        var valorisation = this.valorisations[j];
        valorisation.update();
    }
};


