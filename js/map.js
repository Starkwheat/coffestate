    Game._generateMap = function () {
    this.map = {};
    var chosenCells = [];
    var allCells = [];

    var wid = 80, hei = 25;
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

            this.map[key] = Game.Tile.rockTile;
        } else {
            var key = x + "," + y;
            Game.freeCells.push(key);
            allCells.push(key);
            this.map[key] = Game.Tile.floorTile;
            };
        };

    mapGenerate.create(cellCallback.bind(this));
    this._setWood(Game.freeCells);
    this._drawMap();
    this.player = this._createEntity(Player, Game.freeCells, 3, 10);
}

Game._drawMap = function() {
    for (var key in this.map) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.display.draw(x, y, this.map[key].getChar(), this.map[key].getForeground());
    };
}

Game._setWood = function() {
    for (var i = 0; i < 5; i++) {
        var index = Math.floor(ROT.RNG.getUniform() * Game.freeCells.length);
        var key = Game.freeCells.splice(index, 1)[0];
        var parts = key.split(",");

        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);

        var woodWid = 10, woodHei = 10;
        var newKey = "0,0";
        var choices = [Game.Tile.floorTile, Game.Tile.woodenTile, Game.Tile.woodenTile, Game.Tile.woodenTile];

        for (var j = 0; j < woodWid; j++) {
            for(var k = 0; k < woodHei; k++) {
                y += 1;
                newKey = x + ',' + y;
                if(this.map[newKey]) {
                    this.map[newKey] = choices.random();
                };
            };
            y -= 10;
            x+=1;

            newKey = x + ',' + y;
            if(this.map[newKey]) {
                this.map[newKey] = choices.random();
            };
        }

        overClutter(x, y);
    }
}

var overClutter = function (x,y) {
    while ((Math.floor(ROT.RNG.getUniform() * 50)) > 5) {
        x = [-1, 1].random() + x;
        y = [-1, 1].random() + y;

        if (x >= 79)  {
            x = 79;
        } else if (x <= 0) {
            x = 0;
        };

        if (y >= 24) {
            y = 24;
        } else if (y <= 0) {
            y = 0;
        }

        var neighbor = x + ',' + y;
        if(Game.map[neighbor] != Game.Tile.rockTile) {
            Game.map[neighbor] = Game.Tile.woodenTile;
        };
    };
}
