<template>
  <div class="main">
    <header>
      <TitleBar title="New Word" />
    </header>
    <section class="setup-group">
      <div class="group-item">
        <div class="name-value-reset">
          <span class="name">word:</span>
          <span class="name">{{word.name}}</span>
        </div>
        <div class="name-value-reset">
          <span class="name">remember:</span>
          <span class="name">{{word.remember}}</span>
        </div>
        <div class="name-value-reset">
          <span class="name">forget:</span>
          <span class="name">{{word.forget}}</span>
        </div>
      </div>
    </section>
    <section class="play-group">
      <div>
        <button class="remember" @click="remember">Remember</button>
        <button class="forget" @click="forget">Forget</button>
      </div>
    </section>
  </div>
</template>

<script>
import { getWordById, addWord } from "../services/db";
import { bus } from "../main";
import TitleBar from "./TitleBar";

export default {
  data() {
    return {
      word: {}
    };
  },
  components: {
    TitleBar
  },
  async created() {
    let word = await getWordById(+this.$route.params.id);
    this.word = word;
  },
  computed: {},
  methods: {
    async remember() {
      this.word.remember++;
      await addWord(this.word);
      this.$router.push({ path: "/words" });
    },
    async forget() {
      this.word.forget++;
      await addWord(this.word);
      this.$router.push({ path: "/words" });
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
  height: 15vh;
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
section.play-group button {
  border: none;
  width: 15vw;
  flex: 1;
}
section.play-group button.remember {
  background-color: greenyellow;
}
</style>
