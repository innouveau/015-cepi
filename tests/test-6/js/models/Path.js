function Path() {
    this.app = app;
    this.speed = this.app.config.snippet.speed;
    this.position = {
        x: 270,
        y: 150
    };
    this.points = 'M0,0v404.068c0,11.597,9.435,21.03,21.031,21.03 c11.597,0,21.031-9.434,21.031-21.03V246.129c0-6.773,5.509-12.282,12.281-12.282s12.281,5.509,12.281,12.282v157.938 c0,11.596,9.434,21.03,21.03,21.03c11.597,0,21.03-9.435,21.03-21.03V267.646c0-6.773,5.51-12.282,12.282-12.282 c6.771,0,12.281,5.509,12.281,12.282v136.421c0,11.597,9.434,21.031,21.029,21.031c11.597,0,21.03-9.435,21.03-21.031V292.646 c0-6.773,5.51-12.282,12.282-12.282c6.771,0,12.279,5.509,12.279,12.282v111.422c0,11.596,9.435,21.03,21.031,21.03 s21.031-9.435,21.031-21.03v-82.94c0-6.772,5.509-12.281,12.281-12.281c6.771,0,12.28,5.509,12.28,12.281v82.94 c0,11.596,9.435,21.03,21.03,21.03s21.031-9.435,21.031-21.03v-57.94c0-6.772,5.509-12.281,12.28-12.281 c6.772,0,12.281,5.509,12.281,12.281v57.939c0,11.597,9.435,21.031,21.03,21.031c11.597,0,21.03-9.435,21.03-21.031v-32.939 c0-6.772,5.51-12.281,12.281-12.281c6.772,0,12.281,5.509,12.281,12.281v32.939c0,11.597,9.434,21.031,21.03,21.031H496';
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
