import { VIEWPORT } from '../constants/viewport';

export class Background {
  public tileSprite: Phaser.GameObjects.TileSprite;
  private dx: number;
  private dy: number;

  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    width: number = VIEWPORT.WIDTH,
    height: number = VIEWPORT.HEIGHT
  ) {
    const backgroundTexture = Phaser.Math.RND.pick([
     'background-blue',
     'background-brown',
     'background-gray',
     'background-green',
     'background-pink',
     'background-purple',
     'background-yellow'
    ]);

    this.tileSprite = scene.add.tileSprite(x, y, width, height, backgroundTexture)
      .setOrigin(0)
    this.dx = Phaser.Math.RND.sign() * 1;
    this.dy = Phaser.Math.RND.sign() * 1;

    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
    });
  }

  update() {
    this.tileSprite.tilePositionX += this.dx;
    this.tileSprite.tilePositionY += this.dy;
  }
}
