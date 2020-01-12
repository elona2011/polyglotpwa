<template>
  <div class="main">
    <header>
      <TitleBar
        title="单词"
        parent-name="home"
      >
        <strong @click="clickPlus">+</strong>
      </TitleBar>
    </header>
    <section>
      <ul>
        <li
          v-for="item in enWords.list"
          :key="item.id"
          @click="detail(item)"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import Word from "../../services/Word";
import TitleBar from "../../components/TitleBar";
import { storeName_enWords } from "../../services/db/config";

export default {
  data() {
    return {
      enWords: new Word(storeName_enWords),
    };
  },
  components: {
    TitleBar
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/EngWordAdd/${storeName_enWords}` });
    },
    detail(item) {
      this.enWords.setCurrent(item);
      this.$router.push({ path: `/EngWordDetail` });
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
li {
  background-color: bisque;
  margin: 3px 2px;
  padding: 2px 8px;
  position: relative;
  touch-action: pan-y;
  display: inline-block;
  height: 7vh;
  line-height: 7vh;
  float: left;
}
</style>
