function Path(startingPoint) {
    this.app = app;
    this.position = {
        x: 400,
        y: 100
    };
    this.points = 'M' + (startingPoint.x - this.position.x) + ',' + (startingPoint.y - this.position.y) + ' 1,0v404.068c0,11.597,9.435,21.03,21.031,21.03 c11.597,0,21.031-9.434,21.031-21.03V246.129c0-6.773,5.509-12.282,12.281-12.282s12.28,5.509,12.28,12.282v157.938h8.75';
    this.node = null;
    this.build();
    this.length = this.getLength();
}

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
