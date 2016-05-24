var checkTerrain = function(entity) {
    if (Game.map[entity._x + "," + entity._y] == Game.Tile.floorTile) {
        entity.speed = 50;
    } else if (Game.map[entity._x + "," + entity._y] == Game.tile.woodenTile) {
        entity.speed = 25;
    };
};
