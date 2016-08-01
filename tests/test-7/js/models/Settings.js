function Settings(app) {
    this.app = app;
    this.pixelRatio = this.getPixelRatio();
    this.container =  this.measureContainer();
    this.chunk =  {
        n: 8,
        staticElements: 0,
        width: 80,
        height: 80,
        margin: 40
    };
    this.snippet = {
            n: 250,
            size: 10,
            corners: 3,
            speed: 5
        };
    this.greyness = 0.9;
    this.lightness = 0.3;
    this.animation = {
        frequency: (1000 / 20)
    };
    this.typography = {
        title: {
            font: '14px Arial',
            color: '#000'
        }
    };
    this.path = new Path(this.snippet.speed);
}

Settings.prototype.getPixelRatio = function() {
    // see: http://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
};

Settings.prototype.measureContainer = function(canvases) {
    return {
        width: $(this.app.container).outerWidth(),
        height: $(this.app.container).outerHeight()
    }
};