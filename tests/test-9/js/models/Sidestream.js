function Sidestream(app, sidestream) {
    this.app = app;
    this.sidestream = sidestream;
    this.endPoint = this.getEndPoint(); // the part of the tube where the sidestream begins
    this.color = this.getColor();
}

Sidestream.prototype = Object.create(_NodeModel.prototype);


Sidestream.prototype.getEndPoint = function() {
    return this.app.settings.sidestream.sets[this.sidestream].startFrame;
};

Sidestream.prototype.getColor = function() {
    return this.app.settings.sidestream.sets[this.sidestream].color;
};
