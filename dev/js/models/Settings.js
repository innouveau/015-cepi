function Settings(app) {
    this.app = app;
    this.pixelRatio = this.getPixelRatio();
    this.container =  this.measureContainer();
    this.stage = {
        x: 0,
        y: 0
    };
    this.path = {
        dash: 16,
        gap: 4,
        stroke: 2
    };
    this.sidestream = {
        length: 300
    };
    this.graph = {
        top: 680,
        width: 600,
        height: 400
    }
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
        height: $(this.app.container).outerHeight(),
        margin: 20
    }
};