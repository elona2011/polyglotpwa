<template>
  <div id="app">
    <section>
      <router-view></router-view>
    </section>
    <footer>
      <nav>
        <ul>
          <li @click="homeClick">
            <span>Home</span>
          </li>
          <li @click="ListenClick">
            <span>Listen</span>
          </li>
          <li @click="PlayClick">
            <span :class="{'icon-play':!isPlay,'icon-pause':isPlay}"></span>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import { Mp3 } from "./components/mp3/mp3";

let mp3 = new Mp3();
export default {
  data() {
    return {
      mp3
    };
  },
  methods: {
    homeClick() {
      this.$router.push({ name: "home" });
    },
    ListenClick() {
      this.$router.push({ name: "listen" });
    },
    PlayClick() {
      mp3.continuePauseOrPlayFirst();
    }
  },
  computed: {
    isPlay() {
      return this.mp3.isPlay;
    }
  }
};
</script>

<style>
@font-face {
  font-family: icomoon;
  src: url("assets/fonts/icomoon.ttf");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
[class^="icon-"],
[class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "icomoon" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-play:before {
  content: "\ea1c";
}
.icon-pause:before {
  content: "\ea1d";
}
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
  position: relative;
}
footer ul li span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
}
</style>
