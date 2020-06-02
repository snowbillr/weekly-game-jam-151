import { OneButtonOlympicsScene } from '../../scenes/one-button-olympics-scene';
import { SCENE_KEYS } from '../../constants/scene-keys';
import { Background } from '../../components/background';
import { VIEWPORT } from '../../constants/viewport';
import { CharacterID } from '../../constants/characters';
import { Character } from '../../components/character';
import { EventId } from '../../persistence/event-completion-document';

const SHOT_LIMIT = 3;

const COLORS = {
  yellow: 0xe6da29,
  red: 0xd32734,
  blue: 0x2d93dd,
  white: 0xfdfdf8
};

const SCORES = {
  yellow: 40,
  red: 30,
  blue: 20,
  white: 10,
  miss: 0
};

export class ArcheryScene extends OneButtonOlympicsScene {
  constructor() {
    super({ key: SCENE_KEYS.games.ARCHERY });
  }

  create() {
    this.sound.play('music/race', { loop: true });
    new Background(this);

    this.physics.world.setBounds(0, 0, VIEWPORT.WIDTH, VIEWPORT.HEIGHT);

    const target = this.physics.add.image(256, 100, 'archery-target');
    (target.body as Phaser.Physics.Arcade.Body)
      .setCollideWorldBounds(true)
      .setBounce(1, 1)
      .setVelocity(
        Phaser.Math.Between(300, 500),
        Phaser.Math.Between(300, 500)
      );


    const crosshair = this.physics.add.image(100, 100, 'archery-crosshair');
    (crosshair.body as Phaser.Physics.Arcade.Body)
      .setCollideWorldBounds(true)
      .setBounce(1, 1)
      .setVelocity(
        Phaser.Math.Between(300, 500),
        Phaser.Math.Between(300, 500)
      );

    const character = new Character(this, 50, 75, CharacterID.VIRTUAL_GUY);
    character.sprite.scale = 2;

    let currentShot = 0;
    const scores: number[] = [];
    const shotMarkers = [
      this.add.circle(50, 150, 32, 0xFFFFFF, 1),
      this.add.circle(50, 225, 32, 0xFFFFFF, 1),
      this.add.circle(50, 300, 32, 0xFFFFFF, 1),
    ];
    shotMarkers.forEach(shot => {
      shot.fillAlpha = 0;
      shot.setStrokeStyle(3, 0x000000, 1)
      shot.isStroked = true;
    });

    this.button.addListener(() => {
      const distance = Phaser.Math.Distance.Between(crosshair.x, crosshair.y, target.x, target.y);
      if (distance < 16) {
        shotMarkers[currentShot].fillColor = COLORS.yellow;
        shotMarkers[currentShot].fillAlpha = 1;
        scores[currentShot] = SCORES.yellow;
      } else if (distance < 48) {
        shotMarkers[currentShot].fillColor = COLORS.red;
        shotMarkers[currentShot].fillAlpha = 1;
        scores[currentShot] = SCORES.red;
      } else if (distance < 80) {
        shotMarkers[currentShot].fillColor = COLORS.blue;
        shotMarkers[currentShot].fillAlpha = 1;
        scores[currentShot] = SCORES.blue;
      } else if (distance < 112) {
        shotMarkers[currentShot].fillColor = COLORS.white;
        shotMarkers[currentShot].fillAlpha = 1;
        scores[currentShot] = SCORES.white;
      } else {
        this.add.image(shotMarkers[currentShot].x, shotMarkers[currentShot].y, 'red-x');
        scores[currentShot] = SCORES.miss;
      }

      crosshair
        .setVelocity(
          Phaser.Math.Between(300, 500),
          Phaser.Math.Between(300, 500)
        );
      target
        .setVelocity(
          Phaser.Math.Between(300, 500),
          Phaser.Math.Between(300, 500)
        );

      currentShot += 1;
      if (currentShot === SHOT_LIMIT) {
        const playerScores = {
          [CharacterID.VIRTUAL_GUY]: scores.reduce((sum, score) => sum + score, 0),
          ...this.generatePlayerScores()
        };

        const sortedPlayerScores = Object.entries(playerScores)
          .sort((a, b) => b[1] - a[1]);

        this.sound.stopByKey('music/race');
        this.scene.start(SCENE_KEYS.GAME_RESULTS, {
          eventId: EventId.ARCHERY,
          name: 'ARCHERY',
          first: sortedPlayerScores[0][0],
          second: sortedPlayerScores[1][0],
          third: sortedPlayerScores[2][0]
        });
      }
    });
  }

  private generatePlayerScores() {
    const scoreValues = Object.values(SCORES);

    return {
      [CharacterID.MASK_DUDE]: Array.from({ length: SHOT_LIMIT }, () => Phaser.Math.RND.pick(scoreValues)).reduce((sum, score) => sum + score, 0),
      [CharacterID.NINJA_FROG]: Array.from({ length: SHOT_LIMIT }, () => Phaser.Math.RND.pick(scoreValues)).reduce((sum, score) => sum + score, 0),
      [CharacterID.PINK_MAN]: Array.from({ length: SHOT_LIMIT }, () => Phaser.Math.RND.pick(scoreValues)).reduce((sum, score) => sum + score, 0),
    };
  }
}
