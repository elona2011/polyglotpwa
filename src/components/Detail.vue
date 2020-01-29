<template>
  <div class="detail">
    <section class="setup-group">
      <div
        class="group-item"
        @pointerdown="down"
        @pointermove="move"
        @pointerup="up"
        :style="{transform:'translateX('+offset+'px)'}"
      >
        <div class="word">
          <span
            class="mainword"
            :class="classObject"
            :style="{fontSize,color}"
          >{{word.curItem&&word.curItem.name}}</span>
        </div>
        <PlayButton
          v-if="word.curItem&&word.curItem.audioFile"
          :audioPlay="audioPlay"
          fontsize="20vw"
        ></PlayButton>
        <div class="example" v-if="word.curItem&&word.curItem.exp&&word.curItem.exp.length">
          <ul>
            <li v-for="(item,n) in word.curItem.exp" :key="n">{{item}}</li>
          </ul>
        </div>
        <div class="name-value-reset">
          <span class="name">total:</span>
          <span class="name">{{word.curItem&&word.curItem.totalNum}}</span>
        </div>
        <div class="name-value-reset">
          <span class="name">forget:</span>
          <span class="name">{{word.curItem&&word.curItem.forgetNum}}</span>
        </div>
      </div>
    </section>

    <section class="play-group">
      <div>
        <button class="remember" @click="remember">Remember</button>
        <button class="forget" @click="forget">Forget</button>
      </div>
    </section>
  </div>
</template>

<script>
import Word from "../services/Word";
import { getColor, getRotateZ, getFontSize } from "../services/color";
import PlayButton from "../components/PlayButton";
import AudioPlay from "../services/AudioPlay";
import AudioList from "../services/AudioList";

let x;
export default {
  props: {
    storeName: {
      type: String,
      required: true
    }
  },
  components: {
    PlayButton
  },
  data() {
    let word = new Word(this.storeName);
    return {
      audioPlay: new AudioPlay(),
      word,
      offset: 0,
      color: getColor(),
      transform: getRotateZ(),
      fontSize: getFontSize(),
      classObject: this.setAnimation()
    };
  },
  async mounted() {
    await this.word.getCurrent();
    let mp3 = new AudioList();
    this.audioPlay.src = this.word.curItem && this.word.curItem.audioFile;
    mp3.insertAudio(this.audioPlay);
  },
  methods: {
    setAnimation() {
      if (this.storeName === "words") {
        let pro = ["shake", "skew", "skew2", "roll", ""];
        let num = Math.floor(Math.random() * pro.length);
        return {
          [pro[num]]: true
        };
      } else {
        return {};
      }
    },
    remember() {
      this.word.remember();
    },
    forget() {
      this.word.forget();
    },
    down(e) {
      x = e.x;
    },
    move(e) {
      this.offset = e.x - x;
    },
    up() {
      if (this.offset < -50 || this.offset > 50) {
        if (this.offset < -50) {
          this.word.getNextToCurrent();
        } else {
          this.word.getPrevToCurrent();
        }
        this.color = getColor();
        this.transform = getRotateZ();
        this.fontSize = getFontSize(this.word.curItem.name);
        this.classObject = this.setAnimation();
        this.audioPlay.src = this.word.curItem.audioFile;
      }
      this.offset = 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes skew {
  0% {
    transform: skewX(20deg);
  }
  100% {
    transform: skewX(-20deg);
  }
}
@keyframes shake {
  0% {
    transform: skewY(20deg);
  }
  100% {
    transform: skewY(-20deg);
  }
}
@keyframes skew2 {
  0% {
    transform: skew(20deg, 20deg);
  }
  100% {
    transform: skew(-20deg, -20deg);
  }
}
@keyframes roll {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  touch-action: pan-y;
}
.word {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.word > .mainword {
  animation-direction: alternate;
}
.shake {
  animation: shake 1s infinite;
}
.skew {
  animation: skew 1s infinite;
}
.skew2 {
  animation: skew2 1s infinite;
}
.roll {
  animation: roll 3s infinite;
}
.example {
  flex: 1;
  display: flex;
  justify-content: center;
}
.example > ul > li {
  margin: 10vw 10vh;
}
.name-value-reset {
  display: flex;
  justify-content: center;
}
.name-value-reset .name {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name-value-reset input {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
input[type="text"] {
  border: none;
  outline: none;
  border-bottom: 1px solid #999;
}

.name-value-reset .reset {
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
section.play-group button {
  border: none;
  width: 15vw;
  flex: 1;
}
section.play-group button.remember {
  background-color: greenyellow;
}
</style>
