var Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
    this.speed = 100;
}

Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#323323");
}

Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }
Player.prototype.getSpeed = function() { return this.speed; }

Player.prototype.handleEvent = function(e) {
    var keyMap = {};
    keyMap[38] = 0;
    keyMap[39] = 2;
    keyMap[40] = 4;
    keyMap[37] = 6;

    var code = e.keyCode;
    if (code === 32) {
        /* External objects acting */
    };

    if (!(code in keyMap)) { return; }

    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    var newKey = newX + "," + newY;

    var glyph = Game.map[this._x + ',' + this._y]
    Game.display.draw(this._x, this._y, glyph.getChar(), glyph.getForeground());

    var newCoords = this._checkBounds(this._x, this._y, newX, newY)
    this._x = newCoords[0];
    this._y = newCoords[1];
    this._draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
}

Player.prototype._checkBounds = function(x, y, newX, newY) {
    if (newX <= -1 || newX >= 80) {
        x;
    } else {
        x = newX;
    };

    if (newY <= -1 || newY >= 25) {
        y;
    } else {
        y = newY;
    }

    return [x,y];
}

Player.prototype.act = function () {
    Game.engine.lock();
    window.addEventListener("keydown", this);
}

Player.prototype._checkRock = function() {
    var key = this._x + "," + this.y;
}
