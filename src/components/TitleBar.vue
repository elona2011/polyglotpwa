<template>
  <div>
    <span @click="goBack" v-if="showBack">&lt;</span>
    <p>{{title}}</p>
    <slot></slot>
  </div>
</template>

<script>
import { addMp3 } from "../services/db";
import { bus } from "../main";

export default {
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: true
    }
  },
  created() {
    bus.$on("TitleBar", e => {
      this.title = e.title;
    });
  },
  methods: {
    goBack() {
      // if (this.parentName) {
      //   this.$router.push({ name: this.parentName });
      // } else {
      this.$router.go(-1);
      // }
    },
    clickPlus() {
      // let mp3select = document.createElement("input");
      let audio_file = document.querySelector("#audio_file");
      audio_file.click();
    },
    getMp3(e) {
      var files = e.target.files;
      var file = URL.createObjectURL(files[0]);
      addMp3(files[0]);
      bus.$emit("add-mp3");
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
div span {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
div p {
  flex: 6;
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
