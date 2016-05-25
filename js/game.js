var Game = {
    display: null,
    currentScreen: null,
    player: null,
    coffee: null,
    status: null,
    engine: null,
    victory: false,
    scheduler: new ROT.Scheduler.Speed(),
    freeCells: [],

    init: function() {
        this.display = new ROT.Display();
        this.display.setOptions({
            fontSize: 20,
            bg: "#4E4E4E",
        });

        var game = this;
        var bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                if (game.currentScreen !== null) {
                    game.currentScreen.handleInput(event, e);
                }
            });
        }
        bindEventToScreen('keydown');
        bindEventToScreen('keyup');
        bindEventToScreen('keypress')

        document.body.appendChild(this.display.getContainer());
        Game.switchScreen(Game.Screen.introScreen);
    },

    getDisplay: function() {
        return this.display;
    },

    switchScreen: function(screen) {
        if (this.currentScreen !== null) {
            this.currentScreen.exit();
        };

        this.getDisplay().clear();

        this.currentScreen = screen;
        if (!this.currentScreen !== null) {
            this.currentScreen.enter();
            this.currentScreen.render(this.display);
        };
    }
}

Game._createEntity = function(placeholder, freeCells, x, y) {
    if (!x) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0])
        var y = parseInt(parts[1])
    }
    freeCells = _.without(freeCells, _.findWhere(freeCells, x+','+y)); // If actors exist.
    return new placeholder(x, y);
}

Game._reset = function() {
    Game.victory = false;
    Game.scheduler.clear();
    Game.display.clear();
    Game.player = null;
    Game.map = null;
    Game.freeCells = [];
}
