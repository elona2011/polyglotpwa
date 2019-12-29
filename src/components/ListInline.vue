<template>
  <section>
    <ul>
      <li v-for="item in list" :key="item.id" @click="detail(item)">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    list: Array,
    basePath: String
  },
  methods: {
    detail(item) {
      this.$router.push({ path: `${this.basePath}/${item.id}` });
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
