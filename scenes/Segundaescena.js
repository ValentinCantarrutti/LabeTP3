export default class NextScene extends Phaser.Scene {
  constructor() {
    super("Segundaescena");
  }

  init(data) {
    this.scoremax = data?.scoremax || 0; // Uso de "data?" para evitar errores si data es undefined
  }

  preload() {
    this.load.image("sky", "./public/assets/texture.png");
  }

  create() {
    const worldWidth = 2020;
    const worldHeight = 1400;

    this.sky = this.add.image(0, 0, "sky").setOrigin(0);
    this.sky.setDisplaySize(worldWidth, worldHeight);

    this.add.text(192, 120, "Victoria", {
      fontSize: "64px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 6,
    });

    this.add.text(
      115,
      220,
      "Completaste las mazmorras y obtuviste sus tesoros.",
      {
        fontSize: "16px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      }
    );

    this.add.text(175, 280, `Puntuación final: ${this.scoremax}`, {
      fontSize: "32px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });

    this.add.text(215, 325, `Reinicie con R`, {
      fontSize: "32px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });

    this.add.text(142, 370, `Vuelve al menú con ESC`, {
      fontSize: "32px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });


    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.scene.start("Nivel1");
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
      this.scene.start("menu-scene");
    }
  }
}