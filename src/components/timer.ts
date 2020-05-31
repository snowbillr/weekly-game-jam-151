export class Timer {
  private scene: Phaser.Scene;
  private timer: Phaser.Time.TimerEvent;
  private seconds: number;

  text: Phaser.GameObjects.BitmapText;


  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.text = scene.add.bitmapText(x, y, 'matchup-36-white', '00:00')
      .setOrigin(0.5);
    this.seconds = 0;

    this.timer = scene.time.addEvent({
      loop: true,
      delay: 1000,
      paused: true,
      callback: () => this.tick()
    });
  }

  start() {
    this.timer.paused = false;
  }

  tick() {
    this.seconds += 1;

    const minutes = Math.round(this.seconds / 60);
    const seconds = this.seconds % 60;

    this.text.setText(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
  }

  getSeconds() {

  }
}
