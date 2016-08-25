function Settings(app) {
    this.app = app;
    this.container =  this.measureContainer();
    this.topFrame = {
        positions: [-120, 100, 200, 350, 500, 710],
        left: 60
    };
    this.path = {
        stroke: 2
    };
    this.bottomFrame = {
        marginTop: 100,
        startTop: 1200,
        startFrame: 1900,
        endFrame: 2100,
        endTop: 60,
        left: 60,
        width: 630,
        height: 320,
        margin: 20
    };
    this.typography = {
        lineHeight: 15
    };
    this.animation = {
        valorisation: 1000,
        popup: 200,
        showBottomFrame: 1000,
        hideTopFrame: 1000,
        labelFade: 500
    };
    this.filterSidestreams = {
        top: 0,
        left: 0,
        setWidth: 100,
        labelsTop: 620 // the top position of the labels next to each sidestream
    };
    this.filterValorisations = {
        top: 100,
        left: 650,
        setHeight: 20,
        color: '#ddd'
    };
    this.labels = {
        raw : {
            left: 170,
            top: 70
        },
        profit : {
            left: 628,
            top: 340
        },
        sidestream : {
            left: 520,
            top: 700
        }
    };
    this.radar = {
        r: 40,
        gap: 3,
        animation: 500
    }
}


Settings.prototype.measureContainer = function(canvases) {
    return {
        width: $(this.app.container).outerWidth(),
        height: $(this.app.container).outerHeight(),
        margin: 20
    }
};