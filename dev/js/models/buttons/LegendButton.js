function LegendButton(app, parent) {
    this.app = app;
    this.parent = parent;
    this.element = this.getElement();
    this.addListeners();
}


LegendButton.prototype.getElement = function() {
    var button = $('<div class="legend-button">' + this.parent.name + '</div>');
    this.parent.parent.element.append(button);
    return button;
};


LegendButton.prototype.addListeners = function() {
    var self = this;
    this.element.on('click', function () {
        self.parent.openPopup();
    });
    this.element.on('mouseover', function () {
        self.hover();
    });
    this.element.on('mouseout', function () {
        self.hoverOut();
    });
};

LegendButton.prototype.hover = function() {
    for (var i = 0, l = this.app.valorisations.length; i < l; i++) {
        var valorisation = this.app.valorisations[i];
        if (valorisation !== this.parent) {
            valorisation.fade();
            valorisation.button.legend.normal();
        } else {
            valorisation.normal();
            valorisation.button.legend.highlight();
        }
    }
};

LegendButton.prototype.hoverOut = function() {
    for (var i = 0, l = this.app.valorisations.length; i < l; i++) {
        var valorisation = this.app.valorisations[i];
        valorisation.normal();
        valorisation.button.legend.normal();
    }
};

LegendButton.prototype.normal = function() {
    $(this.element).css('background', 'transparent');
};

LegendButton.prototype.highlight = function() {
    $(this.element).css('background', '#aaa');
};

