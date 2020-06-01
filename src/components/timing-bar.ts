export class TimingBar {
  private scene: Phaser.Scene;

  private selectorTween: Phaser.Tweens.Tween;
  private greenZoneTween: Phaser.Tweens.Tween;

  container: Phaser.GameObjects.Container;
  bar: Phaser.GameObjects.Sprite;
  greenZone: Phaser.GameObjects.Rectangle;
  selector: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    const greenZoneWidth = Phaser.Math.RND.between(80, 120);
    this.container = scene.add.container(x, y, [
      this.bar = scene.add.sprite(0, 0, 'timing-bar'),
      this.greenZone = scene.add.rectangle(this.bar.width / 2 - 7 - greenZoneWidth, 0, greenZoneWidth, this.bar.height - 14, 0x72a11d).setOrigin(0, 0.5),
      this.selector = scene.add.rectangle(-this.bar.width / 2 + 7, 0, 5, this.bar.height - 14, 0xe1f394)
    ]);

    this.selectorTween = this.scene.tweens.add({
      targets: this.selector,
      props: {
        x: this.bar.width / 2 - 7
      },
      yoyo: true,
      loop: -1,
      duration: Phaser.Math.RND.between(800, 1200),
      paused: true
    });

    this.greenZoneTween = this.scene.tweens.add({
      targets: this.greenZone,
      props: {
        x: -this.bar.width / 2 + 7
      },
      yoyo: true,
      loop: -1,
      duration: Phaser.Math.RND.between(800, 1200),
      paused: true
    });
  }

  select() {
    const greenZoneBounds = {
      left: this.greenZone.x,
      right: this.greenZone.x + this.greenZone.width,
    }

    if (greenZoneBounds.left <= this.selector.x && this.selector.x <= greenZoneBounds.right) {
      return true;
    } else {
      return false;
    }
  }

  start() {
    this.selectorTween.play();
    this.greenZoneTween.play();
  }
}
