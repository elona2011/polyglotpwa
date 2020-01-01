<template>
  <div class="main">
    <header>
      <TitleBar title="New Word" />
    </header>
    <section class="setup-group">
      <div class="group-item">
        <div class="name-value-reset">
          <span class="name">word:</span>
          <input type="text" name id="newWord" v-model="newWord" />
        </div>
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
import { ChnChar } from "./ChnChar";
import TitleBar from "../TitleBar";

export default {
  data() {
    return {
      newWord: ""
    };
  },
  components: {
    TitleBar
  },
  async created() {},
  computed: {},
  methods: {
    Add() {
      if (this.newWord) {
        new ChnChar(this.$router.currentRoute.params.store).addWord({
          name: this.newWord,
          forgetNum: 1,
          totalNum: 1,
          date: +new Date()
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
  height: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name-value-reset {
  flex: 1;
  display: flex;
  justify-content: center;
}
.name-value-reset .name {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name-value-reset input {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
input[type="text"] {
  border: none;
  outline: none;
  border-bottom: 1px solid #999;
}

.name-value-reset .reset {
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
button.play {
  border: none;
  width: 15vw;
  background-color: yellow;
}
</style>
