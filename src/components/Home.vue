<template>
  <div class="main">
    <header>
      <TitleBar title="Home">
        <strong @click="clickPlus">+</strong>
        <input @change="addMp3" id="audio_file" type="file" accept="audio/*" style="display:none;" />
      </TitleBar>
    </header>
    <section>
      home
    </section>
  </div>
</template>

<script>
import { getListMp3, delMp3ById, addMp3 } from "../services/db";
import { bus } from "../main";
import TitleBar from "./TitleBar";

let x, li, offset;
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    TitleBar
  },
  async created() {
    this.list = await getListMp3();
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
    async up(e, item) {
      if (li) {
        let rect = li.getBoundingClientRect();
        if (Math.abs(offset) > rect.width / 2) {
          delMp3ById(item.id);
          this.list = await getListMp3();
        } else {
          li.setAttribute("style", ``);
        }
        // li.releasePointerCapture(e.pointerId);
      }
    },
    play(item) {
      this.$router.push({ path: `/play/${item.id}` });
    },
    clickPlus() {
      let audio_file = document.querySelector("#audio_file");
      audio_file.click();
    },
    async addMp3(e) {
      var files = e.target.files;
      var file = URL.createObjectURL(files[0]);
      await addMp3(files[0]);
      this.list = await getListMp3();
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
