function Story(app) {
    this.app = app;
    this.previousPhaseIndex = -1;
    this.scrollDirection = 1;
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
    this.getScrollDirection();

    var index = this.getPhaseIndex(frame);
    this.phase.direction = this.getPhaseDirection(frame, index);

    if (index !== this.previousPhaseIndex) {
        this.previousPhaseIndex = this.phase.index;
    }

    this.phase.index = index;

    console.clear();
    console.log(this.phase.index);
    console.log(this.phase.direction);
    console.log(this.previousPhaseIndex);
    console.log(this.scrollDirection);

    this.holdFirstChapter(frame);
};

Story.prototype.getScrollDirection = function() {
    if (this.phase.index > this.previousPhaseIndex) {
        this.scrollDirection = 1;
    } else {
        this.scrollDirection = -1;
    }
};

Story.prototype.getPhaseDirection = function(frame, index) {
    var chapter1 = this.app.settings.sizes.story.offset[0],
        chapter2 = this.app.settings.sizes.story.offset[1],
        buffer = this.app.settings.sizes.story.buffer;
    if (index === 0) {
        if (frame > chapter1 - buffer && frame < chapter1) {
            return frame - chapter1;
        } else {
            return 0;
        }
    } else if (index === 1) {
        if (frame > chapter1 && frame < chapter1 + buffer) {
            return frame - chapter1;
        } else if (frame > chapter1 + chapter2 - buffer && frame < chapter1 + chapter2) {
            return frame - (chapter1 + chapter2);
        } else {
            return 0;
        }
    } else {
        return 0;
    }
};

Story.prototype.getPhaseIndex = function(frame) {
    var chapterLength1 = this.app.settings.sizes.story.offset[0],
        chapterLength2 = this.app.settings.sizes.story.offset[1],
        extra = 0;
    if (this.scrollDirection === -1) {
        extra = this.app.settings.sizes.story.buffer;
    }

    if (frame < chapterLength1 - extra) {
        return 0;
    } else if (frame < chapterLength1 + chapterLength2 - extra) {
        return 1;
    } else {
        return 2;
    }
};

Story.prototype.holdFirstChapter = function(frame) {
    var firstTop = this.element.firstChapter.top + this.app.settings.timing.story.wait - frame;
    if (firstTop > this.element.firstChapter.top) {
        firstTop = this.element.firstChapter.top;
    }
    this.element.firstChapter.element.css('top', firstTop);
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
            $(this).css('top', top);
        }
        top += self.app.settings.sizes.story.offset[index];
    });


    $('.chapter:last-child').css('min-height', height);
};

Story.prototype.setPhase = function(i) {
    this.phase.index = i;
};

Story.prototype.setDirection= function(direction) {
    this.phase.direction = direction;
};



