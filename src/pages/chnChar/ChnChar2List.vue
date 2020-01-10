<template>
  <div class="main">
    <header>
      <TitleBar
        title="识字"
        parent-name="home"
      >
        <strong @click="clickPlus">+</strong>
      </TitleBar>
    </header>
    <List
      :storeName="storeName"
      detailRoute="ChnChar2Detail"
      layout="grid"
    />
  </div>
</template>

<script>
import { storeName_words } from "../../services/db";
import TitleBar from "../../components/TitleBar";
import List from "../../components/List";

export default {
  data() {
    return {
      storeName: storeName_words
    };
  },
  components: {
    TitleBar,
    List
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/ChnAdd/${storeName_words}` });
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
