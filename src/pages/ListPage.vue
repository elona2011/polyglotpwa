<template>
  <div class="main">
    <header>
      <TitleBar
        title="语文"
        parent-name="home"
      >
        <strong @click="clickPlus">+</strong>
      </TitleBar>
    </header>
    <List
      :dataObj="words"
      detailRoute="listdetail"
      :layout="config.layout"
    />
  </div>
</template>

<script>
import TitleBar from "../components/TitleBar";
import List from "../components/List";
import Word from "../services/Word";
import { getPageConfig } from "../config";

export default {
  data() {
    let config = getPageConfig(this.$route.params.storeName);
    return {
      config,
      words: new Word(config.storeName)
    };
  },
  components: {
    TitleBar,
    List
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/listadd/${this.config.storeName}` });
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
