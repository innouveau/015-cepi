function Path() {
    this.app = app;
    this.speed = this.app.config.snippet.speed;
    this.position = {
        x: 220,
        y: 20
    };
    this.points = 'M144.952,77.377C104.4,63.859,54.189,84.135,25.221,121.791 c-28.968,37.661-36.693,79.178,3.861,67.588C69.636,177.797,310.063,79.304,287.855,23.302 c-22.209-56.001-64.813,35.728-73.925,101.387c-9.114,65.659-41.941,117.799-101.809,108.144 c-59.864-9.658-56.003-46.349-39.587-81.108c16.416-34.762,48.278-57.933,68.555-49.243c20.275,8.689,22.207,126.493,99.453,85.936 c77.242-40.555,56.004-26.072,51.176-7.725c-4.829,18.347-18.349,45.379-4.829,33.793c13.519-11.586,32.83-50.211,56.97-56.969 c24.138-6.759,26.07,3.861,15.448,25.104c-10.62,21.245-23.176,47.316-3.865,39.589c19.316-7.724,104.285-67.592,111.043-64.69 c6.762,2.896,0,14.479-4.828,28c-4.825,13.521-26.069,32.834-6.758,30.899c19.31-1.933,71.456-50.209,81.108-43.448 c9.655,6.758-27.039,112.971-27.039,112.971l62.765-132.283c6.095-16.082,16.413-16.417,28.965-10.622 c12.555,5.795,8.373,58.578-17.379,63.729c-42.438,8.486-19.139,21.461,0,15.446c19.137-6.013,57.935-45.38,57.935-45.38 s32.831-25.104,28.001,4.826c-4.827,29.934-40.55,99.453-40.55,99.453s54.375-108.568,67.588-128.422 c13.213-19.851,38.625-15.448,37.657,1.935c-0.965,17.383-24.139,45.378-42.485,51.173c-18.346,5.801-7.724,14.488,1.934,12.557 c9.652-1.935,97.521-34.765,104.28-40.558c6.761-5.793,36.692-26.071,19.312-31.862c-17.383-5.792-32.827,5.795-40.557,29.936 c-7.726,24.139,10.592,53.129,27.007,42.508c0,0,23.06-10.876,49.726-46.877c26.666-36,82-26,58.666-16 c-38.146,16.349-24-70.667,0.952-72.05c9.674-0.536-30.76,51.771-29.618,100.05c2.896,45.382,27.486,39.68,63.211,6.848';
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
