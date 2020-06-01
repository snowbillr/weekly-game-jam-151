export class Timer {
  private scene: Phaser.Scene;
  private timer: Phaser.Time.TimerEvent;
  private startTime: number;

  text: Phaser.GameObjects.BitmapText;


  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.text = scene.add.bitmapText(x, y, 'matchup-36-white', '00:00')
      .setOrigin(0.5);
    this.startTime = 0;

    this.timer = scene.time.addEvent({
      loop: true,
      delay: 10,
      paused: true,
      callback: () => this.tick()
    });
  }

  start() {
    this.startTime = this.scene.time.now;

    this.timer.paused = false;
  }

  tick() {
    const elapsedTime = this.scene.time.now - this.startTime;

    const seconds = Phaser.Math.RoundTo(elapsedTime / 1000, -2);
    const minutes = Math.round(seconds / 60);

    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).split('.')[0].padStart(2, '0');
    const displayHundredths = String(seconds).split('.')[1].padStart(2, '0');

    this.text.setText(`${displayMinutes}:${displaySeconds}.${displayHundredths}`);
  }

  getSeconds() {

  }
}
