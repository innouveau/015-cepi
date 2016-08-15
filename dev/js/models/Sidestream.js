function Sidestream(app, sidestream) {
    this.type = 'sidestream';
    this.app = app;
    this.color = sidestream.color;
    this.name = sidestream.name;
    this.visible = true;
    this.elements = [];
}

Sidestream.prototype.toggle = function(){
    this.visible = !this.visible;
    if (!this.visible) {
        $(this.elements.display[0]).css('opacity', 0);
    } else {
        $(this.elements.display[0]).css('opacity', 1);
    }
    this.app.filter();
};
