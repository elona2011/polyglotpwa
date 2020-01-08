<template>
  <div class="main">
    <header>
      <TitleBar title="List">
        <strong @click="clickPlus">+</strong>
        <input @change="addMp3" id="audio_file" type="file" accept="audio/*" style="display:none;" />
      </TitleBar>
    </header>
    <section>
      <ul>
        <li
          v-for="(item,index) in mp3.list"
          :key="item.id"
          @pointerdown="down($event,item)"
          @pointermove="move($event,item)"
          @pointerup="up($event,item)"
          @click="play(index)"
        >
          <div>
            <span>{{item.name}}</span>
            <span>{{item.length}}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { Mp3 } from "./mp3";
import TitleBar from "../TitleBar";

let x,
  li,
  offset,
  mp3 = new Mp3();
export default {
  data() {
    return {
      mp3
    };
  },
  components: {
    TitleBar
  },
  created() {
    mp3.getMp3List();
  },
  methods: {
    down(e) {
      x = e.x;
    },
    move(e) {
      e.preventDefault();
      li = e.target.closest("li");

      // li.setPointerCapture(e.pointerId)
      offset = e.x - x;
      if (offset < 0) {
        li.setAttribute("style", `transform:translate(${offset}px);`);
      }
    },
    up(e, item) {
      if (li) {
        let rect = li.getBoundingClientRect();
        if (Math.abs(offset) > rect.width / 2) {
          mp3.delMp3ById(item.id);
          // this.list = await mp3.getMp3List();
        } else {
          li.setAttribute("style", ``);
        }
        // li.releasePointerCapture(e.pointerId);
      }
    },
    play(i) {
      this.$router.push({ path: `/play/${i}` });
    },
    clickPlus() {
      let audio_file = document.querySelector("#audio_file");
      audio_file.click();
    },
    addMp3(e) {
      var files = e.target.files;
      mp3.addMp3(files[0]);
      // this.list = await mp3.getMp3List();
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
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 8vh;
  background-color: bisque;
  margin-bottom: 2px;
  position: relative;
  touch-action: pan-y;
}
li div {
  display: flex;
  justify-content: center;
}
li span {
  flex: 1;
}
</style>
