import { SCENE_KEYS } from '../constants/scene-keys';
import { VIEWPORT } from '../constants/viewport';
import { CharacterID, Characters } from '../constants/characters';
import { Background } from '../components/background';
import { EventId, EventCompletionDocument } from '../persistence/event-completion-document';
import { OneButtonOlympicsScene } from './one-button-olympics-scene';

type ResultsData = {
  eventId: EventId,
  name: string,
  first: CharacterID,
  second: CharacterID,
  third: CharacterID,
}

export class GameResultsScene extends OneButtonOlympicsScene {
  background!: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: SCENE_KEYS.GAME_RESULTS });
  }

  create(resultsData: ResultsData) {
    this.sound.play('music/event-results', { loop: true });

    this.persistence.getDocument<EventCompletionDocument>('event-completion')
      .completeEvent(resultsData.eventId, {
        first: resultsData.first,
        second: resultsData.second,
        third: resultsData.third
      });
    this.persistence.store();

    new Background(this);

    // event name
    this.add.bitmapText(VIEWPORT.WIDTH / 2, 120, 'matchup-48', resultsData.name)
      .setOrigin(0.5)
      .setLetterSpacing(2)

    this.add.bitmapText(VIEWPORT.WIDTH / 2, VIEWPORT.HEIGHT - 40, 'matchup-36-white', 'Back to Event List')
      .setOrigin(0.5);

    this.button.addListener(() => {
      this.sound.stopByKey('music/event-results');
      this.scene.start(SCENE_KEYS.TITLE);
    })

    // podiums
    const podiums = {
      first: {
        x: VIEWPORT.WIDTH / 2,
        y: VIEWPORT.HEIGHT / 2 + 60,
        height: 60
      },
      second: {
        x: VIEWPORT.WIDTH / 2 - 60,
        y: VIEWPORT.HEIGHT / 2 + 60,
        height: 40
      },
      third: {
        x: VIEWPORT.WIDTH / 2 + 60,
        y: VIEWPORT.HEIGHT / 2 + 60,
        height: 20
      }
    }

    this.add.image(podiums.second.x, podiums.second.y, 'podium-second')
      .setOrigin(0.5, 1);
    this.add.image(podiums.first.x, podiums.first.y, 'podium-first')
      .setOrigin(0.5, 1);
    this.add.image(podiums.third.x, podiums.third.y, 'podium-third')
      .setOrigin(0.5, 1);

    const firstPlace = Characters[resultsData.first];
    this.add.sprite(podiums.first.x, podiums.first.y - podiums.first.height, firstPlace.texture, 0)
      .setOrigin(0.5, 1);

    const secondPlace = Characters[resultsData.second];
    this.add.sprite(podiums.second.x, podiums.second.y - podiums.second.height, secondPlace.texture, 0)
      .setOrigin(0.5, 1);

    const thirdPlace = Characters[resultsData.third];
    this.add.sprite(podiums.third.x, podiums.third.y - podiums.third.height, thirdPlace.texture, 0)
      .setOrigin(0.5, 1);

    this.add.bitmapText(podiums.first.x, podiums.first.y, 'matchup-24-white', '1st')
      .setOrigin(0.5, 0);
    this.add.bitmapText(podiums.second.x, podiums.second.y, 'matchup-24-white', '2nd')
      .setOrigin(0.5, 0);
    this.add.bitmapText(podiums.third.x, podiums.third.y, 'matchup-24-white', '3rd')
      .setOrigin(0.5, 0);
  }
}
