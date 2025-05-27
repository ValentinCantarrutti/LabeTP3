export default class NextScene extends Phaser.Scene {
    constructor() {
      super("Segundaescena");
    }
  
    init() {
        this.score = 0;
      }
    
    preload() {

    
    }
    

    create() {
      this.add.text(100, 100, "¡Bienvenido a la siguiente escena!", { fontSize: "32px", fill: "#fff" });


    }
  }