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
    <section>
      <ul>
        <li
          v-for="item in chnChar.list"
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
import { storeName_words } from "../../services/db";
import TitleBar from "../TitleBar";

export default {
  data() {
    return {
      chnChar: new Word("words"),
    };
  },
  components: {
    TitleBar
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/ChnAdd/${storeName_words}` });
    },
    detail(item) {
      this.chnChar.setCurrent(item);
      this.$router.push({ path: `/ChnCharDetail` });
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
ul {
  display: inline-grid;
  grid-template-columns: repeat(5, 20vw);
  grid-auto-rows: 20vw;
}
ul li {
  background-color: bisque;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 1px;
}
</style>
