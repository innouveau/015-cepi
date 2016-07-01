function Animation(app, canvas, config) {
    this.app = app;
    this.canvas = canvas;
    this.config = config;
    this.current = 0;
    this.end = 0; // animation duration
    this.elements = []; // elements involved in this animation
    this.break = false;
    this.running = false;
}


Animation.prototype.start = function(elements, t) {
    this.current = 0;
    this.end = t;
    this.elements = elements;
    this.play();
};

Animation.prototype.play = function() {
    var self = this,
        progress = this.current / this.end;
    if (this.end === 0) {
        console.log('No current animation set');
        return;
    }
    this.running = true;
    if (this.break) {
        this.break = false;
        return;
    }

    this.current += this.config.animation.frequency;
    if (this.current < this.end) {
        for (var i = 0, l = this.elements.length; i < l; i++) {
            var element = this.elements[i];
            element.animate(progress);
        }
        this.canvas.draw();
        window.requestAnimationFrame(function() {
            self.play();
        });
    } else {
        this.running = false;
    }
};

Animation.prototype.pause = function() {
    if (this.running) {
        this.break = true;
        this.running = false;
    }
};

Animation.prototype.kill = function() {
    if (this.running) {
        this.break = true;
        this.running = false;
        this.current = 0;
        this.end = 0;
    }
};

window.requestAnimationFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / this.config.animation.frequency);
        };
})();
