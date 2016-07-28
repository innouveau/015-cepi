function Canvas(parent, app, domElement, name) {
    this.parent = parent;
    this.app = app;
    this.name = name;
    this.domElement = domElement;
    this.ctx = domElement.getContext('2d');
    this.width = $(domElement).outerWidth();
    this.height = $(domElement).outerHeight();
    this.position = {x:0, y:0};
    this.elements = [];
    this.updated = true;
    this.animation = new Animation(app, this);
}

Canvas.prototype = Object.create(_NodeModel.prototype);

Canvas.prototype.injectElements = function(elements) {
    this.elements = elements;
};

Canvas.prototype.update = function() {
    this.clear();
    for (var i = 0, l = this.elements.length; i < l; i++) {
        var element = this.elements[i];
        element.draw();
    }
};  

Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
};


