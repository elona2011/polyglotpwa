<template>
  <div class="main">
    <header>
      <TitleBar :title="title" parent-name="home">
        <strong @click="clickPlus">+</strong>
      </TitleBar>
    </header>
    <List :dataObj="words" detailRoute="listdetail" :layout="words.layout" />
  </div>
</template>

<script>
import TitleBar from "../components/TitleBar";
import List from "../components/List";
import Word from "../services/Word";

export default {
  data() {
    return {
      words: new Word(this.$route.params.storeName)
    };
  },
  components: {
    TitleBar,
    List
  },
  computed: {
    title() {
      return `${this.words.title}(${this.words.list.length})`;
    }
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/listadd/${this.words.storeName}` });
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
