<template>
  <div class="main">
    <header>
      <TitleBar :title="mp3.name" />
    </header>
    <section class="setup-group">
      <div class="group-item">
        <div class="name-value-reset">
          <span class="name">速率</span>
          <span class="value">{{mp3.playbackRate}}</span>
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
          v-model="mp3.playbackRate"
          @change="changeSpeed"
        />
      </div>
    </section>
    <section class="play-group">
      <div>
        <span>0</span>
        <span>{{mp3.currentTime.toFixed(2)}}</span>
        <span>{{mp3.duration.toFixed(2)}}</span>
      </div>
      <div>
        <input
          type="range"
          name
          min="0"
          :max="mp3.duration"
          step="1"
          :value="currentTime"
          @change="setPlayedTime"
          @input="valueInput"
          @pointerdown="down"
          @pointerup="up"
        />
      </div>
      <!-- <div>
        <button
          class="play"
          @click="playStop"
        >{{playText}}</button>
      </div> -->
    </section>
  </div>
</template>

<script>
import { Mp3 } from "./mp3";
import TitleBar from "../TitleBar";

let mp3 = new Mp3()
export default {
  data() {
    return {
      mp3,
      currentTimeSet: 0,
      isHoldProgressButton: false
    };
  },
  components: {
    TitleBar
  },
  async created() {
    mp3.playMp3ByIndex(+this.$route.params.index)
  },
  computed: {
    currentTime() {
      return this.isHoldProgressButton ? this.currentTimeSet : mp3.currentTime;
    }
  },
  methods: {
    changeSpeed(e) {
      mp3.setPlaybackRate(+e.target.value);
    },
    speedReset() {
      mp3.setPlaybackRate(1);
    },
    setPlayedTime() {
      mp3.setCurrentTime(this.currentTimeSet);
    },
    down() {
      this.isHoldProgressButton = true;
    },
    up() {
      this.isHoldProgressButton = false;
    },
    valueInput(e) {
      this.currentTimeSet = +e.target.value;
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
