<template>
  <div id="app">
    <header>
      <TitleBar @add-mp3="addMp3" />
    </header>
    <section>
      <AudioList />
    </section>
    <footer>
      <nav>
        <ul>
          <li>
            <a href="#">听力</a>
          </li>
          <li>
            <a href="#">录音</a>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import TitleBar from "./components/TitleBar.vue";
import AudioList from "./components/AudioList.vue";

export default {
  name: "app",
  components: {
    TitleBar,
    AudioList
  },
  methods: {
    addMp3() {
      console.log("mp3");
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
section {
  flex: 12;
  overflow-y: scroll;
}
footer {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #eee;
}
footer ul {
  display: flex;
}
footer ul li {
  list-style: none;
  flex: 1;
}
footer ul li a {
  text-decoration: none;
}
header {
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>
