<template>
  <div class="main">
    <header>
      <TitleBar title="单词" parent-name="home">
        <strong @click="clickPlus">+</strong>
      </TitleBar>
    </header>
    <ListInline :list="list" base-path="/ChnCharDetail" />
  </div>
</template>

<script>
import { getListWordByForget, delWordById } from "../services/db";
import { bus } from "../main";
import TitleBar from "./TitleBar";
import ListInline from "./ListInline";

let x, li, offset;
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    TitleBar,
    ListInline
  },
  async created() {
    let list = await getListWordByForget();
    this.list = list.reverse();
  },
  methods: {
    clickPlus() {
      this.$router.push({ path: `/ChnCharAdd` });
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
