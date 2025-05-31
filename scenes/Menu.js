export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu-scene");
  }

  preload() {
    this.load.image("sky", "./public/assets/texture.png");
  }

  create() {
    this.add.image(0, 0, "sky").setOrigin(0).setDisplaySize(2020, 1400);

    this.add.text(192, 120, "JOVEN AVENTURERO", {
      fontSize: "32px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });

    this.add.text(178, 220, "Presiona ENTER para jugar", {
      fontSize: "22px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });

    this.add.text(190, 285, "Presiona ESC para salir", {
      fontSize: "22px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });

    // Capturar teclas ENTER y ESC
    this.input.keyboard.on("keydown-ENTER", () => {
      this.scene.start("Nivel1");
    });

    this.input.keyboard.on("keydown-ESC", () => {
      this.game.destroy(true);
      window.close();
    });
  }
}