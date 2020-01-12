<template>
  <section :class="layout">
    <ul>
      <li
        v-for="item in dataObj.list"
        :key="item.id"
        @click="detail(item)"
        @pointerdown="down($event,item)"
        @pointermove="move($event,item)"
        @pointerup="up($event,item)"
      >
        <span>{{item.name}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import Word from "../services/Word";

export default {
  props: {
    dataObj: {
      type: Object,
      required: true
    },
    detailRoute: {
      type: String
    },
    layout: {
      type: String
    },
    delete: {
      type: Boolean
    }
  },
  data() {
    return {
      list: [],
      x: 0,
      li: null,
      offset: 0
    };
  },
  created() {
    this.dataObj.getList();
  },
  methods: {
    detail(item) {
      this.dataObj.setCurrent(item);
      this.detailRoute && this.$router.push({ path: `/${this.detailRoute}` });
    },
    down(e) {
      this.x = e.x;
    },
    move(e) {
      if(this.delete){
        e.preventDefault();
        this.li = e.target.closest("li");
  
        // li.setPointerCapture(e.pointerId)
        this.offset = e.x - this.x;
        if (this.offset < 0) {
          this.li.setAttribute("style", `transform:translate(${this.offset}px);`);
        }
      }
    },
    up(e, item) {
      if (this.li) {
        let rect = this.li.getBoundingClientRect();
        if (Math.abs(this.offset) > rect.width / 2) {
          this.dataObj.delMp3ById(item.id);
          // this.list = await mp3.getMp3List();
        } else {
          this.li.setAttribute("style", ``);
        }
        // li.releasePointerCapture(e.pointerId);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid ul {
  display: inline-grid;
  grid-template-columns: repeat(5, 20vw);
  grid-auto-rows: 20vw;
}
.grid ul li {
  background-color: bisque;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 1px;
}
.inline li {
  background-color: bisque;
  margin: 3px 2px;
  padding: 2px 8px;
  position: relative;
  touch-action: pan-y;
  display: inline-block;
  height: 7vh;
  line-height: 7vh;
  float: left;
}
.block li {
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  height: 8vh;
  background-color: bisque;
  /* justify-content: center; */
  margin-bottom: 2px;
  touch-action: pan-y;
}
</style>
