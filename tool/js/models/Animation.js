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
    this.select = {
        subPaths: null,
        coverSubPaths: null
    };
    this.init();
}

Animation.prototype.init = function() {
    var dataset = [];
    this.freq = this.t / this.fps;
    // make d3 selections
    this.select.subPaths = d3.selectAll('.sub-path');
    this.select.coverSubPaths = d3.selectAll('.cover-sub-path');
    this.select.coverSubPaths.each(function(){
        // read the data point from the attribute
        dataset.push(parseInt($(this).attr('data-animation-start')));
    });
    // bind the dataset to the selection
    this.select.coverSubPaths.data(dataset);
};

Animation.prototype.scroll = function(frame) {
    var self = this;
    function requestAccepted() {
        self.perform(frame)
    }
    window.requestAnimationFrame(requestAccepted);
};



Animation.prototype.perform = function(frame) {
    this.app.story.scroll(frame);
    this.app.canvas.scroll(frame);
    this.select.coverSubPaths.attr({
        'stroke-dashoffset': function(d){
            var delta = frame - d;
            if (delta < 0) {
                delta = 0;
            }
            return -3 * delta;
        }
    });
    this.select.subPaths.attr({
        'stroke-dashoffset': -3 * frame
    });
};

Animation.prototype.getAv = function() {
    var sum = 0;
    for (var i = 0, l = this.draws.length; i < l; i++) {
        sum += this.draws[i];
    }
    return Math.floor(sum / l);
};


