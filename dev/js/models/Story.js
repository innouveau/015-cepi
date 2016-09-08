function Story(app) {
    this.app = app;
    this.phase = {
        current: 0,
        closest: 0,
        direction: 0
    };
    this.length = 3;
    this.element = {
        story: $('#story'),
        intro: $('.intro'),
        firstChapter: {
            element: null,
            top: 0
        }
    };
    this.lockPosition = this.getLockPosition();
    this.init();
}


Story.prototype.scroll = function(frame) {
    console.clear();
    console.log('frame: ' + frame);
    var closestObj = this.getClosest(frame),
        distance = closestObj.distance,
        closest = closestObj.index,
        current = this.getCurrentPhase(frame);

    if (distance !== 0 && closest !== current) {
        if (distance < Math.abs(this.app.settings.sizes.story.buffer[current])) { // todo make buffer specific to closest
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

    this.holdFirstChapter(frame);
};


Story.prototype.holdFirstChapter = function(frame) {
    var firstTop = this.element.firstChapter.top + this.app.settings.timing.story.wait - frame;
    if (firstTop > this.element.firstChapter.top) {
        firstTop = this.element.firstChapter.top;
    }
    this.element.firstChapter.element.css('top', firstTop);
};

Story.prototype.getCurrentPhase = function(frame) {
    var length = 0,
        current = 0;
    for (var i = 0, l = this.length; i < l; i++) {
        if (frame >= length) {
            current = i;
        }
        length += this.app.settings.sizes.story.offset[i];
    }
    console.log('current: ' + current);
    return current;
};

Story.prototype.getClosest = function(frame) {
    var closest = null,
        closestDistance = 0,
        length = 0,
        distance;
    for (var i = 0, l = this.length; i < l; i++) {
        distance = frame - length;
        if (closest === null || Math.abs(distance) < Math.abs(closestDistance)) {
            closest = i;
            closestDistance = distance;
        }
        length += this.app.settings.sizes.story.offset[i];
    }
    console.log('closest: ' + closest);
    console.log('rest: ' + closestDistance);
    return {
        index: closest,
        distance: closestDistance
    };
};

Story.prototype.getLockPosition = function() {
    return parseInt(this.element.intro.css('top')) + this.element.intro.outerHeight() + this.app.settings.sizes.story.margin - parseInt(this.element.story.css('top'));
};

Story.prototype.init = function() {
    var top = this.lockPosition,
        height = $(window).outerHeight() - (this.app.settings.sizes.layers.bottom.positions[2] + this.app.settings.sizes.layers.bottom.header),
        self = this;
    $('.chapter').each(function(index) {
        if (index === 0) {
            var firstTop = top + parseInt(self.element.story.css('top'));
            self.element.firstChapter.element = $(this);
            self.element.firstChapter.top = firstTop;
            $(this).css({
                top: firstTop,
                position: 'fixed'
            });
            $(this).addClass('fixed-chapter');
        } else {
            $(this).css('top', top);
        }
        top += self.app.settings.sizes.story.offset[index];
    });


    $('.chapter:last-child').css('min-height', height);

    $('.blauw').css({
        top: self.lockPosition + parseInt(self.element.story.css('top')),
        height: self.app.settings.sizes.story.buffer[0]
    })
    $('.groen').css({
        top: self.lockPosition + parseInt(self.element.story.css('top')),
        height: self.app.settings.sizes.story.buffer[1]
    })
};

Story.prototype.setPhase = function(i) {
    this.phase.index = i;
};

Story.prototype.setDirection= function(direction) {
    this.phase.direction = direction;
};



