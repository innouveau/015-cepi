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
        $('#scroller').css('height', 3000);


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
                self.element.firstChapter.top = top;
                $(this).css({
                    top: top,
                    position: 'fixed'
                });
                $(this).addClass('fixed-chapter');
            } else {
                top = self.app.settings.timing.story.chapter[index];
                $(this).css({
                    top: top,
                    position: 'fixed'
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
    console.log("!");
    var height = $(window).outerHeight() - this.app.settings.timing.bottomFrame.transitions[1].destination + this.app.settings.timing.story.chapter[2];
    $('#scroller').css('height', height);
};

Story.prototype.scroll = function(frame) {
    for (var i = 0, l = this.chapters.length; i < l; i++) {
        var chapter = this.chapters[i];

        if (window.device > 0 && i === 0) {
            var firstTop = this.element.firstChapter.top + this.app.settings.timing.story.wait - frame;
            if (firstTop > this.element.firstChapter.top) {
                firstTop = this.element.firstChapter.top;
            }
            chapter.element.css('top', firstTop);

        } else {
            var currentTop = chapter.top - frame;
            if (window.device === 0) {
                if (currentTop < 0) {
                    currentTop = 0;
                }
            }
            chapter.element.css({
                top: currentTop
            });
        }
    }

    // show disclaimer
    if (frame > this.app.settings.timing.disclaimer && !this.disclaimerShowed) {
        openDisclaimer();
        this.disclaimerShowed = true;
    }

    // hide trigger
    if (frame > 50) {
        $('body').addClass('active');
    } else {
        $('body').removeClass('active');
    }





    // on tablets and smartphone the window height changes during scrolling
    // due to hiding system menu
    // but for smarthphone we dont do this, cause there we use a fixed height
    if (window.device > 0 && window.device < 3) {
        if (frame > 500 && !this.measuredAgain) {

            this.measuredAgain = true;
            this.measureScrollLength();

        }
    }
};

