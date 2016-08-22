function Settings(app) {
    this.app = app;
    this.container =  this.measureContainer();
    this.topFrame = {
        positions: [-120, 100, 200, 350, 500, 900],
        left: 50
    };
    this.path = {
        stroke: 2
    };
    this.bottomFrame = {
        marginTop: 150,
        startTop: 1200,
        startFrame: 1900,
        endFrame: 2100,
        endTop: 20,
        left: 30,
        width: 600,
        height: 250,
        margin: 10
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
        top: 90,
        left: 15,
        setWidth: 100,
        labelsTop: 620 // the top position of the labels next to each sidestream
    };
    this.filterValorisations = {
        top: 140,
        left: 664,
        setHeight: 30,
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
        gap: 3
    }
}


Settings.prototype.measureContainer = function(canvases) {
    return {
        width: $(this.app.container).outerWidth(),
        height: $(this.app.container).outerHeight(),
        margin: 20
    }
};