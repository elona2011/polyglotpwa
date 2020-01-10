<template>
  <div class="main">
    <header>
      <TitleBar title="Home" :show-back="false"></TitleBar>
    </header>
    <section>
      <div @click="chineseChar">二类字</div>
      <div @click="chineseChar">一类字</div>
      <div @click="cnWord">语文</div>
      <div @click="engWord">英语单词</div>
      <div>英语句子</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div @click="eng">爸爸英语</div>
    </section>
  </div>
</template>

<script>
import { getListMp3, delMp3ById, addMp3 } from "../services/db";
import { bus } from "../main";
import TitleBar from "./TitleBar";

let x, li, offset;
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    TitleBar
  },
  async created() {
    this.list = await getListMp3();
  },
  methods: {
    chineseChar() {
      this.$router.push({ name: `ChnChar2List` });
    },
    cnWord() {
      this.$router.push({ name: `CnWordsList` });
    },
    engWord() {
      this.$router.push({ name: `EngWordList` });
    },
    eng() {
      this.$router.push({ name: `EngDadList` });
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
