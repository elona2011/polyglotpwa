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
        <span class="name">record:</span>
        <PlayButton :audio="record.audioPlay"></PlayButton>
        <button class="item" @pointerdown="recordStart" @pointerup="recordStop">record</button>
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

export default {
  data() {
    return {
      word: new Word(this.$route.params.storeName),
      record: new Record(),
      newWord: ""
    };
  },
  components: {
    TitleBar,
    PlayButton
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
    Add() {
      if (this.newWord) {
        new Word(this.$route.params.storeName).addWord({
          name: this.newWord,
          audioFile: this.record.audioPlay.file
        });
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
