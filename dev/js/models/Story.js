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
    console.log(this.app.settings.timing.bottomFrame.transitions[1].destination);
    var top = this.lockPosition,
        height = $(window).outerHeight() - this.app.settings.timing.bottomFrame.transitions[1].destination,
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
        }
    });
    $('.chapter:last-child').css('min-height', height);
};

Story.prototype.scroll = function(frame) {
    if (frame > this.app.settings.timing.disclaimer && !this.disclaimerShowed) {
        openDisclaimer();
        this.disclaimerShowed = true;
    }

    var firstTop = this.element.firstChapter.top + this.app.settings.timing.story.wait - frame;
    if (firstTop > this.element.firstChapter.top) {
        firstTop = this.element.firstChapter.top;
    }
    this.element.firstChapter.element.css('top', firstTop);
};

