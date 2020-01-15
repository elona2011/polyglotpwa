<template>
  <div class="main">
    <header>
      <TitleBar title="Home" :show-back="false"></TitleBar>
    </header>
    <section>
      <div @click="chineseChar2">二类字</div>
      <div @click="chineseChar1">一类字</div>
      <div @click="cnWord">语文</div>
      <div @click="engWord">英语单词</div>
      <div>英语句子</div>
      <div @click="listen">Listen</div>
      <div>6</div>
      <div @click="todo">todo</div>
      <div @click="eng">爸爸英语</div>
      <div @click="Login">Login</div>
    </section>
  </div>
</template>

<script>
import TitleBar from "../components/TitleBar";

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
      this.$router.push({ path: `list/words` });
    },
    cnWord() {
      this.$router.push({ path: `list/cnWords` });
    },
    engWord() {
      this.$router.push({ path: `list/enWords` });
    },
    eng() {
      this.$router.push({ path: `list/enDadWords` });
    },
    todo() {
      this.$router.push({ path: `list/todo` });
    },
    listen(){
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
div.main header {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #eee;
}
section {
  display: inline-grid;
  grid-template-columns: 33.3vw 33.3vw 33.3vw;
  grid-auto-rows: 33.3vw;
}
section div {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
}
</style>
