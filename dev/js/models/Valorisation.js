function Valorisation(app, valorisation) {
    this.id = valorisation.id;
    this.app = app;
    this.name = valorisation.name;
    this.description = valorisation.description;
    this.size = 60;
    this.sidestreams = valorisation.sidestreams;
    this.tlr = valorisation.tlr;
    this.value =valorisation.value;
    this.position = this.getPosition();
    this.element = this.getElement();
    this.popup = this.createPopup();
    this.addListeners();
}

Valorisation.prototype.getPosition = function() {
    return {
        x: this.tlr * this.app.settings.graph.width / 10,
        y: (10 - this.value) * this.app.settings.graph.height / 10
    }
};

Valorisation.prototype.createPopup = function() {
    var div = $('<div class="valoriation-popup"><h2>' + this.name + '</h2>' + this.description + '</div>'),
        closeButton = $('<div class="close-valorisation">Close</div>'),
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
    this.popup.fadeIn(100);
};

Valorisation.prototype.closePopup = function() {
    this.popup.fadeOut(100);
};

Valorisation.prototype.addListeners = function() {
    var self = this;
    this.element.on('click', function(){
        self.openPopup();
    })
};

Valorisation.prototype.getElement = function() {
    var element = this.app.canvas.graph.append('g').attr({
        class: 'valorisation valorisation-' + this.id,
        transform: 'translate(' + this.position.x + ',' + this.position.y + ')'
    });
    element.append('rect').attr({
        width: this.size,
        height: this.size,
        fill: '#fff'
    });
    for (var i = 0, l = this.sidestreams.length; i < l; i++) {
        var sidestream = this.app.sidestreams[this.sidestreams[i]],
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