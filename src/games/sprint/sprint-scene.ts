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
  private computerPlayers!: SprintCharacter[];

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

    this.computerPlayers = [CharacterID.MASK_DUDE, CharacterID.NINJA_FROG, CharacterID.PINK_MAN].map(characterID => {
      const computerPlayer = new SprintCharacter(this, 50, VIEWPORT.HEIGHT - 96 - 16, characterID);
      this.physics.add.collider(ground.tileSprite, computerPlayer.character.sprite);
      return computerPlayer;
    });

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

    this.updateComputerPlayers();
  }

  update() {
    if (this.flag.checkPass(this.player.character.sprite)) {
      const characterPositions = [
        this.player,
        ...this.computerPlayers
      ].sort((a, b) => {
        return b.character.sprite.x - a.character.sprite.x
      });

      this.scene.start(SCENE_KEYS.GAME_RESULTS, {
        name: 'Sprint',
        first: characterPositions[0].character.id,
        second: characterPositions[1].character.id,
        third: characterPositions[2].character.id,
      });
    }
  }

  updateComputerPlayers() {
    this.time.delayedCall(Phaser.Math.RND.between(500, 750), () => {
      this.computerPlayers.forEach(cp => {
        if (Phaser.Math.RND.pick([true, true, false])) {
          cp.incrementVelocity(Phaser.Math.RND.between(75, 125));
        } else {
          cp.decrementVelocity(Phaser.Math.RND.between(25, 75));
        }
      });

      this.updateComputerPlayers();
    });
  }
}
