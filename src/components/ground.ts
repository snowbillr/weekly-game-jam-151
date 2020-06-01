import { VIEWPORT } from '../constants/viewport';

type GroundConfig = {
  physics?: boolean
}

export class Ground {
  tileSprite: Phaser.GameObjects.TileSprite;
  body?: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, worldWidth: number, config: GroundConfig = {}) {
    const groundY = VIEWPORT.HEIGHT - 96;
    this.tileSprite = scene.add.tileSprite(0, groundY, worldWidth, 96, 'hurdles-ground')
      .setOrigin(0, 0);

    if (config.physics) {
      scene.physics.add.existing(this.tileSprite);
      this.body = (this.tileSprite.body as Phaser.Physics.Arcade.Body);
      this.body.setImmovable(true);
    }
  }
}
