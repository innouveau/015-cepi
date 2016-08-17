function Settings(app) {
    this.app = app;
    this.container =  this.measureContainer();
    this.path = {
        startTop: 0,
        endTop: -740,
        startFrame: 1100,
        endFrame: 1400,
        dash: 16,
        gap: 4,
        stroke: 2,
        left: 50
    };
    this.graph = {
        marginTop: 150,
        startTop: 1200,
        startFrame: 1100,
        endFrame: 1400,
        endTop: 30,
        left: 30,
        width: 600,
        height: 400,
        margin: 10
    };
    this.valorisation = {
        fade: 1500
    };
    this.filterSidestreams = {
        top: 90,
        left: 15,
        setWidth: 100,
        labelsTop: 620 // the top position of the labels next to each sidestream
    };
    this.filterValorisations = {
        top: 140,
        left: 640,
        setHeight: 30,
        color: '#ddd'
    };
    this.labels = {
        raw : {
            left: 170,
            top: 70
        },
        profit : {
            left: 800,
            top: 370
        },
        sidestream : {
            left: 520,
            top: 700
        }
    }
}


Settings.prototype.measureContainer = function(canvases) {
    return {
        width: $(this.app.container).outerWidth(),
        height: $(this.app.container).outerHeight(),
        margin: 20
    }
};