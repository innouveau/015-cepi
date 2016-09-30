function Animation(app) {
    this.app = app;
    this.fps = 6;
    this.frame = {
        last: 0,
        current: 0
    };
    this.timer = null;
    this.freq = 0;
    this.t = 100;
    this.open = true;
    this.init();

}

Animation.prototype.init = function() {
    this.freq = this.t / this.fps;
};

Animation.prototype.askfor = function(frame) {
    this.direct(frame);
};

Animation.prototype.animate = function(frame) {
    var usedFps,
        self = this,
        jump,
        i = 0,
        delta = Math.abs(frame - this.frame.current);

    if (delta > 0) {
        // do faster animation for small scrolls
        if (delta < 50) {
            usedFps = this.fps * delta / 50
        } else {
            usedFps = this.fps
        }

        clearInterval(self.timer);
        this.frame.last = this.frame.current;
        jump = (frame - this.frame.last) / usedFps;


        this.timer = setInterval(function () {
            self.frame.current += jump;
            self.indirect(Math.round(self.frame.current));
            i++;
            if (i === self.fps) {
                clearInterval(self.timer);
                self.frame.last = self.frame.current;
            }
        }, this.freq);
    }
};

Animation.prototype.direct = function(frame) {
    this.app.story.scroll(frame);
    this.app.canvas.scroll(frame);
    for (var i = 0, l = this.app.paths.length; i < l; i++) {
        var path = this.app.paths[i];
        path.scroll(frame);
    }

};

Animation.prototype.indirect = function(frame) {};







Animation.prototype.x_askfor = function(frame) {
    var usedFps,
        self = this,
        jump,
        i = 0,
        delta = Math.abs(frame - this.frame.current);

    if (delta > 0) {
        // do faster animation for small scrolls
        if (delta < 50) {
            usedFps = this.fps * delta / 50
        } else {
            usedFps = this.fps
        }
        jump = (frame - this.frame.last) / usedFps;
        clearInterval(self.timer);


        this.timer = setInterval(function () {
            self.frame.current += jump;
            self.do(self.frame.current);
            i++;
            if (i === self.fps) {
                clearInterval(self.timer);
                self.frame.last = self.frame.current;
            }
        }, this.freq);
    }
        
};



