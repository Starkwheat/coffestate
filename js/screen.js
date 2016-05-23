Game.Screen = {};

Game.Screen.introScreen = {
    enter: function() {},
    exit: function() {},
    render: function(display) {
        display.drawText(16,1, "%c{brown}Git that Coffee", 40);
    },

    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keycode === ROT.VK_RETURN) {
                Game.switchScreen(Game.screen.playScreen);
            }
        }
    }
}

Game.Screen.playScreen = {
    enter: function() {},
    exit: function() {},
    render: function(display) {
        Game._generateMap();
        Game.scheduler.add(Game.player, true);
        Game.engine = new ROT.Engine(Game.scheduler);
        Game.engine.start();
    },

    handleInput: function(inputType, inputData) {
        if(Game.gameStop == true) {
            Game.switchScreen(Game.Screen.stopScreen);
        }
    }
}

Game.Screen.stopScreen = {
    enter: function() {},
    exit: function() {
        Game._reset();
    },

    render: function(display) {
        display.drawText(16,5, "%c{brown}The coffee.", 40);
    },

    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keycode === ROT.VK_RETURN) {
                Game.switchScreen(Game.screen.introScreen);
            }
        }
    }
}
