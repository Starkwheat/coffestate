Game._generateMap = function () {
    this.map = {
        var chosenCells = [];
        var allCells = [];

        var wid = 80, h = 30;
        var mapGenerate = new ROT.Map.Cellular(wid, hei, {
            born: [4, 5, 6, 7, 8],
            survive: [2, 3, 4, 5]
        });
        mapGenerate.randomize(0.8);

        var cellCallback = function(x, y, value) {
            if (value) {
                var key = x + "," + y;
                chosenCells.push(key);
                allCells.push(key);

                this.map[key] = Game.Tile.woodenTile;
            } else {
                    var key = x + "," + y;
                    Game.freeCells.push(key);
                    allCells.push(key);
                    this.map[key] = Game.tile.floorTile;
            };
        };

        mapGenerate.create(cellCallback.bind(this));
        this._setWood(Game.freeCells);
        this._drawMap();
        this.player = this._createEntity(Player, Game.freeCells, 3, 10);
    }
}

Game._drawMap = function() {
    for (var key in this.map) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.display.draw(x, y, this.map[key].getChar(), this.map[key].getForeground());
    };
}
