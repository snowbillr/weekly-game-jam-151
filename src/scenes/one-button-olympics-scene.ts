import { ButtonPlugin } from '../plugins/button-plugin';

export abstract class OneButtonOlympicsScene extends Phaser.Scene {
  public button!: ButtonPlugin;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }
}
