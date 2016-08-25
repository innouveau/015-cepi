function LegendButton(app, parent, container, rect, text) {
    this.app = app;
    this.parent = parent;
    this.element = {
        container: container,
        rect: rect,
        text: text
    };
    this.addListeners();
}

LegendButton.prototype.addListeners = function() {
    var self = this;
    this.element.container.on('click', function () {
        self.parent.openPopup();
    });
    this.element.container.on('mouseover', function () {
        self.hover();
    });
    this.element.container.on('mouseout', function () {
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
    $(this.element.rect[0]).css('fill', 'transparent');
    $(this.element.text[0]).css('fill', '#aaa');
};

LegendButton.prototype.highlight = function() {
    $(this.element.rect[0]).css('fill', '#aaa');
    $(this.element.text[0]).css('fill', '#000');
};

