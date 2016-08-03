function App(container) {
    this.container = container;
    this.settings = new Settings(this);
    this.canvases = [];
    this.paths = [];
    this.canvas = null;
}

App.prototype.init = function() {
    this.canvas = new Canvas(this);
    this.paths.push(
        new Path('pipeline', this, {x:20,y:20}, 'M0,0v404.068c0,11.597,9.435,21.03,21.031,21.03 c11.597,0,21.031-9.434,21.031-21.03V246.129c0-6.773,5.509-12.282,12.281-12.282s12.281,5.509,12.281,12.282v157.938 c0,11.596,9.434,21.03,21.03,21.03c11.597,0,21.03-9.435,21.03-21.03V267.646c0-6.773,5.51-12.282,12.282-12.282 c6.771,0,12.281,5.509,12.281,12.282v136.421c0,11.597,9.434,21.031,21.029,21.031c11.597,0,21.03-9.435,21.03-21.031V292.646 c0-6.773,5.51-12.282,12.282-12.282c6.771,0,12.279,5.509,12.279,12.282v111.422c0,11.596,9.435,21.03,21.031,21.03 s21.031-9.435,21.031-21.03v-82.94c0-6.772,5.509-12.281,12.281-12.281c6.771,0,12.28,5.509,12.28,12.281v82.94 c0,11.596,9.435,21.03,21.03,21.03s21.031-9.435,21.031-21.03v-57.94c0-6.772,5.509-12.281,12.28-12.281 c6.772,0,12.281,5.509,12.281,12.281v57.939c0,11.597,9.435,21.031,21.03,21.031c11.597,0,21.03-9.435,21.03-21.031v-32.939 c0-6.772,5.51-12.281,12.281-12.281c6.772,0,12.281,5.509,12.281,12.281v32.939c0,11.597,9.434,21.031,21.03,21.031H496')
    );
    this.gotoFrame(0);
    this.loaded();
};

App.prototype.loaded = function() {
    $(this.container).addClass('loaded');
};

App.prototype.gotoFrame = function(frame) {
    for (var i = 0, l = this.paths.length; i < l; i++) {
        var path = this.paths[i];
        path.animate(frame);
    }
};

App.prototype.setStage = function(x, y) {
    this.settings.stage.x = x;
    this.settings.stage.y = y;
};


