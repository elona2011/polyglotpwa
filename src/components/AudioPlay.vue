<template>
  <div class="main">
    <header>
      <TitleBar :title="fileName" />
    </header>
    <section class="setup-group">
      <div class="group-item">
        <div class="name-value-reset">
          <span class="name">速率</span>
          <span class="value">{{speedValue}}</span>
          <button
            class="reset"
            @click="speedReset"
          >复位</button>
        </div>
        <input
          type="range"
          name
          id="speed"
          min="0.7"
          max="2"
          step="0.05"
          v-model="speedValue"
          @change="changeSpeed"
        />
      </div>
    </section>
    <section class="play-group">
      <div>
        <span>0</span>
        <span>{{playedTime}}</span>
        <span>{{duration}}</span>
      </div>
      <div>
        <input
          type="range"
          name
          id="playedTime"
          min="0"
          :max="duration"
          step="1"
          :value="playedTime_bar"
          @change="setPlayedTime"
          @input="valueInput"
          @pointerdown="down"
          @pointerup="up"
        />
      </div>
      <div>
        <button
          class="play"
          @click="playStop"
        >{{playText}}</button>
      </div>
    </section>
  </div>
</template>

<script>
import { getMp3ById } from "../services/db";
import { bus } from "../main";
import TitleBar from "./TitleBar";

let file, objectURL;
export default {
  data() {
    return {
      isPlay: false,
      speedValue: 1,
      playedTime: 0,
      playedTime_bar: 0,
      duration: 0,
      isHoldProgressButton: false,
      fileName: ""
    };
  },
  components: {
    TitleBar
  },
  async created() {
    file = await getMp3ById(+this.$route.params.id);
    objectURL = URL.createObjectURL(file);

    this.fileName = file.name;
  },
  computed: {
    playText() {
      return this.isPlay ? "Pause" : "Play";
    }
  },
  methods: {
    playStop() {
      if (this.isPlay) {
        this.isPlay = false;
        bus.$emit("mp3", { name: "", status: "stop" });
        // mp3.pause();
      } else {
        this.isPlay = true;
        bus.$emit("mp3", { name: "", status: "start" });
        // mp3.play();
      }
    },
    changeSpeed(e) {
      // mp3.playbackRate = +e.target.value;
    },
    speedReset() {
      // mp3.playbackRate = this.speedValue = 1;
    },
    setPlayedTime(e) {
      // mp3.currentTime = e.target.value;
    },
    down(e) {
      this.isHoldProgressButton = true;
    },
    up() {
      this.isHoldProgressButton = false;
    },
    valueInput(e) {
      this.playedTime_bar = e.target.value;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
div.main header {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #eee;
}
div section.setup-group {
  flex: 10;
}
div section.play-group {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.group-item {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name-value-reset {
  flex: 1;
  display: flex;
  justify-content: center;
}
.name-value-reset .name {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name-value-reset .value {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name-value-reset .reset {
  flex: 1;
}

.setup-group input {
  flex: 1;
}
section.play-group div {
  flex: 1;
  display: flex;
  justify-content: center;
}
section.play-group div span {
  flex: 1;
}
section.play-group div input {
  flex: 1;
}
button.play {
  border: none;
  width: 15vw;
  background-color: yellow;
}
</style>
