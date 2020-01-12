<template>
  <div class="main">
    <header>
      <TitleBar title="New Word">
        <strong @click="del">-</strong>
      </TitleBar>
    </header>
    <section>
      <Detail storeName="words" />
    </section>
  </div>
</template>

<script>
import Word from "../../services/Word";
import TitleBar from "../../components/TitleBar";
import Detail from "../../components/Detail";

export default {
  data() {
    return {
      words: new Word("words"),
    };
  },
  components: {
    TitleBar,
    Detail
  },
  methods: {
    del() {
      if (confirm("Delete?")) {
        this.words.delWord();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
div.main header {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #eee;
}
div.main section {
  flex: 12;
}
</style>
