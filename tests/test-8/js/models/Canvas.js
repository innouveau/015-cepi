function Canvas(parent, app, staticElement, name) {
    this.parent = parent;
    this.app = app;
    this.name = name;
    this.staticElement = staticElement;
    this.domElement = this.create();
    this.ctx = this.domElement.getContext('2d');
    this.elements = [];
    this.updated = true;
    this.animation = new Animation(app, this);
}

Canvas.prototype.injectElements = function(elements) {
    this.elements = elements;
};

Canvas.prototype.update = function(frame) {
    if (!this.staticElement) {
        this.clear();
        for (var i = 0, l = this.elements.length; i < l; i++) {
            var element = this.elements[i];
            if (element.animate) {
                element.animate(frame);
            }
        }
    }
};  

Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.app.settings.container.width, this.app.settings.container.height);
};

Canvas.prototype.create = function() {
    var canvas = document.createElement('CANVAS'),
        pixelRatio = this.app.settings.pixelRatio;
    canvas.width = this.app.settings.container.width * pixelRatio;
    canvas.height = this.app.settings.container.height * pixelRatio;
    canvas.style.width = this.app.settings.container.width + 'px';
    canvas.style.height = this.app.settings.container.height + 'px';
    canvas.getContext('2d').setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    this.app.container.appendChild(canvas);
    return canvas;
};


