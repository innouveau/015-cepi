function Sidestream(app, sidestream) {
    this.app = app;
    this.sidestream = sidestream;
    this.color = this.getColor();
}

Sidestream.prototype = Object.create(_NodeModel.prototype);

Sidestream.prototype.getColor = function() {
    switch(this.sidestream) {
        case 0:
            return 'rgb(0,0,0)';
            break;
        case 1:
            return 'rgb(80,120,120)';
            break;
        case 2:
            return 'rgb(140,140,80)';
            break;
        case 3:
            return 'rgb(140,180,180)';
            break;
        case 4:
            return 'rgb(220,220,140)';
            break;
        case 5:
            return 'rgb(200,240,200)';
            break;
        // no sidestream
        case 6:
            return 'rgb(200,200,200)';
            break;
        case 7:
            return 'rgb(200,190,190)';
            break;
        case 8:
            return 'rgb(240,220,220)';
            break;
    }
};
