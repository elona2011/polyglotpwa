<template>
  <div class="detail">
    <section class="setup-group">
      <div class="group-item">
        <div
          class="word"
          @pointerdown="down"
          @pointermove="move"
          @pointerup="up"
          :style="{transform:'translateX('+offset+'px)'}"
        >
          <span
            class="name"
            :style="{fontSize:word.fontSize,color}"
          >{{word.curItem.name}}</span>
        </div>
        <PlayButton
          v-if="word.curItem.audioFile"
          :audioPlay="audio"
        ></PlayButton>
        <div class="name-value-reset">
          <span class="name">total:</span>
          <span class="name">{{word.curItem.totalNum}}</span>
        </div>
        <div class="name-value-reset">
          <span class="name">forget:</span>
          <span class="name">{{word.curItem.forgetNum}}</span>
        </div>
      </div>
    </section>
    <section class="play-group">
      <div>
        <button
          class="remember"
          @click="remember"
        >Remember</button>
        <button
          class="forget"
          @click="forget"
        >Forget</button>
      </div>
    </section>
  </div>
</template>

<script>
import Word from "../services/Word";
import { getColor } from "../services/color";
import PlayButton from "../components/PlayButton";
import AudioPlay from "../services/AudioPlay";

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
      word,
      offset: 0,
      color: getColor()
    };
  },
  computed: {
    audio() {
      return new AudioPlay({ file: this.word.curItem.audioFile });
    }
  },
  methods: {
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
      if (this.offset < -50) {
        this.word.getNextToCurrent();
        // this.fontSize = this.word.getFontSize();
        this.color = getColor();
        this.offset = 0;
      } else if (this.offset > 50) {
        this.word.getPrevToCurrent();
        // this.fontSize = this.word.getFontSize();
        this.color = getColor();
        this.offset = 0;
      } else {
        this.offset = 0;
      }
    },
    del() {
      if (confirm("Delete?")) {
        this.word.delWord();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
div.detail header {
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.word {
  flex: 1;
  position: relative;
  touch-action: pan-y;
}
.word .name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
