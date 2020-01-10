<template>
  <section :class="layout">
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
</template>

<script>
import Word from "../services/Word";

export default {
  props: {
    storeName: {
      type: String,
      required: true
    },
    detailRoute: {
      type: String
    },
    layout: {
      type: String
    }
  },
  data() {
    return {
      chnChar: new Word(this.storeName)
    };
  },
  methods: {
    detail(item) {
      this.chnChar.setCurrent(item);
      this.detailRoute && this.$router.push({ path: `/${this.detailRoute}` });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid ul {
  display: inline-grid;
  grid-template-columns: repeat(5, 20vw);
  grid-auto-rows: 20vw;
}
.grid ul li {
  background-color: bisque;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 1px;
}
.inline li {
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
