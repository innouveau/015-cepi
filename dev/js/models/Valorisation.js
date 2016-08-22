function Valorisation(app, valorisation) {
    this.id = valorisation.id;
    this.app = app;
    this.name = valorisation.name;
    this.description = valorisation.description;
    this.image = valorisation.image;
    this.size = 60;
    this.sidestreams = this.getSidestreams(valorisation.sidestreams);
    this.tlr = valorisation.tlr;
    this.value =valorisation.value;
    this.position = this.getPosition();
    this.element = this.getElement();
    this.popup = this.createPopup();
    this.visible = true;
    this.elements = {}; // display is added by Canvas to be able to toggle it
    this.addListeners();
}

Valorisation.prototype = Object.create(_FilterModel.prototype);

Valorisation.prototype.getPosition = function() {
    return {
        x: this.tlr * this.app.settings.bottomFrame.width / 10,
        y: (10 - this.value) * this.app.settings.bottomFrame.height / 10
    }
};

Valorisation.prototype.createPopup = function() {
    var div = $('<div class="valoriation-popup"><h2>' + this.name + '</h2>' + this.description + '<img src="images/' + this.image + '"></div>'),
        closeButton = $('<div class="close-button">Close</div>'),
        self = this;
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

Valorisation.prototype.addListeners = function() {
    var self = this;
    this.element.on('click', function(){
        self.openPopup();
    })
};

Valorisation.prototype.getSidestreams = function(ids) {
    var sidestreams = [];
    for (var i = 0, l = ids.length; i < l; i++) {
        var sidestream = this.app.sidestreams[ids[i]];
        sidestreams.push(sidestream);
    }
    return sidestreams;
};

Valorisation.prototype.getElement = function() {
    var element = this.app.canvas.valorisationContainer.append('g').attr({
        class: 'valorisation valorisation-' + this.id,
        transform: 'translate(' + this.position.x + ',' + this.position.y + ')'
    }),
        p = 0.5 * this.size;
    element.append('circle').attr({
        r: p,
        cx: p,
        cy: p,
        fill: '#fff'
    });
    for (var i = 0, l = this.sidestreams.length; i < l; i++) {
        var sidestream = this.sidestreams[i],
            r = (this.size / 2) - i * 3;
        element.append('circle').attr({
            class: 'valorisation-sidestream',
            r: r,
            cx: this.size / 2,
            cy: this.size / 2,
            stroke: sidestream.color,
            fill: 'none',
            'stroke-width': 2
        })
    }
    return element
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
    $(this.element[0]).fadeIn(this.app.settings.animation.valorisation);
};

Valorisation.prototype.hide = function() {
    $(this.element[0]).fadeOut(this.app.settings.animation.valorisation);
};