function Chapter(element, index) {
    this.element = element;
    this.index = index;
    this.height = $(element).outerHeight();
    this.top = this.getTop();
    this.bottom = this.top + this.height;
}

Chapter.prototype.show = function() {
    $(this.element).css('opacity', 1);
};

Chapter.prototype.hide = function() {
    $(this.element).css('opacity', 0);
};

Chapter.prototype.getProgres = function(scroll) {
    return (scroll - this.top) / (this.bottom - this.top);
};


Chapter.prototype.getTop = function() {
    var top = 0;
    $(this.element).prevAll().each(function(){
        top += $(this).outerHeight();
    });
    return top;
};