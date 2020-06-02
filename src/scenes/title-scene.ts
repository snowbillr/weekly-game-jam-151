import Phaser from 'phaser';

import { SCENE_KEYS } from '../constants/scene-keys';
import { VIEWPORT } from '../constants/viewport';
import { Background } from '../components/background';

export class TitleScene extends Phaser.Scene {
  background!: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: SCENE_KEYS.TITLE });
  }

  create() {
    new Background(this);

    this.add.bitmapText(VIEWPORT.WIDTH / 2, 100, 'matchup-64-glow', 'One Button Olympics!')
      .setOrigin(0.5)

   this.addChecklistMenu([
    { text: 'Hurdles', sceneKey: SCENE_KEYS.games.HURDLES },
    { text: 'Balance Beam', sceneKey: SCENE_KEYS.games.BALANCE_BEAM },
    { text: 'Sprint', sceneKey: SCENE_KEYS.games.SPRINT },
    { text: 'Archery', sceneKey: SCENE_KEYS.games.ARCHERY },
   ])

    this.sound.play('music/title', { loop: true });
  }

  startEvent(sceneKey: string) {
    this.sound.stopByKey('music/title');
    this.scene.start(sceneKey);
  }

  private addChecklistMenu(items: { text: string, sceneKey: string }[]) {
    const x = VIEWPORT.CENTER_WIDTH;
    const startingY = VIEWPORT.CENTER_HEIGHT;
    const yStep = 50;

    items.forEach(({ text, sceneKey }, i) => {
      this.addChecklistButton(x, startingY + yStep * i, text, sceneKey);
    });
  }

  private addChecklistButton(x: number, y: number, text: string, sceneKey: string, checked?: true) {
    const checklistButton = this.add.container(x, y);

    const background = this.add.rectangle(-20, 3, 300, 40, 0xFFFFFF, 0.7)
      .setAlpha(0.7)
      .setOrigin(0, 0.5)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        background.alpha = 1;
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        background.alpha = 0.7;
      })
      .once(Phaser.Input.Events.POINTER_DOWN, () => this.startEvent(sceneKey))
    checklistButton.add(background);

    checklistButton.add(
      this.add.rectangle(0, 3, 24, 24, undefined, 0)
        .setStrokeStyle(4, 0xFFFFFF)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          background.alpha = 1;
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          background.alpha = 0.7;
        })
        .once(Phaser.Input.Events.POINTER_DOWN, () => this.startEvent(sceneKey))
    );

    if (checked) {
      checklistButton.add(
        this.add.image(4, -1, 'green-check')
      )
    }

    checklistButton.add(
      this.add.bitmapText(32, 0, 'matchup-36-white', text)
        .setOrigin(0, 0.5)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          background.alpha = 1;
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          background.alpha = 0.7;
        })
        .once(Phaser.Input.Events.POINTER_DOWN, () => this.startEvent(sceneKey))
    );
  }
}
