<template>
  <div class="playbutton">
    <span
      :class="{'icon-play':!isPlay,'icon-pause':isPlay,'play-icon':true}"
      @click="PlayClick"
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
