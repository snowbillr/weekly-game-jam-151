import { SCENE_KEYS } from '../../constants/scene-keys';
import { VIEWPORT } from '../../constants/viewport';
import { Background } from '../../components/background';
import { TimingBar } from '../../components/timing-bar';
import { Character } from '../../components/character';
import { CharacterID } from '../../constants/characters';
import { Flag } from '../../components/flag';
import { Timer } from '../../components/timer';
import { EventId } from '../../persistence/event-completion-document';

export class BalanceBeamScene extends Phaser.Scene {
  private timingBar!: TimingBar;
  private player!: Character;
  private flag!: Flag;

  constructor() {
    super({ key: SCENE_KEYS.games.BALANCE_BEAM });
  }

  create() {
    this.sound.play('music/race', { loop: true });
    new Background(this);
    this.flag = new Flag(this, 575, 263);
    this.flag.sprite.setScale(2);
    this.flag.playWave();

    const timer = new Timer(this, VIEWPORT.CENTER_WIDTH, 100);
    timer.start();
    this.timingBar = new TimingBar(this, VIEWPORT.CENTER_WIDTH, 150)

    const beamWidth = VIEWPORT.WIDTH - 64;
    this.add.container(VIEWPORT.CENTER_WIDTH, VIEWPORT.HEIGHT - 64,
      [
        this.add.image(0, 53, 'beam-legs'),
        this.add.image(-1 * beamWidth / 2 - 1, 0, 'beam-edge'),
        this.add.tileSprite(0, 0, beamWidth, 19, 'beam'),
        this.add.image(beamWidth / 2 + 1, 0, 'beam-edge'),
      ]
    );

    this.player = new Character(this, 100, 295, CharacterID.VIRTUAL_GUY);
    this.player.sprite.scale = 2;
    this.player.playAnimation('idle');

    ////////////////////////////

    this.start();
  }

  start() {
    const handlePress = () => {
      if (this.timingBar.select()) {
        this.tweens.add({
          targets: this.player.sprite,
          props: {
            x: `+=${Phaser.Math.RND.between(75, 150)}`
          },
          duration: 400,
          onStart: () => {
            this.player.playAnimation('run');
          },
          onComplete: () => {
            this.player.playAnimation('idle');

            if (this.flag.checkPass(this.player.sprite)) {
              this.tweens.killAll();
              this.sound.stopByKey('music/race');
              this.scene.start(SCENE_KEYS.GAME_RESULTS, {
                eventId: EventId.BALANCE_BEAM,
                name: 'BALANCE BEAM',
                first: CharacterID.VIRTUAL_GUY,
                second: CharacterID.NINJA_FROG,
                third: CharacterID.PINK_MAN,
              })
            }
          }
        })
      } else {
        this.cameras.main.shake(100, 0.01)
      }
    };
    this.input.on('pointerdown', handlePress);
    this.input.keyboard.on('keydown-SPACE', handlePress)
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.off('pointerdown', handlePress);
      this.input.keyboard.off('keydown-SPACE', handlePress)
    });

    this.timingBar.start();
  }
}
