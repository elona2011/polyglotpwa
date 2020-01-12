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
          <span class="name" :style="{fontSize}">{{word?word.name:''}}</span>
        </div>
        <div class="name-value-reset">
          <span class="name">total:</span>
          <span class="name">{{word?word.totalNum:''}}</span>
        </div>
        <div class="name-value-reset">
          <span class="name">forget:</span>
          <span class="name">{{word?word.forgetNum:''}}</span>
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
import Word from "../../services/Word";
import TitleBar from "../../components/TitleBar";
import { storeName_enDadWords } from "../../services/db/config";

let c = new Word(storeName_enDadWords),
  x;
export default {
  data() {
    return {
      word: c,
      offset: 0
    };
  },
  components: {
    TitleBar
  },
  computed: {
    fontSize() {
      return this.word && this.word.name
        ? (80 / this.word.name.length).toFixed(0) + "vw"
        : "10vw";
    }
  },
  methods: {
    remember() {
      this.word.totalNum++;
      this.word.forgetNum =
        this.word.forgetNum <= 0 ? 0 : --this.word.forgetNum;
      c.pushCurItem();
      c.getNextToCurrent();
    },
    forget() {
      this.word.totalNum++;
      ++this.word.forgetNum;
      c.pushCurItem();
      c.getNextToCurrent();
    },
    down(e) {
      x = e.x;
    },
    move(e) {
      this.offset = e.x - x;
    },
    up() {
      if (this.offset < -50) {
        c.getNextToCurrent();
        this.offset = 0;
      } else if (this.offset > 50) {
        c.getPrevToCurrent();
        this.offset = 0;
      } else {
        this.offset = 0;
      }
    },
    async del() {
      if (confirm("Delete?")) {
        this.word = await c.delWord();
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
