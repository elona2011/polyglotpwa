<template>
  <div>
    <p>状态栏</p>
    <strong @click="clickPlus">+</strong>
    <input @change="getMp3" id="audio_file" type="file" accept="audio/*" style="display:none;" />
  </div>
</template>

<script>
import { addMp3 } from "../services/db";
export default {
  // name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    clickPlus() {
      // let mp3select = document.createElement("input");
      let audio_file = document.querySelector("#audio_file");
      audio_file.click();

      console.log(1);
    },
    getMp3(e) {
      var files = e.target.files;
      var file = URL.createObjectURL(files[0]);
      addMp3(files[0]);
      this.$emit('add-mp3')
      // mp3.defaultPlaybackRate = 2
      // let mp3 = new Audio()
      // mp3.src = file;
      // mp3.play();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  flex: 1;
  display: flex;
}
div p {
  flex: 8;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
div strong {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
