import Phaser from 'phaser';
import { BootScene } from './scenes/boot-scene';
import { PreloadScene } from './scenes/preload-scene';
import { VIEWPORT } from './constants/viewport';
import { TitleScene } from './scenes/title-scene';
import { HurdlesScene } from './games/hurdles/hurdles-scene';
import { GameResultsScene } from './scenes/game-results-scene';
import { BalanceBeamScene } from './games/balance-beam/balance-beam-scene';
import { SprintScene } from './games/sprint/sprint-scene';
import { ButtonPlugin } from './plugins/button-plugin';
import { ArcheryScene } from './games/archery/archery-scene';

const scenes = [
  // BootScene,
  PreloadScene,
  TitleScene,
  GameResultsScene,

  HurdlesScene,
  BalanceBeamScene,
  SprintScene,
  ArcheryScene
];

new Phaser.Game({
  width: VIEWPORT.WIDTH,
  height: VIEWPORT.HEIGHT,
  scene: scenes,
  render: {
    pixelArt: true
  },
  plugins: {
    scene: [
      {
        key: 'Button',
        plugin: ButtonPlugin,
        mapping: 'button',
      }
    ]
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    }
  }
});
