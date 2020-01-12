<template>
  <div class="main">
    <header>
      <TitleBar title="登录" :show-back="false"></TitleBar>
    </header>
    <section>
      <input type="text" name id />
      <button @click="login">ok</button>
    </section>
  </div>
</template>

<script>
import TitleBar from "../components/TitleBar";
import { userLogin } from "../services/Interfaces";

let x, li, offset;
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    TitleBar
  },
  methods: {
    login(){
      userLogin()
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
input,button {
  width: 98%;
  height: 5vh;
  font-size: 3vh;
  margin-top: 5px;
}
</style>
