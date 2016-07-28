function Animation(app, canvas) {
    this.app = app;
    this.canvas = canvas;
    this.current = 0;
    this.end = 0; // animation duration
    this.break = false;
    this.running = false;
}


Animation.prototype.start = function(t, step) {
    this.current = 0;
    this.end = t;
    this.play(step);
};

Animation.prototype.play = function(step) {
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

    this.current += this.app.config.animation.frequency;
    if (this.current <= this.end) {
        for (var i = 0, l = this.canvas.elements.length; i < l; i++) {
            var element = this.canvas.elements[i];
            if (element.canAnimate) {
                if (element.stepBasedAnimation) {
                    element.setStep(step)
                } else {
                    element.animate(progress);
                }
            }
        }
        this.canvas.update();
        window.requestAnimationFrame(function() {
            self.play();
        });
    } else {
        this.running = false;
        this.canvas.updated = false;
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
            window.setTimeout(callback, 1000 / this.app.config.animation.frequency);
        };
})();
