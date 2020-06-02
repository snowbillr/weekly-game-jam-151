import { VIEWPORT } from '../constants/viewport';
import { SCENE_KEYS } from '../constants/scene-keys';
import { OneButtonOlympicsScene } from './one-button-olympics-scene';
import { EventCompletionDocument } from '../persistence/event-completion-document';

export class PreloadScene extends OneButtonOlympicsScene {
  constructor() {
    super({ key: SCENE_KEYS.PRELOAD });
  }

  init() {
    this.persistence.addDocument(new EventCompletionDocument());
  }

  preload() {
    this.cameras.main.setBackgroundColor(0x3D253B);
    this.setUpProgressBar();

    this.load.audio('music/event-results', ['assets/music/event-results.mp3', 'assets/music/event-results.ogg']);
    this.load.audio('music/final-results', ['assets/music/final-results.mp3', 'assets/music/final-results.ogg']);
    this.load.audio('music/other-event', ['assets/music/other-event.mp3', 'assets/music/other-event.ogg']);
    this.load.audio('music/race', ['assets/music/race.mp3', 'assets/music/race.ogg']);
    this.load.audio('music/title', ['assets/music/title.mp3', 'assets/music/title.ogg']);

    this.load.bitmapFont('matchup-64-glow', 'assets/fonts/matchup-64-glow.png', 'assets/fonts/matchup-64-glow.xml');
    this.load.bitmapFont('matchup-48', 'assets/fonts/matchup-48.png', 'assets/fonts/matchup-48.xml');
    this.load.bitmapFont('matchup-24-white', 'assets/fonts/matchup-24-white.png', 'assets/fonts/matchup-24-white.xml');
    this.load.bitmapFont('matchup-36-white', 'assets/fonts/matchup-36-white.png', 'assets/fonts/matchup-36-white.xml');

    this.load.image('background-blue', 'assets/pack/Background/Blue.png');
    this.load.image('background-brown', 'assets/pack/Background/Brown.png');
    this.load.image('background-gray', 'assets/pack/Background/Gray.png');
    this.load.image('background-green', 'assets/pack/Background/Green.png');
    this.load.image('background-pink', 'assets/pack/Background/Pink.png');
    this.load.image('background-purple', 'assets/pack/Background/Purple.png');
    this.load.image('background-yellow', 'assets/pack/Background/Yellow.png');

    this.load.image('trophy', 'assets/trophy.png');
    this.load.image('green-check', 'assets/green-check.png');

    this.load.image('podium-first', 'assets/podiums/first.png');
    this.load.image('podium-second', 'assets/podiums/second.png');
    this.load.image('podium-third', 'assets/podiums/third.png');

    this.load.animation('virtual-guy-animations', 'assets/characters/virtual-guy.animations.json');
    this.load.spritesheet('virtual-guy', 'assets/characters/virtual-guy.png', { frameWidth: 32, frameHeight: 32 });
    this.load.animation('mask-dude-animations', 'assets/characters/mask-dude.animations.json');
    this.load.spritesheet('mask-dude', 'assets/characters/mask-dude.png', { frameWidth: 32, frameHeight: 32 });
    this.load.animation('ninja-frog-animations', 'assets/characters/ninja-frog.animations.json');
    this.load.spritesheet('ninja-frog', 'assets/characters/ninja-frog.png', { frameWidth: 32, frameHeight: 32 });
    this.load.animation('pink-man-animations', 'assets/characters/pink-man.animations.json');
    this.load.spritesheet('pink-man', 'assets/characters/pink-man.png', { frameWidth: 32, frameHeight: 32 });

    this.load.image('timing-bar', 'assets/timing-bar.png');
    this.load.spritesheet('flag', 'assets/components/flag.png', { frameWidth: 64, frameHeight: 64 });
    this.load.animation('flag-animations', 'assets/components/flag.animations.json');

    this.load.image('hurdles-ground', 'assets/games/hurdles/ground.png');
    this.load.spritesheet('hurdles-hurdle', 'assets/games/hurdles/hurdle.spritesheet.png', { frameWidth: 26, frameHeight: 20 });

    this.load.image('beam', 'assets/games/balance-beam/beam.png');
    this.load.image('beam-edge', 'assets/games/balance-beam/beam-edge.png');
    this.load.image('beam-legs', 'assets/games/balance-beam/beam-legs.png');

    this.load.image('archery-target', 'assets/games/archery/target.png');
    this.load.image('archery-crosshair', 'assets/games/archery/crosshair.png');
    this.load.image('red-x', 'assets/games/archery/red-x.png');
  }

  create() {
    this.persistence.read();
    this.scene.start(SCENE_KEYS.TITLE);
  }

  private setUpProgressBar() {
    const centerX = VIEWPORT.WIDTH / 2;
    const centerY = VIEWPORT.HEIGHT / 2;

    const loaderWidth = 150;
    const loaderHeight = 40;
    const borderSize = 3;

    const loaderBorder = this.add.rectangle(centerX - loaderWidth / 2, centerY, loaderWidth, loaderHeight, 0xDA4E38)
      .setOrigin(0, 0.5)
    const loaderBar = this.add.rectangle(centerX - loaderWidth / 2 + borderSize, centerY, 0, loaderHeight - borderSize * 2, 0xEE8D2E)
      .setOrigin(0, 0.5)

    this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
      const loaderBarWidth = progress * (loaderWidth - borderSize * 2);
      loaderBar.width = loaderBarWidth;
    });
  }
}
