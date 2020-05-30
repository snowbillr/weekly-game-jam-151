import Phaser from 'phaser'
import { SCENE_KEYS } from '../../constants/scene-keys'
import { VIEWPORT } from '../../constants/viewport';
import { HurdlesPlayer } from './hurdles-player';
import { CharacterID } from '../../scenes/game-results-scene';

const numHurdles = 10;
const hurdleSpacing = 250;
const worldWidth = (numHurdles + 1) * hurdleSpacing;
const groundY = VIEWPORT.HEIGHT - 96;

export class HurdlesScene extends Phaser.Scene {
  player!: HurdlesPlayer;
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
    this.addWinCondition();

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
    this.player = new HurdlesPlayer(this);
  }

  private addPhysics() {
    this.physics.world.setBounds(0, 0, worldWidth, VIEWPORT.HEIGHT);
    this.physics.world.setBoundsCollision(false, true, false, false);

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

  addWinCondition() {
    this.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_BOUNDS, () => {
      this.scene.start(SCENE_KEYS.GAME_RESULTS, { first: CharacterID.VIRTUAL_GUY });
    });
  }
}
