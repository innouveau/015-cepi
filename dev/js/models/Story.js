function Story(app) {
    this.app = app;
    this.phase = {
        index: 0,
        direction: 0
    };
    this.element = {
        story: $('#story'),
        intro: $('.intro'),
        firstChapter: {
            element: null,
            top: 0
        }
    };
    this.offset = 1000;
    this.buffer = 20;
    this.margin = 15;
    this.chapters = 3;
    this.wait = 300;
    this.lockPosition = this.getLockPosition();
    this.init();
}


Story.prototype.scroll = function(frame) {
    var rest = frame % this.offset,
        phaseInZone = Math.round(frame / this.offset),
        phaseCurrent = Math.floor(frame / this.offset);
    if (rest !== 0 && phaseInZone !== phaseCurrent) {
        if (rest < this.buffer) {
            this.phase.direction = rest;
        } else if (rest > (this.offset - this.buffer)) {
            this.phase.direction = rest - this.offset;
        } else {
            this.phase.direction = 0;
        }
    } else {
        this.phase.direction = 0;
    }
    this.phase.index = phaseCurrent;

    // first chapter
    var firstTop = this.element.firstChapter.top + this.wait - frame;
    if (firstTop > this.element.firstChapter.top) {
        firstTop = this.element.firstChapter.top;
    }
    this.element.firstChapter.element.css('top', firstTop);


    // outer zones
    if (this.phase.index === 0 && this.phase.direction > 0) {
        this.phase.direction = 0;
    }
    if (this.phase.index === (this.chapters - 1) && this.phase.direction < 0) {
        this.phase.direction = 0;
    }
};

Story.prototype.getLockPosition = function() {
    return parseInt(this.element.intro.css('top')) + this.element.intro.outerHeight() + this.margin - parseInt(this.element.story.css('top'));
};

Story.prototype.init = function() {
    var top = this.lockPosition,
        minHeight = $(window).outerHeight() - this.lockPosition - parseInt(this.element.story.css('top')) + 200, // todo look at this
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
        top += self.offset;
    });


    $('.chapter:last-child').css('min-height', minHeight);
};

Story.prototype.setPhase = function(i) {
    this.phase.index = i;
};

Story.prototype.setDirection= function(direction) {
    this.phase.direction = direction;
};



