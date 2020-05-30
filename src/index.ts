import Phaser from 'phaser';
import { BootScene } from './scenes/boot-scene';
import { PreloadScene } from './scenes/preload-scene';
import { VIEWPORT } from './constants/viewport';
import { TitleScene } from './scenes/title-scene';
import { HurdlesScene } from './games/hurdles/hurdles-scene';
import { GameResultsScene } from './scenes/game-results-scene';

const scenes = [
  // BootScene,
  PreloadScene,
  TitleScene,
  HurdlesScene,
  GameResultsScene
];

new Phaser.Game({
  width: VIEWPORT.WIDTH,
  height: VIEWPORT.HEIGHT,
  scene: scenes,
  render: {
    pixelArt: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    }
  }
});
