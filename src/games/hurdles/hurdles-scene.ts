import Phaser from 'phaser'
import { SCENE_KEYS } from '../../constants/scene-keys'
import { VIEWPORT } from '../../constants/viewport';
import { CharacterID } from '../../constants/characters';
import { Background } from '../../components/background';
import { Timer } from '../../components/timer';
import { OneButtonOlympicsScene } from '../../scenes/one-button-olympics-scene';
import { HurdleCharacter } from './hurdle-character';
import { Ground } from '../../components/ground';
import { EventId } from '../../persistence/event-completion-document';

const numHurdles = 10;
const hurdleSpacing = 250;
const worldWidth = (numHurdles + 1) * hurdleSpacing;
const groundY = VIEWPORT.HEIGHT - 96;

export class HurdlesScene extends OneButtonOlympicsScene {
  player!: HurdleCharacter;
  computerPlayers!: HurdleCharacter[];

  ground!: Ground;
  hurdles!: Phaser.Physics.Arcade.Sprite[];

  constructor() {
    super({ key: SCENE_KEYS.games.HURDLES });
  }

  create() {
    this.createTrack();
    this.addPlayers();
    this.addPhysics();
    this.addWinCondition();

    this.button.addListener(() => {
      this.player.jump();
    });

    const timer = new Timer(this, VIEWPORT.CENTER_WIDTH, 100)
    timer.text.setScrollFactor(0);
    timer.start();

    this.cameras.main.setBounds(0, 0, worldWidth, VIEWPORT.HEIGHT);
    this.cameras.main.startFollow(this.player.character.sprite);

    this.sound.play('music/race', { loop: true });
  }

  update() {
    this.player.update();
    this.computerPlayers.forEach(c => {
      c.update();
      c.autoJump();
    });
  }

  private createTrack() {
     (new Background(this)).tileSprite.setScrollFactor(0);

    this.ground = new Ground(this, worldWidth, { physics: true });

    this.hurdles = Array.from({ length: numHurdles }, (v, i) => {
      return this.physics.add.sprite((i + 1) * hurdleSpacing, groundY - 8, 'hurdles-hurdle')
    });
  }

  private addPlayers() {
    this.player = new HurdleCharacter(this, CharacterID.VIRTUAL_GUY);
    this.physics.add.collider(this.player.character.sprite, this.ground.tileSprite);

    this.computerPlayers = [
      new HurdleCharacter(this, CharacterID.MASK_DUDE),
      new HurdleCharacter(this, CharacterID.NINJA_FROG),
      new HurdleCharacter(this, CharacterID.PINK_MAN),
    ];
    this.computerPlayers.forEach(cp => {
      this.physics.add.collider(cp.character.sprite, this.ground.tileSprite);
    });
  }

  private addPhysics() {
    this.physics.world.setBounds(0, 0, worldWidth, VIEWPORT.HEIGHT);
    this.physics.world.setBoundsCollision(false, true, false, false);

    this.hurdles.forEach(hurdle => {
      (hurdle.body as Phaser.Physics.Arcade.Body)
        .setGravityY(400)
        .setCollideWorldBounds(true)
        .setDragX(200);

      this.physics.add.collider(hurdle, this.ground.tileSprite);
      this.physics.add.collider(hurdle, this.player.character.sprite, () => {
        hurdle.setVelocityX(Phaser.Math.RND.between(100, 200));
        if (!hurdle.body.touching.up) {
          hurdle.setVelocityY(Phaser.Math.RND.between(-150, -250));
        }
      });

      this.computerPlayers.forEach(computer => {
        this.physics.add.collider(hurdle, computer.character.sprite, () => {
          hurdle.setVelocityX(Phaser.Math.RND.between(100, 200));
          if (!hurdle.body.touching.up) {
            hurdle.setVelocityY(Phaser.Math.RND.between(-150, -250));
          }
        });
      })
    });
  }

  addWinCondition() {
    this.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_BOUNDS, () => {
      const positions = [
        {
          characterID: this.player.character.id,
          x: this.player.character.sprite.x
        },
        ...this.computerPlayers.map(c => {
          return {
            characterID: c.character.id,
            x: c.character.sprite.x
          }
        })
      ].sort((a, b) => b.x - a.x);

      this.sound.stopByKey('music/race');
      this.scene.start(SCENE_KEYS.GAME_RESULTS, {
        eventId: EventId.HURDLES,
        name: 'HURDLES',
        first: positions[0].characterID,
        second: positions[1].characterID,
        third: positions[2].characterID,
      });
    });
  }
}
