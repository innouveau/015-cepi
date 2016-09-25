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
    this.lockPosition = this.getLockPosition();
    this.init();
    this.disclaimerShowed = true; // todo set false
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
            }).attr('top', top);
        });
    } else {
        var top = this.lockPosition,
            height = $(window).outerHeight() - this.app.settings.timing.bottomFrame.transitions[1].destination;
        $('.chapter').each(function (index) {
            if (index === 0) {
                var firstTop = top + parseInt(self.element.story.css('top'));
                self.element.firstChapter.element = $(this);
                self.element.firstChapter.top = firstTop;
                $(this).css({
                    top: firstTop,
                    position: 'fixed'
                });
                $(this).addClass('fixed-chapter');
            }
        });
        $('.chapter:last-child').css('min-height', height);
    }
};

Story.prototype.scroll = function(frame) {
    if (window.device === 0) {
        $('.chapter').each(function (index) {
            var top = parseInt($(this).attr('top')) - frame;
            if (top < 0) {
                top = 0;
            }
            $(this).css({
                top: top
            });

        });
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
};

