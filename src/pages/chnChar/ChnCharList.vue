<template>
  <div class="main">
    <header>
      <TitleBar title="识字" parent-name="home">
        <strong @click="clickPlus">+</strong>
      </TitleBar>
    </header>
    <List :dataObj="words" detailRoute="ChnCharDetail" layout="grid" />
  </div>
</template>

<script>
import { storeName_words, storeName_words_1 } from "../../services/db/config";
import TitleBar from "../../components/TitleBar";
import List from "../../components/List";
import Word from "../../services/Word";

export default {
  data() {
    let storeName =
      this.$route.params.type === "2" ? storeName_words : storeName_words_1;
    return {
      storeName,
      words: new Word(storeName)
    };
  },
  components: {
    TitleBar,
    List
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/ChnAdd/${this.storeName}` });
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
