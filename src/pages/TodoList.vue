<template>
  <div class="main">
    <header>
      <TitleBar
        title="todo"
        parent-name="home"
      >
        <strong @click="clickPlus">+</strong>
      </TitleBar>
    </header>
    <List
      :dataObj="words"
      detailRoute="ChnChar2Detail"
      layout="grid"
    />
  </div>
</template>

<script>
import { storeName_todo } from "../services/db/config";
import TitleBar from "../components/TitleBar";
import List from "../components/List";
import Word from "../services/Word";

export default {
  data() {
    return {
      words: new Word(storeName_todo)
    };
  },
  components: {
    TitleBar,
    List
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/ChnAdd/${storeName_todo}` });
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
</style>
