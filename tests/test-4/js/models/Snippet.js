function Snippet(parent, app) {
    var position = parent.canvas.main.getRandomPositionInCircle();
    this.parent = parent;
    this.app = app;
    this.color = this.getRandomColor();
    this.triangle = new Triangle(this.app, this.app.config.snippet.size, true);
    this.path = new Path(position);
    // old, current and new to register an animation
    this.position = {
        old: position,
        current: position,
        new: null
    };
    this.animation = {
        vector: null,
        length: 0,
        progress: 0,
        style: 0
    };
    this.config = {};
    
    this.canAnimate = true;
    this.parent.canvas.snippets.updated = true;
}



Snippet.prototype.enlighten = function() {
    return Math.round((1 + this.app.config.lightness) * this.app.random(256));
};

Snippet.prototype.animate = function(progress) {
    var oldPosition = this.position.old,
        newPosition = this.position.new,
        currentPosition = this.position.current;

    for(var axis in oldPosition) {
        currentPosition[axis] = Math.round((newPosition[axis] - oldPosition[axis]) * progress + oldPosition[axis]);
    }
};

Snippet.prototype.initPathWalk = function(step) {
    this.animation.style = 2;
    this.animation.step = step;
    this.animation.progress = 0;
    this.animation.length = this.path.getLength();
    this.config.spread = {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20
    }
};

Snippet.prototype.pathWalk = function() {
    if (this.animation.progress < this.animation.length) { // TODO kill something to stop executing this function?
        this.animation.progress += this.animation.step;
        var position = this.path.getPosition(this.animation.progress);
        position.x += this.config.spread.x;
        position.y += this.config.spread.y;
        this.position.current = position;
    }
};

Snippet.prototype.setVector = function(step) {
    var vector = {
            x: this.position.new.x - this.position.old.x,
            y: this.position.new.y - this.position.old.y
        },
        distance = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)),
        fraction = distance / step;
    this.animation.vector = {
        x: vector.x / fraction,
        y: vector.y / fraction
    };
    this.animation.style = 1;
    this.animation.step = step;
    this.animation.progress = 0;
    this.animation.length = distance;
};

Snippet.prototype.setStep = function() {
    this.animation.progress += this.animation.step;
    if (this.animation.progress < this.animation.length) { // TODO kill something to stop executing this function?
        for (var axis in this.position.current) {
            this.position.current[axis] += this.animation.vector[axis];
        }
    }
};

Snippet.prototype.draw = function() {
    var ctx = this.parent.canvas.snippets.ctx;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.getCoordinate(this.triangle.points[0], 'x'), this.getCoordinate(this.triangle.points[0], 'y'));
    for (var i = 1, l = this.triangle.points.length; i < l; i++) {
        ctx.lineTo(this.getCoordinate(this.triangle.points[i], 'x'), this.getCoordinate(this.triangle.points[i], 'y'));
    }
    ctx.closePath();
    ctx.fill();
};

Snippet.prototype.getCoordinate = function(point, direction) {
    return point[direction] + this.position.current[direction];
};

Snippet.prototype.getRandomColor = function() {
    var a = Math.random(),
        grey;
    if (a < this.app.config.greyness) {
        grey = this.enlighten();
        return 'rgb(' + grey + ',' + grey + ',' + grey + ')';
    } else {
        return 'rgb(' + this.enlighten() + ',' + this.enlighten() + ',' + this.enlighten() + ')';
    }
};


