function Path(app) {
    this.app = app;
    this.position = {
        x: 300,
        y: 100
    };
    this.points = 'M1,0v404.068c0,11.597,9.435,21.03,21.031,21.03 c11.597,0,21.031-9.434,21.031-21.03V246.129c0-6.773,5.509-12.282,12.281-12.282s12.28,5.509,12.28,12.282v157.938h8.75';
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
    document.getElementById('hidden-element-svg').appendChild(newpath);
    this.node = newpath;
};


Path.prototype.getPosition = function(progress) {
    return this.node.getPointAtLength(progress);
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
