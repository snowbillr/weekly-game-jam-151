import { SCENE_KEYS } from '../constants/scene-keys';
import { VIEWPORT } from '../constants/viewport';
import { CharacterID, Characters } from '../constants/characters';

type ResultsData = {
  name: string,
  first: CharacterID,
  second: CharacterID,
  third: CharacterID,
}

export class GameResultsScene extends Phaser.Scene {
  background!: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: SCENE_KEYS.GAME_RESULTS });
  }

  create(resultsData: ResultsData) {
    this.background = this.add.tileSprite(0, 0, VIEWPORT.WIDTH, VIEWPORT.HEIGHT, 'background-yellow')
      .setOrigin(0);

    this.add.bitmapText(VIEWPORT.WIDTH / 2, VIEWPORT.HEIGHT / 2 - 60, 'matchup-48', resultsData.name)
      .setOrigin(0.5);

    const podiums = {
      first: {
        x: VIEWPORT.WIDTH / 2,
        y: VIEWPORT.HEIGHT / 2 + 100,
        height: 60
      },
      second: {
        x: VIEWPORT.WIDTH / 2 - 60,
        y: VIEWPORT.HEIGHT / 2 + 100,
        height: 40
      },
      third: {
        x: VIEWPORT.WIDTH / 2 + 60,
        y: VIEWPORT.HEIGHT / 2 + 100,
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
  }

  update() {
    this.background.tilePositionX += 1;
    this.background.tilePositionY -= 1;
  }
}
