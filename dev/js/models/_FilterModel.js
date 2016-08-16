function _FilterModel() {}

_FilterModel.prototype.toggle = function(){
    this.visible = !this.visible;
    if (!this.visible) {
        $(this.elements.display[0]).css('opacity', 0);
    } else {
        $(this.elements.display[0]).css('opacity', 1);
    }
    this.app.filter();
};