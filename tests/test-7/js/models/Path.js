function Path(points, speed) {
    this.speed = speed;
    this.position = {
        x: 200,
        y: 190
    };
    this.points = points;
    this.node = null;
    this.build();
    this.length = this.getLength();
    this.coordinates = this.getCoordinates();
}

Path.prototype.getCoordinates = function() {
    var l = Math.round(this.length / this.speed),
        coordinates = [];
    for (var i = 0; i < l; i++) {
        var position = this.getPosition(i * this.speed);
        coordinates.push(position);
    }
    return coordinates;
};

Path.prototype.build = function() {
    var newpath = document.createElementNS('http://www.w3.org/2000/svg','path');
    newpath.setAttributeNS(null, 'd', this.points);
    newpath.setAttribute('stroke', 'black');
    newpath.setAttribute('stroke-width', 1);
    newpath.setAttribute('fill', 'none');
    //document.getElementById('hidden-element-svg').appendChild(newpath); // No need for the node to live in the DOM, TODO check for browser support on this
    this.node = newpath;
};

Path.prototype.getStart = function() {
    return this.getPosition(0);
};

Path.prototype.getPosition = function(progress) {
    var position = this.node.getPointAtLength(progress);
    return {
        x: position.x + this.position.x,
        y: position.y + this.position.y
    }
};

Path.prototype.getLength = function() {
    return this.node.getTotalLength();
};

Path.prototype.getRandomPosition = function(spread) {
    var progress = Math.random() * this.length,
        position = this.getPosition(progress),
        spreadX = (Math.random() - 0.5) * spread,
        spreadY = (Math.random() - 0.5) * spread;
    return {
        x: position.x + spreadX + this.position.x,
        y: position.y + spreadY + this.position.y
    }
};

Path.prototype.destroy = function() {
    this.node.remove(); // TODO works on all browsers??
};
