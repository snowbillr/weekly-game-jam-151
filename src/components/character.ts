import { CharacterID, Characters } from '../constants/characters';

export class Character {
  sprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, characterID: CharacterID) {
    const spriteTexture = Characters[characterID].texture;
    this.sprite = scene.add.sprite(x, y, spriteTexture);
  }
}
