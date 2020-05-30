import { HurdlesScene } from './hurdles-scene';
import { VIEWPORT } from '../../constants/viewport';

export class HurdlesPlayer {
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

    (this.sprite.body as Phaser.Physics.Arcade.Body).onWorldBounds = true;

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
