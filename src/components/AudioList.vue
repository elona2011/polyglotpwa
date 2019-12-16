<template>
  <div class="hello">
    <ul>
      <li
        v-for="item in list"
        :key="item.id"
        @pointerdown="down($event,item)"
        @pointermove="move($event,item)"
        @pointerup="up($event,item)"
      >
        <div>
          <span>{{item.name}}</span>
          <span>{{item.length}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getList, delMp3 } from "../services/db";
import { bus } from "../main";

let x, li, offset;
export default {
  data() {
    return {
      list: []
    };
  },
  props: {
    msg: String
  },
  async created() {
    bus.$on("add-mp3", async data => {
      this.list = await getList();
    });
    this.list = await getList();
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
      let rect = li.getBoundingClientRect();
      if (Math.abs(offset) > rect.width / 2) {
        delMp3(item.id);
        this.list = await getList();
        // li.setAttribute("style", `transform:translate(${-rect.width}px);`);
      } else {
        li.setAttribute("style", ``);
      }
      // li.releasePointerCapture(e.pointerId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
