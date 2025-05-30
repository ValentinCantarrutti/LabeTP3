export default class NextScene extends Phaser.Scene {
    constructor() {
      super("Segundaescena");
    }
  
init(data) {
  this.scoremax = data.scoremax || 0;
}
    
    preload() {

    
    }
    

    create() {
      this.add.text(100, 100, "¡Bienvenido a la siguiente escena!", { fontSize: "32px", fill: "#fff" });


  this.add.text(100, 150, `Puntuación final: ${this.scoremax}`, {
    fontSize: "28px",
    fill: "#ffffff"
    });
    }
  }