import { HurdlesScene } from './hurdles-scene';
import { VIEWPORT } from '../../constants/viewport';
import { CharacterDescriptor, CharacterID, Characters } from '../../constants/characters';

export class HurdlesPlayer {
  character: CharacterDescriptor;
  sprite: Phaser.Physics.Arcade.Sprite;
  hasJumped: boolean;

  constructor(scene: HurdlesScene, characterID: CharacterID) {
    this.character = Characters[characterID];
    this.hasJumped = false;

    this.sprite = scene.physics.add.sprite(20, VIEWPORT.HEIGHT - 96 - 16, this.character.texture);
    this.sprite.anims.play(`${this.character.texture}-run`);
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
      this.sprite.anims.play(`${this.character.texture}-jump`)
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
    if (this.sprite.body.velocity.y > 0) {
      this.sprite.anims.play(`${this.character.texture}-fall`, true)
    }

    if (this.sprite.body.touching.down) {
      this.sprite.anims.play(`${this.character.texture}-run`, true)
      this.hasJumped = false;
    }
  }
}
