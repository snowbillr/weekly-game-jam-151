import { CharacterID, Characters } from '../constants/characters';

type CharacterAnimation = 'idle' | 'run' | 'jump' | 'fall';

export class Character {
  sprite: Phaser.GameObjects.Sprite;
  id: CharacterID;

  constructor(scene: Phaser.Scene, x: number, y: number, characterID: CharacterID) {
    const spriteTexture = Characters[characterID].texture;
    this.sprite = scene.add.sprite(x, y, spriteTexture);

    this.id = characterID;
  }

  playAnimation(animation: CharacterAnimation) {
    const animationName = `${Characters[this.id].texture}-${animation}`;
    this.sprite.anims.play(animationName, true);
  }
}
