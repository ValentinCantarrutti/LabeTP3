import Nivel1 from './scenes/Nivel1.js';
import Nivel2 from './scenes/Nivel2.js';
import Game from "./scenes/Game.js";
import Segundaescena from './scenes/Segundaescena.js';


// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 720,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
       gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Nivel1, Nivel2, Game, Segundaescena],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);