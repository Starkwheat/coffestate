var Coffee = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
    this.speed = 200;
}

Coffee.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "U", "#131313");
}

Coffee.prototype.getX = function() { return this._x; }
Coffee.prototype.getY = function() { return this._y; }
Coffee.prototype.getSpeed = function() { return this.speed; }

Coffee.prototype.handleEvent = function(e) {
    var glyph = Game.map[this._x + ',' + this._y]
    Game.display.draw(this._x, this._y, glyph.getChar(), glyph.getForeground());
    this._draw();
}
