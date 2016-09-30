function Timer(app, element, settings) {
    this.app = app;
    this.name = settings.name;
    this.element = element;
    this.origin = settings.origin;
    this.transitions = settings.transitions;
    this.lastY = 0;
}

Timer.prototype.scroll = function(frame) {
    var y = this.getY(frame);
    // minimize dom operations
    if (y !== this.lastY) {
        this.element.attr({
            transform: 'translate(' + this.origin[0] + ',' + Math.round(y) + ')'
        });
        this.lastY = y;
    }
};

Timer.prototype.getY = function(frame) {
    if (frame < this.transitions[0].start) {
        return this.origin[1];
    } else {
        for (var i = 0, l = this.transitions.length; i < l; i++) {
            var transition = this.transitions[i];
            // inside a transition
            if (frame >= transition.start && frame <= transition.end) {
                return this.getTransitionState(frame, transition);
            } else if ((i + 1) > (l - 1) || frame < this.transitions[i + 1].start) { // sticky in this phase
                return transition.destination;
            }
        }
    }
};

Timer.prototype.getTransitionState = function(frame, transition) {
    var progression = frame - transition.start,
        length = transition.end - transition.start,
        part = progression / length,
        distance = transition.destination - transition.origin,
        done = part * distance;
    return transition.origin + done;
};
