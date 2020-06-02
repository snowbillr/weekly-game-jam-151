import Phaser from 'phaser';

import { SCENE_KEYS } from '../constants/scene-keys';
import { VIEWPORT } from '../constants/viewport';
import { Background } from '../components/background';
import { EventCompletionDocument, EventId } from '../persistence/event-completion-document';
import { OneButtonOlympicsScene } from './one-button-olympics-scene';
import { CharacterID } from '../constants/characters';
import { Character } from '../components/character';

export class TitleScene extends OneButtonOlympicsScene {
  background!: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: SCENE_KEYS.TITLE });
  }

  create() {
   const eventCompletions = this.persistence.getDocument<EventCompletionDocument>('event-completion')

    if (eventCompletions.areAllComplete()) {
      this.scene.start(SCENE_KEYS.FINAL_RESULTS);
      return;
    }

    new Background(this);

    this.add.bitmapText(VIEWPORT.WIDTH / 2, 50, 'matchup-64-glow', 'One Button Olympics!')
      .setOrigin(0.5)

    this.addChecklistMenu([
      { text: 'Hurdles', sceneKey: SCENE_KEYS.games.HURDLES, checked: eventCompletions.events[EventId.HURDLES].completed },
      { text: 'Balance Beam', sceneKey: SCENE_KEYS.games.BALANCE_BEAM, checked: eventCompletions.events[EventId.BALANCE_BEAM].completed },
      { text: 'Sprint', sceneKey: SCENE_KEYS.games.SPRINT, checked: eventCompletions.events[EventId.SPRINT].completed },
      { text: 'Archery', sceneKey: SCENE_KEYS.games.ARCHERY, checked: eventCompletions.events[EventId.ARCHERY].completed },
    ]);

    this.addOverallRankings(eventCompletions);

    this.sound.play('music/title', { loop: true });
  }

  startEvent(sceneKey: string) {
    this.sound.stopByKey('music/title');
    this.scene.start(sceneKey);
  }

  private addChecklistMenu(items: { text: string, sceneKey: string, checked?: boolean }[]) {
    const x = VIEWPORT.CENTER_WIDTH;
    const startingY = VIEWPORT.CENTER_HEIGHT - 32;
    const yStep = 50;

    items.forEach(({ text, sceneKey, checked }, i) => {
      this.addChecklistButton(x, startingY + yStep * i, text, sceneKey, checked);
    });
  }

  private addChecklistButton(x: number, y: number, text: string, sceneKey: string, checked?: boolean) {
    const checklistButton = this.add.container(x, y);

    const background = this.add.rectangle(-20, 3, 300, 40, 0xFFFFFF, 0.7)
      .setAlpha(0.7)
      .setOrigin(0, 0.5)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        if (checked) return;
        background.alpha = 1;
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        if (checked) return;
        background.alpha = 0.7;
      })
      .once(Phaser.Input.Events.POINTER_DOWN, () => {
        if (checked) return;
        this.startEvent(sceneKey)
      })
    checklistButton.add(background);

    checklistButton.add(
      this.add.rectangle(0, 3, 24, 24, undefined, 0)
        .setStrokeStyle(4, 0xFFFFFF)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          if (checked) return;
          background.alpha = 1;
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          background.alpha = 0.7;
        })
        .once(Phaser.Input.Events.POINTER_DOWN, () => {
          if (checked) return;
          this.startEvent(sceneKey)
        })
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
          if (checked) return;
          background.alpha = 1;
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          if (checked) return;
          background.alpha = 0.7;
        })
        .once(Phaser.Input.Events.POINTER_DOWN, () => {
          if (checked) return;
          this.startEvent(sceneKey)
        })
    );
  }

  addOverallRankings(eventCompletions: EventCompletionDocument) {
    const characterRankings = eventCompletions.getCharacterPlacements();

    const x = 50;
    const startingY = 150;
    const yStep = 64;

    characterRankings.forEach((characterRanking, i) => {
      new Character(this, x, -8 + startingY + yStep * i, characterRanking.id).sprite.scale = 2;
      const goldWidth = characterRanking.first * 20;
      const silverWidth = characterRanking.second * 20;
      const bronzeWidth = characterRanking.third * 20;

      for (let j = 0; j < characterRanking.first; j++) {
        this.add.rectangle(x + 64 + 20 * j, startingY + yStep * i, 20, 32, 0xfbf236).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
      }
      for (let j = 0; j < characterRanking.second; j++) {
        this.add.rectangle(x + 64 + goldWidth + 20 * j, startingY + yStep * i, 20, 32, 0xcbdbfc).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
      }
      for (let j = 0; j < characterRanking.third; j++) {
        this.add.rectangle(x + 64 + goldWidth + silverWidth + 20 * j, startingY + yStep * i, 20, 32, 0x8a6f30).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
      }
    });
  }
}
