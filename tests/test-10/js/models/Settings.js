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
        length: 300,
        sets: [
            {
                name: '',
                color: 'rgb(0,0,0)',
                startFrame: 85
            }, {
                name: '',
                color: 'rgb(80,120,120)',
                startFrame: 173
            }, {
                name: '',
                color: 'rgb(140,140,80)',
                startFrame: 248
            }, {
                name: '',
                color: 'rgb(140,180,180)',
                startFrame: 314
            }, {
                name: '',
                color: 'rgb(200,240,200)',
                startFrame: 368
            }, {
                name: '',
                color: 'rgb(200,240,200)',
                startFrame: 415
            }, {
                name: '',
                color: 'rgb(200,200,200)',
                startFrame: 'end'
            }, {
                name: '',
                color: 'rgb(200,190,190)',
                startFrame: 'end'
            }, {
                name: '',
                color: 'rgb(240,220,220)',
                startFrame: 'end'
            }
        ]
    };
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