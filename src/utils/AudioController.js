import gsap from "gsap";

class AUDIO_CONTROLLER {
    setup(){
        // dans le cas où t'as pas d'audio
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        this.audio = new Audio();
        this.audio.volume = 0.1;
        // pour contourner le fait que ça soit un audio sur un serveur distant
        this.audio.crossOrigin = "anonymous";

        // début (input)
        this.audioSource = this.ctx.createMediaElementSource(this.audio);
        // effects
        this.analyser = new AnalyserNode(this.ctx, {
            fftSize: 1024,
            smoothingTimeConstant: 0.8,
          });

        this.fdata = new Uint8Array(this.analyser.frequencyBinCount);

        // destination
        this.audioSource.connect(this.analyser);
        this.audioSource.connect(this.ctx.destination);

        this.analyser.getByteFrequencyData(this.fdata);

        gsap.ticker.add(this.tick);
    }

    updateSong(preview) {
        this.audio.src = preview;
        this.audio.currentTime = 0;
        this.audio.play();
    }

    tick = () => {
        this.analyser.getByteFrequencyData(this.fdata);
    }
}

const AudioController = new AUDIO_CONTROLLER()
export default AudioController;