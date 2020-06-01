import { SCENE_KEYS } from '../../constants/scene-keys';
import { Background } from '../../components/background';
import { Ground } from '../../components/ground';
import { VIEWPORT } from '../../constants/viewport';
import { CharacterID } from '../../constants/characters';
import { Flag } from '../../components/flag';
import { SprintCharacter } from './sprint-character';
import { TimingBar } from '../../components/timing-bar';
import { OneButtonOlympicsScene } from '../../scenes/one-button-olympics-scene';

const worldWidth = 1800;

export class SprintScene extends OneButtonOlympicsScene {
  private flag!: Flag;
  private player!: SprintCharacter;

  constructor() {
    super({ key: SCENE_KEYS.games.SPRINT });
  }

  create() {
    this.sound.play('music/race', { loop: true });

    (new Background(this)).tileSprite.setScrollFactor(0);
    this.flag = new Flag(this, 1600, VIEWPORT.HEIGHT - 96 - 32);

    const ground = new Ground(this, worldWidth, { physics: true });

    const timingBar = new TimingBar(this, VIEWPORT.CENTER_WIDTH, 100);
    timingBar.container.setScrollFactor(0);
    timingBar.startSelectorMovement();

    this.player = new SprintCharacter(this, 50, VIEWPORT.HEIGHT - 96 - 16, CharacterID.VIRTUAL_GUY);
    this.physics.add.collider(ground.tileSprite, this.player.character.sprite);

    this.physics.world.setBounds(0, 0, worldWidth, VIEWPORT.HEIGHT);

    this.cameras.main.setBounds(0, 0, worldWidth, VIEWPORT.HEIGHT);
    this.cameras.main.startFollow(this.player.character.sprite);

    this.button.addListener(() => {
      if (timingBar.select()) {
        timingBar.speedUpSelector();
        this.player.incrementVelocity();
      } else {
        timingBar.slowDownSelector();
        this.player.decrementVelocity();
      }
    });
  }

  update() {
    if (this.flag.checkPass(this.player.character.sprite)) {
      this.scene.start(SCENE_KEYS.GAME_RESULTS, {
        name: 'Sprint',
        first: CharacterID.VIRTUAL_GUY,
        second: CharacterID.NINJA_FROG,
        third: CharacterID.MASK_DUDE,
      })
    }
  }
}
