var Game = {
    display: null,
    currentScreen: null,
    player: null,
    status: null,
    engine: null,
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

Game._reset = function() {
    Game.defeat = false;
    Game.scheduler.clear();
    Game.display.clear();
    Game.player = null;
    Game.map = null;
    Game.freeCells = [];
}
