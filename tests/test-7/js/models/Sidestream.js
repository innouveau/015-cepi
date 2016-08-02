function Sidestream(app, sidestream) {
    this.app = app;
    this.sidestream = sidestream;
    this.color = this.getColor();
}

Sidestream.prototype = Object.create(_NodeModel.prototype);

Sidestream.prototype.getColor = function() {
    var a = Math.random(),
        grey;
    if (a < this.app.settings.greyness) {
        grey = this.enlighten();
        return 'rgb(' + grey + ',' + grey + ',' + grey + ')';
    } else {
        return 'rgb(' + this.enlighten() + ',' + this.enlighten() + ',' + this.enlighten() + ')';
    }
};

Sidestream.prototype.enlighten = function() {
    return Math.round((1 + this.app.settings.lightness) * this.random(256));
};

// function rand(min, max) {
//     return min + Math.random() * (max - min);
// }
//
// function get_random_color() {
//     var h = rand(1, 360);
//     var s = rand(0, 100);
//     var l = rand(0, 100);
//     return 'hsl(' + h + ',' + s + '%,' + l + '%)';
// }

