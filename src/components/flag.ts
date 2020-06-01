type OnPassListener = () => void;

export class Flag {
  sprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.add.sprite(x, y, 'flag');
  }

  playWave() {
    this.sprite.anims.play('flag-wave');
  }

  checkPass(gameObject: Phaser.GameObjects.Sprite) {
    return this.sprite.x < gameObject.x;
  }
}
