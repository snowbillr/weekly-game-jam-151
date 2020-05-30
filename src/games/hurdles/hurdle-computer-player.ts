import { HurdlesScene } from './hurdles-scene';
import { VIEWPORT } from '../../constants/viewport';
import { CharacterID, Characters, CharacterDescriptor } from '../../constants/characters';

export class HurdlesComputerPlayer {
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

    scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
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
    } else {
      const shouldJump = Phaser.Math.RND.pick([true, false, false]);
      if (shouldJump && !this.hasJumped) {
        this.hasJumped = true;
        this.sprite.anims.play(`${this.character.texture}-jump`)
        this.sprite.setVelocityY(-150);
      }
    }
  }
}
