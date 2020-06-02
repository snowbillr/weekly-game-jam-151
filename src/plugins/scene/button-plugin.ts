type ButtonListener = () => void;

export class ButtonPlugin extends Phaser.Plugins.ScenePlugin {
  private listeners: ButtonListener[];

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.listeners = [];

    scene.events.on(Phaser.Scenes.Events.START, this.startListening, this);
    scene.events.on(Phaser.Scenes.Events.SHUTDOWN, this.stopListening, this);
  }

  private startListening() {
    this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.scene.input.keyboard.on('keydown-SPACE', this.onPointerDown, this);
  }

  private stopListening() {
    this.listeners = [];
    this.scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.scene.input.keyboard.off('keydown-SPACE', this.onPointerDown, this);
  }

  private onPointerDown() {
    this.listeners.forEach(listener => listener());
  }

  addListener(listener: ButtonListener) {
    this.listeners.push(listener);
  }

  removeListener(listener: ButtonListener) {
    const listenerIndex = this.listeners.findIndex(l => l === listener);
    if (listenerIndex >= 0) {
      this.listeners.splice(listenerIndex, 1);
    }
  }
}
