<template>
  <div id="app">
    <section>
      <router-view></router-view>
    </section>
    <footer>
      <nav>
        <ul>
          <li>
            <a href="#/">Home</a>
          </li>
          <li>
            <a href="#/listen">听力</a>
          </li>
          <li>
            <a href="#/words">单词</a>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import { getMp3ById } from "./services/db";
import { bus } from "./main";

let mp3Id;
let mp3 = new Audio();
mp3.loop = true;

export default {
  async created() {
    if (mp3Id) {
      let file = await getMp3ById(+mp3Id);
      let objectURL = URL.createObjectURL(file);
      mp3.src = objectURL;
      mp3.addEventListener("loadedmetadata", () => {
        this.duration = mp3.duration;
      });
      mp3.addEventListener("timeupdate", e => {
        this.playedTime = mp3.currentTime.toFixed(2);
        this.playedTime_bar = this.isHoldProgressButton
          ? this.playedTime_bar
          : this.playedTime;
      });
    }
    bus.$on("mp3-play", e => {
      e
      debugger
    });
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
footer nav,
footer nav ul {
  height: 100%;
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
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
