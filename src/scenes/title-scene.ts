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
    new Background(this);

    this.add.bitmapText(VIEWPORT.WIDTH / 2, 50, 'matchup-64-glow', 'One Button Olympics!')
      .setOrigin(0.5)

   const eventCompletions = this.persistence.getDocument<EventCompletionDocument>('event-completion')
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
    const startingY = VIEWPORT.CENTER_HEIGHT;
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

  addOverallRankings(eventCompletions: EventCompletionDocument) {
    const characterRankings = {
      [CharacterID.VIRTUAL_GUY]: {
        first: 0,
        second: 0,
        third: 0
      },
      [CharacterID.MASK_DUDE]: {
        first: 0,
        second: 0,
        third: 0
      },
      [CharacterID.PINK_MAN]: {
        first: 0,
        second: 0,
        third: 0
      },
      [CharacterID.NINJA_FROG]: {
        first: 0,
        second: 0,
        third: 0
      },
    };

    let placements = eventCompletions.getEventPlacements(EventId.ARCHERY)
    if (placements) {
      characterRankings[placements.first].first += 1;
      characterRankings[placements.second].second += 1;
      characterRankings[placements.third].third += 1;
    }
    placements = eventCompletions.getEventPlacements(EventId.BALANCE_BEAM)
    if (placements) {
      characterRankings[placements.first].first += 1;
      characterRankings[placements.second].second += 1;
      characterRankings[placements.third].third += 1;
    }
    placements = eventCompletions.getEventPlacements(EventId.HURDLES)
    if (placements) {
      characterRankings[placements.first].first += 1;
      characterRankings[placements.second].second += 1;
      characterRankings[placements.third].third += 1;
    }
    placements = eventCompletions.getEventPlacements(EventId.SPRINT)
    if (placements) {
      characterRankings[placements.first].first += 1;
      characterRankings[placements.second].second += 1;
      characterRankings[placements.third].third += 1;
    }

    const x = 50;
    const startingY = 150;
    const yStep = 64;
    let goldWidth = 0;
    let silverWidth = 0;
    let bronzeWidth = 0;

    new Character(this, x, -8 + startingY + yStep * 0, CharacterID.VIRTUAL_GUY).sprite.scale = 2;
    goldWidth = characterRankings[CharacterID.VIRTUAL_GUY].first * 20;
    silverWidth = characterRankings[CharacterID.VIRTUAL_GUY].second * 20;
    bronzeWidth = characterRankings[CharacterID.VIRTUAL_GUY].third * 20;
    this.add.rectangle(x + 64, startingY + yStep * 0, goldWidth, 32, 0xfbf236).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
    this.add.rectangle(x + 64 + goldWidth, startingY + yStep * 0, silverWidth, 32, 0xcbdbfc).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
    this.add.rectangle(x + 64 + goldWidth + silverWidth, startingY + yStep * 0, bronzeWidth, 32, 0x8a6f30).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)

    new Character(this, x, -8 + startingY + yStep * 1, CharacterID.NINJA_FROG).sprite.scale = 2;
    goldWidth = characterRankings[CharacterID.NINJA_FROG].first * 20;
    silverWidth = characterRankings[CharacterID.NINJA_FROG].second * 20;
    bronzeWidth = characterRankings[CharacterID.NINJA_FROG].third * 20;
    this.add.rectangle(x + 64, startingY + yStep * 1, goldWidth, 32, 0xfbf236).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
    this.add.rectangle(x + 64 + goldWidth, startingY + yStep * 1, silverWidth, 32, 0xcbdbfc).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
    this.add.rectangle(x + 64 + goldWidth + silverWidth, startingY + yStep * 1, bronzeWidth, 32, 0x8a6f30).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)

    new Character(this, x, -8 + startingY + yStep * 2, CharacterID.PINK_MAN).sprite.scale = 2;
    goldWidth = characterRankings[CharacterID.PINK_MAN].first * 20;
    silverWidth = characterRankings[CharacterID.PINK_MAN].second * 20;
    bronzeWidth = characterRankings[CharacterID.PINK_MAN].third * 20;
    this.add.rectangle(x + 64, startingY + yStep * 2, goldWidth, 32, 0xfbf236).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
    this.add.rectangle(x + 64 + goldWidth, startingY + yStep * 2, silverWidth, 32, 0xcbdbfc).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
    this.add.rectangle(x + 64 + goldWidth + silverWidth, startingY + yStep * 2, bronzeWidth, 32, 0x8a6f30).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)

    new Character(this, x, -8 + startingY + yStep * 3, CharacterID.MASK_DUDE).sprite.scale = 2;
    goldWidth = characterRankings[CharacterID.MASK_DUDE].first * 20;
    silverWidth = characterRankings[CharacterID.MASK_DUDE].second * 20;
    bronzeWidth = characterRankings[CharacterID.MASK_DUDE].third * 20;
    this.add.rectangle(x + 64, startingY + yStep * 3, goldWidth, 32, 0xfbf236).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
    this.add.rectangle(x + 64 + goldWidth, startingY + yStep * 3, silverWidth, 32, 0xcbdbfc).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
    this.add.rectangle(x + 64 + goldWidth + silverWidth, startingY + yStep * 3, bronzeWidth, 32, 0x8a6f30).setOrigin(0, 0.5).setStrokeStyle(2, 0x000000)
  }
}
