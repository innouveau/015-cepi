function Valorisation(app, valorisation) {
    this.id = valorisation.id;
    this.app = app;
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
    var element = this.app.canvas.valorisationContainer.append('g').attr({
            class: 'valorisation valorisation-' + this.id,
            transform: 'translate(' + this.position.x + ',' + this.position.y + ')'
        }),
        p = 0.5 * this.app.settings.radar.r,
        liveSidestreams = this.getLiveSidestreams();
    // hit area
    element.append('circle').attr({
        r: p,
        cx: p,
        cy: p,
        fill: '#fff'
    });
    for (var i = 0; i < 4; i++) {
        var r = p - i * 5,
            circle = new Circle(this.app, this, element, r, p);
        circle.updateSubCircles(liveSidestreams);
        this.circles.push(circle);
    }
    return element;
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
        if (liveSidestreams.length !== this.liveSidestreams.length) {
            // 1. close
            this.cover.close();
            // 2. change radar
            setTimeout(function () {
                for (var i = 0, l = self.circles.length; i < 4; i++) {
                    self.circles[i].updateSubCircles(liveSidestreams);
                }
            }, this.app.settings.radar.animation);
            // 3. open
            setTimeout(function () {
                self.cover.open();
            }, (this.app.settings.radar.animation * 1.2));
            // 4. update state
            this.liveSidestreams = liveSidestreams;
        }
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
        x: this.tlr * this.app.settings.bottomFrame.width / 10,
        y: (10 - this.value) * this.app.settings.bottomFrame.height / 10
    }
};

// popup

Valorisation.prototype.createPopup = function() {
    var div = $('<div class="valoriation-popup"><h2>' + this.name + '</h2>' + this.description + '<img src="images/' + this.image + '"></div>'),
        economicDescription = $('<div class="economic-description"><b>Economic</b><p>' + this.economicDescription + '</p></div>'),
        trlDescription = $('<div class="trl-description"><b>TRL</b><p>' + this.trlDescription + '</p></div>'),
        closeButton = $('<div class="close-button">Close</div>'),
        self = this;
    div.append(economicDescription);
    div.append(trlDescription);
    div.append(closeButton);
    closeButton.click(function(){
        self.closePopup();
    });
    $('body').append(div);
    return div;
};

Valorisation.prototype.openPopup = function() {
    $('.valoriation-popup').hide();
    this.popup.fadeIn(this.app.settings.animation.popup);
};

Valorisation.prototype.closePopup = function() {
    this.popup.fadeOut(this.app.settings.animation.popup);
};


// events

Valorisation.prototype.addListeners = function() {
    var self = this;
    this.element.on('click', function(){
        self.openPopup();
    });
    this.element.on('mouseover', function(){
        self.hover();
    });
    this.element.on('mouseout', function(){
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


Valorisation.prototype.show = function() {
    $(this.element[0]).fadeIn(this.app.settings.animation.valorisation);
};

Valorisation.prototype.hide = function() {
    $(this.element[0]).fadeOut(this.app.settings.animation.valorisation);
};

Valorisation.prototype.fade = function() {
    $(this.element[0]).css('opacity', 0.2);
};

Valorisation.prototype.normal = function() {
    $(this.element[0]).css('opacity', 1);
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
    $(this.element[0]).fadeIn(1000);
};

Valorisation.prototype.hide = function() {
    $(this.element[0]).fadeOut(1000);
};