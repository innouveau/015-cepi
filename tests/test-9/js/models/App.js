function App(container) {
    this.container = container;
    this.settings = new Settings(this);
    this.state = new State(this, this.container);
    this.canvases = [];
    this.children = [];
}

App.prototype.init = function() {
    for (var i = 0; i < (this.settings.chunk.n + this.settings.chunk.staticElements); i++) {
        var staticElement = false;
        if (i >= this.settings.chunk.n) {
            staticElement = true;
        }
        this.children.push(new Chunk(this, i, staticElement));
    }
    this.gotoFrame(0);
    this.loaded();
};

App.prototype.loaded = function() {
    $(this.container).addClass('loaded');
};

App.prototype.gotoFrame = function(frame) {
    for (var i = 0, l = this.canvases.length; i < l; i++) {
        this.canvases[i].update(frame);
    }
};

App.prototype.setStage = function(x, y) {
    this.settings.stage.x = x;
    this.settings.stage.y = y;
};


