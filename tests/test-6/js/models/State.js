function State(app, element) {
    this.app = app;
    this.element = element;

    this.valid = false;
    this.dragging = false;
    this.selection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;
    this.elements = app.children;

    this.setProperties(element);

    var self = this;

    element.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    // Up, down, and move are for dragging

    element.addEventListener('mousedown', function(e) {
        var mouse = self.getMouse(e),
            mx = mouse.x,
            my = mouse.y,
            elements = self.elements,
            l = elements.length;
        for (var i = l - 1; i >= 0; i--) {
            if (elements[i].contains(mx, my)) {
                var element = elements[i];
                element.click();
                return;
            }
        }
    }, true);

    element.addEventListener('mousemove', function(e) {
        var mouse = self.getMouse(e),
            mx = mouse.x,
            my = mouse.y,
            elements = self.elements,
            l = elements.length;
        for (var i = l - 1; i >= 0; i--) {
            if (elements[i].contains(mx, my)) {
                var element = elements[i];
                element.hover();
                self.hover();
                return;
            }
        }
        self.mouseout();
    }, true);

    element.addEventListener('mouseup', function(e) {
        self.dragging = false;
    }, true);
}


State.prototype.getMouse = function(e) {
    var element = this.element,
        offsetX = 0,
        offsetY = 0,
        mx,
        my;

    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
};

State.prototype.setProperties = function(element) {
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop, html;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(element, null)['paddingLeft'], 10)      || 0;
        this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(element, null)['paddingTop'], 10)       || 0;
        this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(element, null)['borderLeftWidth'], 10)  || 0;
        this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(element, null)['borderTopWidth'], 10)   || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;
};

State.prototype.hover = function() {
    this.element.style.cursor = 'pointer';
};

State.prototype.mouseout = function() {
    this.element.style.cursor = 'default';
};