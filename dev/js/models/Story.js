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
    this.lockPosition = this.getLockPosition();
    this.init();
}


Story.prototype.scroll = function(frame) {
    var rest = frame % this.app.settings.sizes.story.offset,
        phaseInZone = Math.round(frame / this.app.settings.sizes.story.offset),
        phaseCurrent = Math.floor(frame / this.app.settings.sizes.story.offset);
    if (rest !== 0 && phaseInZone !== phaseCurrent) {
        if (rest < this.app.settings.sizes.story.buffer) {
            this.phase.direction = rest;
        } else if (rest > (this.app.settings.sizes.story.offset - this.app.settings.sizes.story.buffer)) {
            this.phase.direction = rest - this.app.settings.sizes.story.offset;
        } else {
            this.phase.direction = 0;
        }
    } else {
        this.phase.direction = 0;
    }
    this.phase.index = phaseCurrent;

    // first chapter
    var firstTop = this.element.firstChapter.top + this.app.settings.timing.story.wait - frame;
    if (firstTop > this.element.firstChapter.top) {
        firstTop = this.element.firstChapter.top;
    }
    this.element.firstChapter.element.css('top', firstTop);


    // outer zones
    if (this.phase.index === 0 && this.phase.direction > 0) {
        this.phase.direction = 0;
    }
    if (this.phase.index === (this.app.settings.properties.story.chapters - 1) && this.phase.direction < 0) {
        this.phase.direction = 0;
    }

    // fix for accelaration bug, see main.js
    if (this.phase.index > 2) {
        this.phase.index = 2;
    }
};

Story.prototype.getLockPosition = function() {
    return parseInt(this.element.intro.css('top')) + this.element.intro.outerHeight() + this.app.settings.sizes.story.margin - parseInt(this.element.story.css('top'));
};

Story.prototype.init = function() {
    var top = this.lockPosition,
        height = $(window).outerHeight() - this.app.settings.sizes.layers.bottom.positions[2],
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
            //$(this).css('top', top);
        }
        top += self.app.settings.sizes.story.offset;
    });


    $('.chapter:last-child').css('min-height', height);
};

Story.prototype.setPhase = function(i) {
    this.phase.index = i;
};

Story.prototype.setDirection= function(direction) {
    this.phase.direction = direction;
};



