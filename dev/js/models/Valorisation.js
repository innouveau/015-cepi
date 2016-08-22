function Valorisation(app, valorisation) {
    this.id = valorisation.id;
    this.app = app;
    this.name = valorisation.name;
    this.description = valorisation.description;
    this.image = valorisation.image;
    this.size = 40;
    this.sidestreams = this.getSidestreams(valorisation.sidestreams);
    this.tlr = valorisation.tlr;
    this.value = valorisation.value;
    this.position = this.getPosition();
    this.circles = [];
    this.element = this.getElement();
    this.popup = this.createPopup();
    this.elements = {}; // display is added by Canvas to be able to toggle it
    this.addListeners();
    this.update();

}

Valorisation.prototype = Object.create(_FilterModel.prototype);


Valorisation.prototype.getElement = function() {
    var element = this.app.canvas.valorisationContainer.append('g').attr({
            class: 'valorisation valorisation-' + this.id,
            transform: 'translate(' + this.position.x + ',' + this.position.y + ')'
        }),
        p = 0.5 * this.size,
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
    return element
};

Valorisation.prototype.update = function() {
    var liveSidestreams = this.getLiveSidestreams();
    console.log(liveSidestreams);
    for (var i = 0, l = this.circles.length; i < 4; i++) {
        this.circles[i].updateSubCircles(liveSidestreams);
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

Valorisation.prototype.hasSidestream = function(sidestreams) {
    for (var i = 0, l = sidestreams.length; i < l; i++) {
        var sidestream = sidestreams[i];
        if (this.sidestreams.indexOf(sidestream) > -1){
            return true;
        }
    }
    return false;
};