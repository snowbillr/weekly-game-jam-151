import Phaser from 'phaser';

import { SCENE_KEYS } from '../constants/scene-keys';
import { CharacterID } from './game-results-scene';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.TITLE });
  }

  create() {
    this.add.text(50, 50, 'title');
    this.scene.start(SCENE_KEYS.games.HURDLES);
    // this.scene.start(SCENE_KEYS.GAME_RESULTS, { first: CharacterID.VIRTUAL_GUY })
  }
}
