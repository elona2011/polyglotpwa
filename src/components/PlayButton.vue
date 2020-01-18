<template>
  <div class="playbutton">
    <span :class="{'icon-play':!isPlay,'icon-pause':isPlay,'play-icon':true}" @click="PlayClick"></span>
  </div>
</template>

<script>
export default {
  props: {
    audio: {
      required: true,
    }
  },
  methods: {
    PlayClick() {
      this.audio.playPauseMp3();
    }
  },
  computed: {
    isPlay() {
      return this.audio.isPlay;
    },
    isAllLoop() {
      return this.audio.isAllLoop ? "red" : "grey";
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
