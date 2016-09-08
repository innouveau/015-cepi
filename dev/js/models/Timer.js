function Timer(app, element, settings) {
    this.app = app;
    this.name = settings.name;
    this.element = element;
    this.phase = {
        current: 0,
        closest: 0,
        direction: 0
    };
    this.positions = settings.positions;
    this.stops = settings.stops;
    this.zones = settings.zones;
    this.left = settings.left;
}

Timer.prototype.scroll = function(frame) {
    var closestObj = this.getClosest(frame),
        distance = closestObj.distance,
        closest = closestObj.index,
        current = this.getCurrentPhase(frame);

    if (distance !== 0 && closest !== current) {
        if (Math.abs(distance) < this.zones[current]) {
            this.phase.direction = distance;
        } else {
            this.phase.direction = 0;
        }
    } else {
        this.phase.direction = 0;
    }

    this.phase.current = current;
    this.phase.closest = closest;



    // outer zones
    if (this.phase.index === 0 && this.phase.direction > 0) {
        this.phase.direction = 0;
    }
    if (this.phase.index === (this.length - 1) && this.phase.direction < 0) {
        this.phase.direction = 0;
    }
    var y = this.getY(frame);
    this.element.attr({
        transform: 'translate(' + this.left + ',' + y + ')'
    });
};

Timer.prototype.getCurrentPhase = function(frame) {
    var current = 0;
    for (var i = 0; i < 3; i++) {
        if (frame >= this.stops[i]) {
            current = i;
        }
    }
    return current;
};

Timer.prototype.getClosest = function(frame) {
    var closest = null,
        closestDistance = 0,
        length = 0,
        distance;
    for (var i = 0; i < 3; i++) {
        distance = frame - this.stops[i];
        if (closest === null || Math.abs(distance) < Math.abs(closestDistance)) {
            closest = i;
            closestDistance = distance;
        }
    }
    return {
        index: closest,
        distance: closestDistance
    };
};

Timer.prototype.getY = function(frame) {
    var y,
        index = this.phase.current,
        part,
        zone = this.zones[this.phase.current];
    if (this.phase.direction !== 0) {
        var current,
            next;
        if (this.phase.direction > 0) {
            current = this.positions[index];
            next = this.positions[index - 1];
            part = (zone - this.phase.direction) / zone;
        } else {
            current = this.positions[index];
            next = this.positions[index + 1];
            part = (zone + this.phase.direction) / zone;
        }
        y = current + (next - current) * part;
    } else {
        y = this.positions[index];
    }

    return y;
};