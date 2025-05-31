// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Nivel1 extends Phaser.Scene {
  constructor() {
    super("Nivel1");
  }

  init() {
    this.score = 0;
    this.scoremax= 0;
  }

  preload() {
    this.load.tilemapTiledJSON("map2", "public/assets/tilemap/map2.json");
    this.load.image("tileset", "public/assets/texture.png");
    this.load.image("star", "public/assets/star.png");

    this.load.image("dude", "./public/assets/dude.png");

  }

  create() {
    const map = this.make.tilemap({ key: "map2" });
    
    const tileset = map.addTilesetImage("tileset", "tileset");
    
    const belowLayer = map.createLayer("Fondo", tileset, 0, 0);
    const platformLayer = map.createLayer("Plataformas", tileset, 0, 0);
    const objectsLayer = map.getObjectLayer("Objetos");

    this.objectsLayer = objectsLayer;

    const spawnPoint = map.findObject(
      "Objetos",
      (obj) => obj.name === "player"
    );
    console.log("spawnPoint", spawnPoint);

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
    this.player.setScale(0.08);
    this.player.body.setAllowGravity(false);


    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player); 

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

  

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    platformLayer.setCollisionByProperty({ esColisionable: true });
    this.physics.add.collider(this.player, platformLayer);


    this.stars = this.physics.add.group();


    objectsLayer.objects.forEach((objData) => {
      console.log(objData);
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "star": {

          const star = this.stars.create(x, y, "star");
          star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          break;
        }
      }
    });


    this.physics.add.collider(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    this.physics.add.collider(this.stars, platformLayer);

    this.scoreText = this.add.text(16, 16, `Recolectados: ${this.score}/5`, {
      fontSize: "22px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });

     this.scoremaxText = this.add.text(16, 50, `Puntos: ${this.scoremax}`, {
      fontSize: "22px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });

    const exitZoneData = objectsLayer.objects.find(obj => obj.name === "Llegada" && obj.type === "Escape");


    if (exitZoneData) {
      this.exitZone = this.add.zone(exitZoneData.x, exitZoneData.y, exitZoneData.width, exitZoneData.height);
      this.physics.add.existing(this.exitZone);
      this.exitZone.body.setAllowGravity(false);
      this.exitZone.body.setImmovable(true);
      this.physics.add.overlap(this.player, this.exitZone, this.tryExit, null, this);
    }

  }

  tryExit(player, zone) {
    if (this.score >= 5) {
      this.scene.start("Nivel2", { scoremax: this.scoremax });
    } else {

    }
  }
  

  update() {
  const speed = 160;
  this.player.setVelocity(0); 

  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-speed);
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(speed);
  }

  if (this.cursors.up.isDown) {
    this.player.setVelocityY(-speed);
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(speed);
  }


  if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
    this.scene.start("Nivel1");
  }
}



  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 1;
    this.scoremax += 10;
    this.scoreText.setText(`Recolectados: ${this.score}/5`);
    this.scoremaxText.setText(`Puntos: ${this.scoremax}`);

    if (this.stars.countActive(true) === 0) {

    }
  }
}