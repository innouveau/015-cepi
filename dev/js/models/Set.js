function Set(app, set) {
    this.app = app;
    this.name = set.name;
    this.children = [];
    this.element = this.create();
}

Set.prototype.create = function() {
    var div = $('<div class="legend-set"><div class="legend-header">' + this.name + '</div></div>'),
        children = $('<div class="legend-children"></div>');
    div.append(children);
    $('.legend').append(div);
    return children;
};


