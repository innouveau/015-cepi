function Timer(app, element, settings) {
    this.app = app;
    this.name = settings.name;
    this.element = element;
    this.origin = settings.origin;
    this.transitions = settings.transitions;
    this.left = settings.left;
}

Timer.prototype.scroll = function(frame) {
    var y = this.getY(frame);
    this.element.attr({
        transform: 'translate(' + this.left + ',' + y + ')'
    });
};

Timer.prototype.getY = function(frame) {
    console.clear();
    console.log(frame);
    if (frame < this.transitions[0].start) {
        console.log('origin');
        return this.origin;
    } else {
        for (var i = 0, l = this.transitions.length; i < l; i++) {
            var transition = this.transitions[i];
            // inside a transition
            if (frame >= transition.start && frame <= transition.end) {
                console.log('inside');
                return this.getTransitionState(frame, transition);
            } else if ((i + 1) > (l - 1) || frame < this.transitions[i + 1].start) { // sticky in this phase
                console.log('end');
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
