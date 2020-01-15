<template>
  <div>
    <span
      @click="goBack"
      v-if="showBack"
    >&lt;</span>
    <p>{{title}}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      // if (this.parentName) {
      //   this.$router.push({ name: this.parentName });
      // } else {
      this.$router.go(-1);
      // }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  flex: 1;
  display: flex;
  position: relative;
}
div span {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
div p {
  flex: 6;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
div strong {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
