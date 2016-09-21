function Settings(app) {
    this.app = app;
    this.device = null;
    this.container = {};
    this.properties = {
        path: {
            stroke: 2
        },
        radar: {
            r: 30, // to prevent a valorisation radar to overlap the graph (when value 1 or 10), this value should be < this.bottomFrame.height / 10
            gap: 3
        },
        story: {
            margin: 15
        }
    };
    this.typography = {
        lineHeight: 15
    };
    this.animation = {
        valorisation: 750,
        popup: 200,
        showBottomFrame: 1000,
        hideTopFrame: 1000,
        labelFade: 500,
        radar: 500
    };
    this.timing = {
        sidestreamBars: [100, 220, 340, 460, 580, 700],
        story: {
            wait: 1500
        },
        disclaimer: 2000,
        topFrame: {
            origin: [60, 180], // [x,y]
            transitions: [
                {
                    start: 100,
                    end: 1500,
                    origin: 180, // keep this one the same as origin[1]
                    destination: -150 
                },
                {
                    start: 2000,
                    end: 2400,
                    origin: -150, // keep this on the same as previous destination
                    destination: -500
                }
            ]
        },
        bottomFrame: {
            origin: [60, 2000],
            transitions: [
                {
                    start: 1200,
                    end: 2000,
                    origin: 1600,
                    destination: 430
                },
                {
                    start: 2000,
                    end: 2400,
                    origin: 430,
                    destination: 100
                }
            ]
        },
        sidestreamLabels: {
            origin: [84, 1600],
            transitions: [
                {
                    start: 300,
                    end: 1500,
                    origin: 1600,
                    destination: 390
                },
                {
                    start: 2000,
                    end: 2400,
                    origin: 390,
                    destination: 70
                }
            ]
        }
    };
    this.sizes = {};
    this.graph = {};
    this.addWindowListener();
    this.measure();
}

Settings.prototype.getGraph = function() {
    switch (this.device) {
        case 0: // mobile  sizing set:
        case 1: // tablet portrait sizing set:
        case 2: // tablet landscape sizing set:
            return {
                width: 630,
                height: 320,
                margin: 10
            };
        case 3: // desktop sizing set:
            return {
                width: 630,
                height: 320,
                margin: 20
            };
    }
};

Settings.prototype.getSizes = function() {
    switch (this.device) {
        case 0: // mobile  sizing set:
        case 1: // tablet portrait sizing set:
        case 2: // tablet landscape sizing set:
            return {
                artboard: [40,0],
                topFrame: this.timing.topFrame.origin,
                rawLabel: [170,70],
                profitLabel: [628,240],
                sidestreamLabel: [420,470],
                productionLabel: [220,258],
                bottomFrame: this.timing.bottomFrame.origin,
                graphHeaderText: [0, 80],
                filterSidestreams: [24,20],
                graphBody: [0,160],
                sidestreamLabels: this.timing.sidestreamLabels.origin
            };
        case 3: // desktop sizing set:
            return {
                artboard: [60,0],
                topFrame: this.timing.topFrame.origin,
                rawLabel: [170,70],
                profitLabel: [628,240],
                sidestreamLabel: [520,470],
                productionLabel: [220,258],
                bottomFrame: this.timing.bottomFrame.origin,
                graphHeaderText: [0, 100], 
                filterSidestreams: [24,20],
                graphBody: [0,180],
                sidestreamLabels: this.timing.sidestreamLabels.origin
            };
    }
};

Settings.prototype.addWindowListener = function() {
    var self = this;
    $(window).resize(function(){
        self.measure();
    });
};

Settings.prototype.measure = function() {
    this.container = this.measureContainer();
    this.sizes = this.getSizes();
    this.graph = this.getGraph();
    if (this.app.canvas && this.app.canvas.drawn) {
        this.app.redraw();
    }
};


Settings.prototype.measureContainer = function() {
    var width = $(this.app.container).outerWidth(),
        height = $(this.app.container).outerHeight();
    if (width < 700) {
        this.device = 0; // smartphone
    } else if (width < 768) {
        this.device = 1; // tablet portrait
    } else if (width < 1024) {
        this.device = 2; // table landscape
    } else {
        this.device = 3; // desktop
    }
    return {
        width: width,
        height: height,
        margin: 20
    }
};