import Phaser from 'phaser'
import { SCENE_KEYS } from '../../constants/scene-keys'
import { VIEWPORT } from '../../constants/viewport';

const numHurdles = 10;
const hurdleSpacing = 250;
const worldWidth = (numHurdles + 1) * hurdleSpacing;
const groundY = VIEWPORT.HEIGHT - 96;

class Player {
  sprite: Phaser.Physics.Arcade.Sprite;
  hasJumped: boolean;

  constructor(scene: HurdlesScene) {
    this.hasJumped = false;

    this.sprite = scene.physics.add.sprite(20, VIEWPORT.HEIGHT - 96 - 16, 'virtual-guy');
    this.sprite.anims.play('virtual-guy-idle');
    scene.physics.add.collider(this.sprite, scene.ground);

    (this.sprite.body as Phaser.Physics.Arcade.Body)
      .setGravity(0, 400)
      .setAccelerationX(100)
      .setMaxSpeed(600)
      .setBounce(0.2, 0.2)
      .setCollideWorldBounds(true);

    const jump = () => {
      if (this.hasJumped) return;

      this.hasJumped = true;
      this.sprite.setVelocityY(-150);
    }
    scene.input.on('pointerdown', jump);
    scene.input.keyboard.on('keydown-SPACE', jump)

    scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.input.off('pointerdown', jump);
      scene.input.keyboard.off('keydown-SPACE', jump)

      this.sprite.destroy();
    });
  }

  update() {
    if (this.sprite.body.touching.down) {
      this.hasJumped = false;
    }
  }
}

export class HurdlesScene extends Phaser.Scene {
  player!: Player;
  ground!: Phaser.GameObjects.TileSprite;
  hurdles!: Phaser.Physics.Arcade.Sprite[];
  background!: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: SCENE_KEYS.games.HURDLES });
  }

  create() {
    this.createTrack();
    this.addPlayers();
    this.addPhysics();

    this.cameras.main.setBounds(0, 0, worldWidth, VIEWPORT.HEIGHT);
    this.cameras.main.startFollow(this.player.sprite);
  }

  update() {
    this.background.tilePositionX = this.cameras.main.scrollX * 0.6;

    this.player.update();
  }

  private createTrack() {
    this.background = this.add.tileSprite(0, 0, VIEWPORT.WIDTH, VIEWPORT.HEIGHT, 'background-blue')
      .setOrigin(0)
      .setScrollFactor(0);

    this.ground = this.add.tileSprite(0, groundY, worldWidth, 96, 'hurdles-ground')
      .setOrigin(0);

    this.hurdles = Array.from({ length: numHurdles }, (v, i) => {
      return this.physics.add.sprite((i + 1) * hurdleSpacing, groundY - 8, 'hurdles-hurdle')
    });
  }

  private addPlayers() {
    this.player = new Player(this);
  }

  private addPhysics() {
    this.physics.world.setBounds(0, 0, worldWidth, VIEWPORT.HEIGHT);

    this.physics.add.existing(this.ground);
    (this.ground.body as Phaser.Physics.Arcade.Body).immovable = true;
    (this.ground.body as Phaser.Physics.Arcade.Body).allowGravity = false;

    this.hurdles.forEach(hurdle => {
      (hurdle.body as Phaser.Physics.Arcade.Body)
        .setGravityY(400)
        .setCollideWorldBounds(true)
        .setDragX(200);

      this.physics.add.collider(hurdle, this.ground);
      this.physics.add.collider(hurdle, this.player.sprite, () => {
        hurdle.setVelocityX(Phaser.Math.RND.between(100, 200));
        if (!hurdle.body.touching.up) {
          hurdle.setVelocityY(Phaser.Math.RND.between(-150, -250));
        }
      });
    });
  }
}
