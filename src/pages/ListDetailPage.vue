<template>
  <div class="main">
    <header>
      <TitleBar title="New Word">
        <strong @click="triggerOptions">...</strong>
        <div
          class="options"
          v-show="isOptionsShow"
        >
          <ul>
            <li @click="test">edit</li>
            <li @click="del">delete</li>
          </ul>
        </div>
      </TitleBar>
    </header>
    <section>
      <Detail :storeName="storeName" />
    </section>
  </div>
</template>

<script>
import Word from "../services/Word";
import TitleBar from "../components/TitleBar";
import Detail from "../components/Detail";

export default {
  data() {
    let storeName = this.$route.params.storeName;
    return {
      isOptionsShow: false,
      storeName,
      words: new Word(storeName)
    };
  },
  components: {
    TitleBar,
    Detail
  },
  methods: {
    test() {
      console.log(13);
      this.triggerOptions();
    },
    triggerOptions() {
      this.isOptionsShow = !this.isOptionsShow;
    },
    del() {
      if (confirm("Delete?")) {
        this.words.delWord();
      }
      this.triggerOptions();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
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
.options {
  position: absolute;
  right: 0;
  bottom: -14vh;
  z-index: 1;
}
.options > ul {
  width: 30vw;
}
.options > ul > li {
  display: flex;
  height: 7vh;
  background-color: #f0e8e8;
  align-items: center;
  justify-content: center;
  margin-bottom: 1px;
}
</style>
