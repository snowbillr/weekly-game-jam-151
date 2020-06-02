import { ButtonPlugin } from '../plugins/scene/button-plugin';
import { PersistencePlugin } from '../plugins/global/persistence-plugin';

export abstract class OneButtonOlympicsScene extends Phaser.Scene {
  public button!: ButtonPlugin;
  public persistence!: PersistencePlugin;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }
}
