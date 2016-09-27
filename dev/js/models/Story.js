function Story(app) {
    this.app = app;
    this.element = {
        story: $('#story'),
        intro: $('.intro'),
        firstChapter: {
            element: null,
            top: 0
        }
    };
    this.chapters = [];
    this.lockPosition = this.getLockPosition();
    this.init();
    this.disclaimerShowed = true; // todo set false
    this.measuredAgain = false;
}


Story.prototype.getLockPosition = function() {
    return parseInt(this.element.intro.css('top')) + this.element.intro.outerHeight() + this.app.settings.properties.story.margin - parseInt(this.element.story.css('top'));
};

Story.prototype.init = function() {
    var self = this;
    if (window.device === 0) {
        var display;
        // todo this is temp a hardcoded number
        $('#scroller').css('height', 2000);


        $('.chapter').each(function(index) {
            var top = self.app.settings.timing.story.chapter[index];
            $(this).css({
                top: top,
                position: 'absolute'
            }).attr('top', top).removeClass('fixed-chapter');
            self.chapters.push({
                element: $(this),
                top: top
            });
        });
    } else {
        var lockPosition = this.lockPosition,
            top;
        this.measureScrollLength();
        $('.chapter').each(function (index) {
            if (index === 0) {
                top = lockPosition + parseInt(self.element.story.css('top'));
                self.element.firstChapter.element = $(this);
                self.element.firstChapter.top = firstTop;
                $(this).css({
                    top: top,
                    position: 'fixed'
                });
                $(this).addClass('fixed-chapter');
            } else {
                top = self.app.settings.timing.story.chapter[index];
                $(this).css({
                    top: top
                });
            }
            self.chapters.push({
                element: $(this),
                top: top
            });
        });
    }
};

Story.prototype.measureScrollLength = function() {
    var height = $(window).outerHeight() - this.app.settings.timing.bottomFrame.transitions[1].destination;
    $('.chapter:last-child').css('min-height', height);
};

Story.prototype.scroll = function(frame) {
    if (window.device === 0) {
        for (var i = 0, l = this.chapters.length; i < l; i++) {
            var chapter = this.chapters[i],
                currentTop = chapter.top - frame;
            if (currentTop < 0) {
                currentTop = 0;
            }
            chapter.element.css({
                top: currentTop
            });
        }
    } else {
        if (frame > this.app.settings.timing.disclaimer && !this.disclaimerShowed) {
            openDisclaimer();
            this.disclaimerShowed = true;
        }

        var firstTop = this.element.firstChapter.top + this.app.settings.timing.story.wait - frame;
        if (firstTop > this.element.firstChapter.top) {
            firstTop = this.element.firstChapter.top;
        }
        this.element.firstChapter.element.css('top', firstTop);
    }

    // on tablets and smartphone the window height changes during scrolling
    // due to hiding system menu
    if (window.device < 3) {
        if (frame > 500 && !this.measuredAgain) {

            this.measuredAgain = true;
            this.measureScrollLength();

        }
    }
};

