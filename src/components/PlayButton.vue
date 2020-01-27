<template>
  <div class="playbutton">
    <span
      :class="{'icon-play':!isPlay,'icon-pause':isPlay}"
      @click="PlayClick"
      :style="{'font-size':fontsize}"
    ></span>
  </div>
</template>

<script>
import AudioPlay from "../services/AudioPlay";

export default {
  props: {
    audioPlay: {
      type: AudioPlay,
      required: true
    },
    fontsize: {
      type: String,
      default: "8vw"
    }
  },
  methods: {
    PlayClick() {
      this.audioPlay.playPause();
    }
  },
  computed: {
    isPlay() {
      return this.audioPlay.isPlay;
    }
  }
};
</script>

<style>
.icon-play:before {
  content: "\ea1c";
}
.icon-pause:before {
  content: "\ea1d";
}
.icon-loop:before {
  content: "\ea2e";
}
.playbutton {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
