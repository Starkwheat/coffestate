Game.Tile = function(properties) {
    properties = properties || {};
    Game.Glyph.call(this, properties);
    this._target = properties['target'] || false;
};

Game.Tile.extend(Game.Glyph);

Game.Tile.prototype.isTarget = function() {
    return this._target;
}

Game.Tile.floorTile = new Game.Tile({"character": ' '});
Game.Tile.woodenTile = new Game.Tile({"character": '#', "foreground": "#663300"})
Game.Tile.rockTile = new Game.Tile({"character": '¤', "foreground": "#BBBBBB"})
