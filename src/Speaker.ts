export class Speaker {
  private context: AudioContext;
  private gainNode: GainNode;
  private oscillatorNode?: OscillatorNode;

  constructor() {
    this.context = new AudioContext();
    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = 1;
    this.gainNode.connect(this.context.destination);
  }

  start() {
    if (this.oscillatorNode) {
      return;
    }
    this.oscillatorNode = this.context.createOscillator();
    this.oscillatorNode.frequency.value = 350;
    this.oscillatorNode.connect(this.gainNode);
    this.oscillatorNode.start();
  }

  stop() {
    this.oscillatorNode?.stop();
    this.oscillatorNode = undefined;
  }

  mute(muted: boolean) {
    this.gainNode.gain.value = Number(!muted);
  }
}
