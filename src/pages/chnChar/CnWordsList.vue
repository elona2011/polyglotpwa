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
      store-name="cnWords"
      detailRoute="CnWordsDetail"
      layout="inline"
    />
  </div>
</template>

<script>
import TitleBar from "../../components/TitleBar";
import { storeName_cnWords } from "../../services/db";
import List from "../../components/List";

export default {
  components: {
    TitleBar,
    List
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/ChnAdd/${storeName_cnWords}` });
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
