function Director(container) {
    this.container = container;
    this.current = null;
    this.chapters = [];
    this.index = 0;
    this.progress = 0;
}

Director.prototype.init = function() {
    var self = this,
        i = 0;
    $(this.container).find('.chapter').each(function(){
        var chapter = new Chapter(this, i);
        i++;
        self.chapters.push(chapter);
    });
    this.current = this.chapters[0];
    this.current.show();
    this.watchScroll();
};

Director.prototype.watchScroll = function() {
    var self = this,
        index,
        progression;
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        for (var i = 0, l = self.chapters.length; i < l; i++) {
            var chapter = self.chapters[i];
            if (scroll >= chapter.top && scroll < chapter.bottom) {
                self.current = chapter;
                self.current.show();
                self.index = chapter.index;
                self.progress = chapter.getProgres(scroll);
            } else {
                chapter.hide();
            }
        }
    })
};
