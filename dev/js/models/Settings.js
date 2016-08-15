function Settings(app) {
    this.app = app;
    this.container =  this.measureContainer();
    this.path = {
        startTop: 0,
        endTop: -500,
        startFrame: 300,
        endFrame: 900,
        dash: 16,
        gap: 4,
        stroke: 2,
        left: 50
    };
    this.sidestream = {
        length: 300
    };
    this.graph = {
        marginTop: 100,
        startTop: 1200,
        startFrame: 600,
        endFrame: 1200,
        endTop: 140,
        left: 30,
        width: 600,
        height: 400,
        margin: 10
    };
    this.valorisation = {
        fade: 1500
    };
}


Settings.prototype.measureContainer = function(canvases) {
    return {
        width: $(this.app.container).outerWidth(),
        height: $(this.app.container).outerHeight(),
        margin: 20
    }
};