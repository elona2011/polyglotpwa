<template>
  <div class="main">
    <header>
      <TitleBar title="添加" />
    </header>
    <section class="setup-group">
      <div class="group-item">
        <span class="name">name:</span>
        <input class="item" type="text" name id="newWord" v-model="newWord" />
      </div>
      <div class="group-item">
        <span class="name">exp1:</span>
        <input class="item" type="text" name id="exp1" v-model="exp1" />
      </div>
      <div class="group-item">
        <span class="name">exp2:</span>
        <input class="item" type="text" name id="exp2" v-model="exp2" />
      </div>
      <div class="group-item">
        <span class="name">record:</span>
        <PlayButton :audioPlay="record.audioPlay"></PlayButton>
        <button class="item" @pointerdown="recordStart" @pointerup="recordStop">record</button>
      </div>
      <div class="group-item">
        <span class="name">image:</span>
        <button class="item" @click="captureImage">capture</button>
      </div>
      <div class="group-item">
        <video id="stream" width="320" height="240"></video>
      </div>
      <div class="group-item">
        <canvas id="capture" width="320" height="240"></canvas>
      </div>
    </section>
    <section class="play-group">
      <div>
        <button class="play" @click="Add">Add</button>
      </div>
    </section>
  </div>
</template>

<script>
import Word from "../services/Word";
import TitleBar from "../components/TitleBar";
import PlayButton from "../components/PlayButton";
import Record from "../services/Record";
import AudioPlay from "../services/AudioPlay";

export default {
  data() {
    let word = new Word(this.$route.params.storeName);
    let isEdit = false;
    if (this.$route.name === "listedit") isEdit = true;
    return {
      isEdit,
      word,
      record: new Record(),
      newWord: isEdit ? word.curItem.name : "",
      exp1: isEdit ? word.curItem.exp && word.curItem.exp[0] : "",
      exp2: isEdit ? word.curItem.exp && word.curItem.exp[1] : ""
    };
  },
  components: {
    TitleBar,
    PlayButton
  },
  mounted() {
    this.videoNode = document.getElementById("stream");
    this.capture = document.getElementById("capture");
    this.record.videoStart(this.videoNode);
  },
  methods: {
    recordStart(e) {
      this.record.recordStart();
      console.log("start");
    },
    recordStop() {
      this.record.recordStop();
      console.log("stop");
    },
    captureImage() {
      this.record.captureImage(this.capture);
    },
    Add() {
      if (this.newWord) {
        let exp = [];
        if (this.exp1) {
          exp.push(this.exp1);
        }
        if (this.exp2) {
          exp.push(this.exp2);
        }
        if (this.isEdit) {
          this.word.editWord({
            name: this.newWord,
            audioFile: this.record.file,
            exp
          });
        } else {
          this.word.addWord({
            name: this.newWord,
            audioFile: this.record.file,
            exp
          });
        }
        this.$router.go(-1);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
div.main header {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #eee;
}
div section.setup-group {
  flex: 10;
}
div section.play-group {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.group-item {
  height: 8vh;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.group-item > .name {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.group-item > .item {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  touch-action: none;
}
input[type="text"] {
  border: none;
  outline: none;
  border-bottom: 1px solid #999;
}

.group-item > .reset {
  flex: 1;
}

section.play-group div {
  flex: 1;
  display: flex;
  justify-content: center;
}
section.play-group div span {
  flex: 1;
}
section.play-group div input {
  flex: 1;
}
button {
  align-items: center;
}
button.play {
  border: none;
  width: 15vw;
  background-color: yellow;
}
</style>
