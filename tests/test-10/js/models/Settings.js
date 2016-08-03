function Settings(app) {
    this.app = app;
    this.pixelRatio = this.getPixelRatio();
    this.container =  this.measureContainer();
    this.stage = {
        x: 0,
        y: 0
    };
    this.path = {
        dash: 5,
        stroke: 1.5
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
            }
            // }, {
            //     name: '',
            //     color: 'rgb(200,200,200)',
            //     startFrame: 'end'
            // }, {
            //     name: '',
            //     color: 'rgb(200,190,190)',
            //     startFrame: 'end'
            // }, {
            //     name: '',
            //     color: 'rgb(240,220,220)',
            //     startFrame: 'end'
            // }
        ]
    };
    this.grid = {
        width: 400,
        height: 400,
        position: {
            x: 200,
            y: 1000
        }
    };
    this.greyness = 0.9;
    this.lightness = 0.3;
    this.animation = {
        frequency: (1000 / 20),
        snippetsPerFrame: 4
    };
    this.typography = {
        title: {
            font: '14px Arial',
            color: '#000'
        }
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