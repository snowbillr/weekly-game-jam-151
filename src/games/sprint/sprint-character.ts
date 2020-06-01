import { Character } from '../../components/character';
import { CharacterID } from '../../constants/characters';

export class SprintCharacter {
  private body: Phaser.Physics.Arcade.Body;

  character: Character;

  constructor(scene: Phaser.Scene, x: number, y: number, id: CharacterID) {
    this.character = new Character(scene, x, y, id);

    scene.physics.add.existing(this.character.sprite);
    this.body = (this.character.sprite.body as Phaser.Physics.Arcade.Body);

    this.body.setGravityY(400);
    this.body.collideWorldBounds = true;
    this.body.setBounce(0.2, 0);

    this.character.playAnimation('run');
  }

  incrementVelocity(value = 100) {
    this.body.velocity.x += value;
  }

  decrementVelocity(value = 100) {
    this.body.velocity.x -= value;
  }
}
