function Text(app, parent, text, position, style) {
    this.app = app;
    this.parent = parent;
    this.text = text;
    this.position = position;
    this.style = style;
}

Text.prototype = Object.create(_NodeModel.prototype);


Text.prototype.draw = function() {
    // this.parent.canvas.texts.ctx.font = this.style.font;
    // this.parent.canvas.texts.ctx.fillStyle = this.style.color;
    // this.parent.canvas.texts.ctx.fillText(this.text, this.position.x + this.parent.position.x, this.position.y + this.parent.position.y + 5);
};