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
    <section>
      <ul>
        <li
          v-for="item in list"
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
import { ChnChar } from "./ChnChar";
import TitleBar from "../TitleBar";
import { storeName_cnWords } from "../../services/db";

let cnWords = new ChnChar('cnWords')
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    TitleBar
  },
  async created() {
    this.list = await cnWords.getList();
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/ChnAdd/${storeName_cnWords}` });
    },
    detail(item) {
      cnWords.setCurrent(item)
      this.$router.push({ path: `/CnWordsDetail` });
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
