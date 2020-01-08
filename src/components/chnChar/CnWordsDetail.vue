<template>
  <div class="main">
    <header>
      <TitleBar title="New Word">
        <strong @click="del">-</strong>
      </TitleBar>
    </header>
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
            :style="{fontSize,color}"
          >{{words.curItem.name}}</span>
        </div>
        <div class="name-value-reset">
          <span class="name">total:</span>
          <span class="name">{{words.curItem.totalNum}}</span>
        </div>
        <div class="name-value-reset">
          <span class="name">forget:</span>
          <span class="name">{{words.curItem.forgetNum}}</span>
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
import Word from "../../services/Word";
import TitleBar from "../TitleBar";
import { getColor } from "../../services/color";

let x;
export default {
  data() {
    return {
      words: new Word("cnWords"),
      offset: 0,
      color: getColor(),
      fontSize: this.getFontSize()
    };
  },
  components: {
    TitleBar
  },
  methods: {
    remember() {
      this.words.remember()
    },
    forget() {
      this.words.forget()
    },
    down(e) {
      x = e.x;
    },
    move(e) {
      this.offset = e.x - x;
    },
    up() {
      if (this.offset < -50 && this.words.getNext()) {
        this.words.getNextToCurrent();
        this.fontSize = this.getFontSize();
        this.color = getColor();
        this.offset = 0;
      } else if (this.offset > 50 && this.words.getPrev()) {
        this.words.getPrevToCurrent();
        this.fontSize = this.getFontSize();
        this.color = getColor();
        this.offset = 0;
      } else {
        this.offset = 0;
      }
    },
    getFontSize() {
      return 15 + Math.floor(Math.random() * 20) + "vw";
    },
    del() {
      if (confirm("Delete?")) {
        this.words.delWord();
      }
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
