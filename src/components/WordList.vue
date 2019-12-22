<template>
  <div class="main">
    <header>
      <TitleBar title="Word List">
        <strong @click="clickPlus">+</strong>
      </TitleBar>
    </header>
    <section>
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
          @pointerdown="down($event,item)"
          @pointermove="move($event,item)"
          @pointerup="up($event,item)"
          @click="detail(item)"
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
import { getListWordByForget, delWordById } from "../services/db";
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
    let list = await getListWordByForget();
    this.list = list.reverse()
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
          delWordById(item.id);
          this.list = await getListWordByForget();
        } else {
          li.setAttribute("style", ``);
        }
        // li.releasePointerCapture(e.pointerId);
      }
    },
    detail(item) {
      this.$router.push({ path: `/worddetail/${item.id}` });
    },
    clickPlus() {
      this.$router.push({ path: `/wordadd` });
    },
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
