import { Character } from '../../components/character';
import { HurdlesScene } from './hurdles-scene';
import { CharacterID } from '../../constants/characters';
import { VIEWPORT } from '../../constants/viewport';

export class HurdleCharacter {
  private scene: Phaser.Scene;
  private body: Phaser.Physics.Arcade.Body;

  character: Character;
  hasJumped: boolean;
  autoJumpScheduled: boolean;

  constructor(scene: HurdlesScene, characterID: CharacterID) {
    this.scene = scene;
    this.character = new Character(scene, 20, VIEWPORT.HEIGHT - 96 - 16, characterID);
    this.hasJumped = false;
    this.autoJumpScheduled = false;

    scene.physics.add.existing(this.character.sprite);
    this.body = this.character.sprite.body as Phaser.Physics.Arcade.Body;
    this.body
      .setGravity(0, 400)
      .setAccelerationX(100)
      .setMaxSpeed(600)
      .setBounce(0.2, 0.2)
      .setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
  }

  jump() {
    if (this.hasJumped) return;

    this.hasJumped = true;
    this.body.setVelocityY(-150);
    this.character.playAnimation('jump');
  }

  autoJump() {
    if (this.autoJumpScheduled) return;

    this.autoJumpScheduled = true;

    this.scene.time.delayedCall(Phaser.Math.Between(650, 1250), () => {
      this.jump();
      this.autoJumpScheduled = false;
    });
  }

  update() {
    if (this.body.velocity.y > 0) {
      this.character.playAnimation('fall');
    }

    if (this.body.touching.down) {
      this.character.playAnimation('run');
      this.hasJumped = false;
    }
  }
}
