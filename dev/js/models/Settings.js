function Settings(app) {
    this.app = app;
    this.container =  this.measureContainer();
    this.stage = {
        x: 0,
        y: 0
    };
    this.path = {
        startTop: 0,
        endTop: -500,
        dash: 16,
        gap: 4,
        stroke: 2,
        left: 50
    };
    this.sidestream = {
        length: 300
    };
    this.graph = {
        startTop: 1200,
        endTop: 124,
        width: 600,
        height: 400
    }
}


Settings.prototype.measureContainer = function(canvases) {
    return {
        width: $(this.app.container).outerWidth(),
        height: $(this.app.container).outerHeight(),
        margin: 20
    }
};