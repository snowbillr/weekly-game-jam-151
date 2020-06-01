import { VIEWPORT } from '../constants/viewport';

type BackgroundData = {
  texture: string,
  dx: number,
  dy: number
};

const blacklist = [
  {
    texture: 'background-pink',
    dx: 1,
    dy: -1
  },
  {

    texture: 'background-pink',
    dx: -1,
    dy: 1
  }
];

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
    const backgroundData = this.generateBackgroundData();
    this.tileSprite = scene.add.tileSprite(x, y, width, height, backgroundData.texture)
      .setOrigin(0)
    this.dx = backgroundData.dx;
    this.dy = backgroundData.dy;

    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
    });

    console.log(backgroundData);
  }

  update() {
    this.tileSprite.tilePositionX += this.dx;
    this.tileSprite.tilePositionY += this.dy;
  }

  private generateBackgroundData(): BackgroundData {
    const texture = Phaser.Math.RND.pick([
      'background-blue',
      'background-brown',
      'background-gray',
      'background-green',
      'background-pink',
      'background-purple',
      'background-yellow'
    ]);
    const dx = Phaser.Math.RND.sign() * 1;
    const dy = Phaser.Math.RND.sign() * 1;

    if(
      blacklist.some(bli => bli.texture === texture && bli.dx === dx && bli.dy === dy)
    ) {
      return this.generateBackgroundData();
    }

    return {
      texture: texture,
      dx,
      dy
    }
  }
}
