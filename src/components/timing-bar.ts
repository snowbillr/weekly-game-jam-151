export class TimingBar {
  private scene: Phaser.Scene;

  private selectorTween: Phaser.Tweens.Tween;

  container: Phaser.GameObjects.Container;
  bar: Phaser.GameObjects.Sprite;
  greenZone: Phaser.GameObjects.Rectangle;
  selector: Phaser.GameObjects.Rectangle;


  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.container = scene.add.container(x, y, [
      this.bar = scene.add.sprite(0, 0, 'timing-bar'),
      this.greenZone = scene.add.rectangle(0, 0, 100, this.bar.height - 14, 0x72a11d),
      this.selector = scene.add.rectangle(-this.bar.width / 2 + 7, 0, 5, this.bar.height - 14, 0xe1f394)
    ]);

    this.selectorTween = this.scene.tweens.add({
      targets: this.selector,
      props: {
        x: this.bar.width / 2 - 7
      },
      yoyo: true,
      loop: -1,
      duration: 1000,
      paused: true
    });
  }

  select() {
    const greenZoneBounds = {
      left: this.greenZone.x - this.greenZone.width / 2,
      right: this.greenZone.x + this.greenZone.width / 2,
    }

    if (greenZoneBounds.left <= this.selector.x && this.selector.x <= greenZoneBounds.right) {
      return true;
    } else {
      return false;
    }
  }

  animateSelector() {
    this.selectorTween.play();
  }
}
