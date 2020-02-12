<template>
  <div class="main">
    <header>
      <TitleBar
        title="Home"
        :show-back="false"
      ></TitleBar>
    </header>
    <div>
      <div>
        <section>
          <div @click="todo">todo</div>
          <div @click="eng">爸爸英语</div>
          <div @click="Login">Login</div>
          <div @click="listen">Listen</div>
        </section>
      </div>
      <div>
        <section>
          <div @click="chineseChar2">二类字</div>
          <div @click="chineseChar1">一类字</div>
          <div @click="cnWord">语文</div>
          <div @click="engWord">儿童单词</div>
          <div @click="engSentence">儿童句子</div>
          <div @click="kidTodo">儿童todo</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "../components/TitleBar";
import { storeName_words_2 } from "../services/db/config";

export default {
  components: {
    TitleBar
  },
  methods: {
    Login() {
      this.$router.push({ name: `Login` });
    },
    chineseChar1() {
      this.$router.push({ path: `list/words1` });
    },
    chineseChar2() {
      this.$router.push({ path: `list/${storeName_words_2}` });
    },
    cnWord() {
      this.$router.push({ path: `list/cnWords` });
    },
    engWord() {
      this.$router.push({ path: `list/enWords` });
    },
    engSentence() {
      this.$router.push({ path: `list/enSentences` });
    },
    eng() {
      this.$router.push({ path: `list/enDadWords` });
    },
    todo() {
      this.$router.push({ path: `list/todo` });
    },
    kidTodo() {
      this.$router.push({ path: `list/kidTodo` });
    },
    listen() {
      this.$router.push({ path: `listen` });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
div.main > header {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #eee;
}
div.main > div {
  flex: 10;
  display: block;
}
div.main > div > div {
  margin-bottom: 20px;
}
section {
  display: inline-grid;
  grid-template-columns: 33.3vw 33.3vw 33.3vw;
  grid-auto-rows: 33.3vw;
}
section > div {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
}
</style>
