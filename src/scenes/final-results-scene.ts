import { OneButtonOlympicsScene } from './one-button-olympics-scene';
import { SCENE_KEYS } from '../constants/scene-keys';
import { Background } from '../components/background';
import { VIEWPORT } from '../constants/viewport';
import { EventCompletionDocument } from '../persistence/event-completion-document';
import { CharacterID } from '../constants/characters';
import { Character } from '../components/character';

export class FinalResultsScene extends OneButtonOlympicsScene {
  constructor() {
    super({ key: SCENE_KEYS.FINAL_RESULTS });
  }

  create() {
    const eventCompletions = this.persistence.getDocument<EventCompletionDocument>('event-completion')

    this.sound.play('music/final-results', { loop: true });

    new Background(this);

    this.add.bitmapText(VIEWPORT.CENTER_WIDTH, 100, 'matchup-64-glow', 'CHAMPION')
      .setOrigin(0.5)

    this.add.image(VIEWPORT.CENTER_WIDTH, VIEWPORT.CENTER_HEIGHT - 24, 'trophy')
      .setScale(2)

    const characterPlacements = eventCompletions.getCharacterPlacements();
    const characterScores = characterPlacements.reduce((scores, characterPlacement) => {
      scores.push({
        id: characterPlacement.id,
        score: characterPlacement.first * 3
                + characterPlacement.second * 2
                + characterPlacement.third * 1
      });

      return scores;
    }, new Array());

    characterScores.sort((a, b) => b.score - a.score);
    const first = characterScores[0];
    new Character(this, VIEWPORT.CENTER_WIDTH, VIEWPORT.CENTER_HEIGHT + 48, first.id)
      .sprite.setScale(3)

    this.add.bitmapText(VIEWPORT.CENTER_WIDTH, VIEWPORT.HEIGHT - 64, 'matchup-36-white', 'Restart?')
      .setOrigin(0.5)

    this.button.addListener(() => {
      this.persistence.clear();
      this.persistence.read();
      this.sound.stopByKey('music/final-results');
      this.scene.start(SCENE_KEYS.TITLE);
    })
  }
}
