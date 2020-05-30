import Phaser from 'phaser';

import { SCENE_KEYS } from '../constants/scene-keys';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.TITLE });
  }

  create() {
    this.add.text(50, 50, 'title');
    this.scene.start(SCENE_KEYS.games.HURDLES);
  }
}
