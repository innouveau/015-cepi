function Valorisation(app, parent, valorisation) {
    this.id = valorisation.id;
    this.app = app;
    this.parent = parent;
    this.name = valorisation.name;
    this.description = valorisation.description;
    this.economicDescription = valorisation.economic;
    this.trlDescription = valorisation.trlDescription;
    this.image = valorisation.image;
    this.sidestreams = this.getSidestreams(valorisation.sidestreams);
    this.liveSidestreams = [];
    this.tlr = valorisation.tlr;
    this.value = valorisation.value;
    this.position = this.getPosition();
    this.circles = [];
    this.element = this.getElement();
    this.cover = this.getCover();
    this.popup = this.createPopup();
    this.visible = true;
    this.button = {
        legend: null
    };
    this.addListeners();
    this.update();

}

Valorisation.prototype = Object.create(_FilterModel.prototype);

Valorisation.prototype.getElement = function() {
    var mainElement,
        subElement,
        p = 0.5 * this.app.settings.properties.radar.r,
        liveSidestreams = this.getLiveSidestreams();
    mainElement = this.app.canvas.layers.bottom.valorisations.append('g').attr({
        class: 'valorisation valorisation-' + this.id,
        transform: 'translate(' + this.position.x + ',' + this.position.y + ')'
    });
    subElement = mainElement.append('g').attr({
        class: 'valorisation-sub-element'
    })  ;
    for (var i = 0, l = this.app.settings.properties.radar.n; i < l; i++) {
        var r = p - i * this.app.settings.properties.radar.gap,
            circle = new Circle(this.app, this, subElement, r, p);
        circle.updateSubCircles(liveSidestreams);
        this.circles.push(circle);
    }
    // hit area
    subElement.append('circle').attr({
        r: p,
        cx: 0,
        cy: 0,
        fill: 'transparent',
        class: 'hit-area'
    });
    return {
        main: mainElement,
        sub: subElement
    };
};

Valorisation.prototype.getCover = function() {
    return new ArcCover(this.app, this);
};

Valorisation.prototype.update = function() {
    var liveSidestreams = this.getLiveSidestreams(),
        self = this;
    if (liveSidestreams.length === 0) {
        this.hide();
    } else {
        this.show();
    }
    if (liveSidestreams.length !== this.liveSidestreams.length) {
        // 1. close
        this.cover.close();
        // 2. change radar
        setTimeout(function () {
            for (var i = 0, l = self.circles.length; i < l; i++) {
                self.circles[i].updateSubCircles(liveSidestreams);
            }
        }, this.app.settings.animation.radar);
        // 3. open
        setTimeout(function () {
            self.cover.open();
        }, (this.app.settings.animation.radar * 1.2));
        // 4. update state
        this.liveSidestreams = liveSidestreams;
    }
};

Valorisation.prototype.getLiveSidestreams = function() {
    var sidestreams = [];
    for (var i = 0, l = this.sidestreams.length; i < l; i++) {
        var sidestream = this.sidestreams[i];
        if (sidestream.visible){
            sidestreams.push(sidestream);
        }
    }
    return sidestreams;
};

Valorisation.prototype.getPosition = function() {
    return {
        x: (this.value - 0.5 + 2) * this.app.settings.graph.width / 12,
        y: (11.5 - this.tlr) * this.app.settings.graph.height / 11
    }
};

Valorisation.prototype.reposition = function() {
    this.position = this.getPosition();
    this.element.main.attr({
        transform: 'translate(' + this.position.x + ',' + this.position.y + ')'
    })
};

// popup

Valorisation.prototype.createPopup = function() {
    var div = $('<div class="valorisation-popup hidden"></div>'),
        container = $('<div class="valorisation-container"></div>'),
        head = $('<div class="valorisation-head"><h2>' + this.name + '</h2></div>'),
        body = $('<div class="valorisation-body"></div>'),
        text = $('<div class="valorisation-text"><b>Description</b><p>' + this.description + '</p></div>'),
        image = $('<div class="valorisation-image"><img src="images/flows/' + this.image + '"></div>'),
        economicDescription = $('<div class="economic-description"><b>Economic</b><p>' + this.economicDescription + '</p></div>'),
        trlDescription = $('<div class="trl-description"><b>TRL</b><p>' + this.trlDescription + '</p></div>'),
        closeButton = $('<div class="close-button">×</div>'),
        self = this;
    text.append(economicDescription);
    text.append(trlDescription);
    body.append(text);
    body.append(image);
    container.append(head);
    container.append(body);
    div.append(container);
    div.append(closeButton);
    closeButton.click(function(){
        self.closePopup();
    });
    $('body').append(div);
    return div;
};

Valorisation.prototype.openPopup = function() {
    var self = this;
    $('.overlay').show();
    $('.valorisation-popup').each(function(){
        if (this === self.popup[0]) {
            if (window.device === 0) {
                $(this).removeClass('hidden');
            } else {
                $(this).fadeIn(self.app.settings.animation.popup);
            }
        } else {
            if (window.device === 0) {
                $(this).addClass('hidden');
            } else {
                $(this).fadeOut(self.app.settings.animation.popup);
            }
        }
    })
};

Valorisation.prototype.closePopup = function() {
    $('.overlay').hide();
    if (window.device === 0) {
        this.popup.addClass('hidden');
    } else {
        this.popup.fadeOut(this.app.settings.animation.popup);
    }
};


// events

Valorisation.prototype.addListeners = function() {
    var self = this;
    this.element.main.on('click', function(){
        self.openPopup();
    });
    this.element.main.on('mouseover', function(){
        self.hover();
    });
    this.element.main.on('mouseout', function(){
        self.hoverOut();
    });
};

Valorisation.prototype.hover = function() {
    for (var i = 0, l = this.app.valorisations.length; i < l; i++) {
        var valorisation = this.app.valorisations[i];
        if (valorisation !== this) {
            valorisation.fade();
            valorisation.button.legend.normal();
        } else {
            valorisation.normal();
            valorisation.button.legend.highlight();
        }
    }
};

Valorisation.prototype.hoverOut = function() {
    for (var i = 0, l = this.app.valorisations.length; i < l; i++) {
        var valorisation = this.app.valorisations[i];
        valorisation.normal();
        valorisation.button.legend.normal();
    }
};


Valorisation.prototype.fade = function() {
    $(this.element.sub[0]).css('opacity', 0.2);
};

Valorisation.prototype.normal = function() {
    $(this.element.sub[0]).css('opacity', 1);
};

// helpers

Valorisation.prototype.getSidestreams = function(ids) {
    var sidestreams = [];
    for (var i = 0, l = ids.length; i < l; i++) {
        var sidestream = this.app.sidestreams[ids[i]];
        sidestreams.push(sidestream);
    }
    return sidestreams;
};

Valorisation.prototype.hasSidestream = function(sidestreams) {
    for (var i = 0, l = sidestreams.length; i < l; i++) {
        var sidestream = sidestreams[i];
        if (this.sidestreams.indexOf(sidestream) > -1){
            return true;
        }
    }
    return false;
};

Valorisation.prototype.show = function() {
    var self = this;
    $(this.element.main[0]).animate({
        opacity: 1
    }, self.app.settings.animation.valorisation, function() {});
    if (this.button.legend) {
        $(this.button.legend.element).animate({
            opacity: 1
        }, self.app.settings.animation.valorisation, function () {
        });
    }
};

Valorisation.prototype.hide = function() {
    var self = this;
    $(this.element.main[0]).animate({
        opacity: 0
    }, self.app.settings.animation.valorisation, function() {});
    if (this.button.legend) {
        $(this.button.legend.element).animate({
            opacity: 0
        }, self.app.settings.animation.valorisation, function () {
        });
    }
};