<template>
  <section :class="layout">
    <ul>
      <li
        v-for="(item) in dataObj.list.filter(n=>!n.isCheck)"
        :key="item.name"
        @click="detail(item.name)"
        @pointerdown="down($event,item)"
        @pointermove="move($event,item)"
        @pointerup="up($event,item)"
      >
        <span>{{item.name}}</span>
        <input @click.stop="check($event,item)" type="checkbox" v-model="item.isCheck"/>
      </li>
    </ul>
    <ul>
      <li
        v-for="(item) in dataObj.list.filter(n=>n.isCheck)"
        :key="item.name"
        @click="detail(item.name)"
        @pointerdown="down($event,item)"
        @pointermove="move($event,item)"
        @pointerup="up($event,item)"
      >
        <span>{{item.name}}</span>
        <input @click.stop="check($event,item)" type="checkbox" v-model="item.isCheck"/>
      </li>
    </ul>
  </section>
</template>

<script>
import List from "../services/List";

export default {
  props: {
    dataObj: {
      type: List,
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
      x: 0,
      li: null,
      offset: 0
    };
  },
  methods: {
    check(e, item) {
      item.isCheck = e.target.checked;
      this.dataObj.edit(item);
    },
    detail(name) {
      this.dataObj.setIndexByName(name);
      this.detailRoute &&
        this.$router.push({
          path: `/${this.detailRoute}/${this.dataObj.storeName}`
        });
    },
    down(e) {
      this.x = e.x;
    },
    move(e) {
      if (this.delete) {
        e.preventDefault();
        this.li = e.target.closest("li");

        // li.setPointerCapture(e.pointerId)
        this.offset = e.x - this.x;
        if (this.offset < 0) {
          this.li.setAttribute(
            "style",
            `transform:translate(${this.offset}px);`
          );
        }
      }
    },
    up(e, item) {
      if (this.li) {
        let rect = this.li.getBoundingClientRect();
        if (Math.abs(this.offset) > rect.width / 2) {
          this.dataObj.delByName(item.name);
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
ul > li > input {
  display: none;
}
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
  padding: 5px;
}
.checkbox li {
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  height: 8vh;
  background-color: bisque;
  /* justify-content: center; */
  margin-bottom: 2px;
  touch-action: pan-y;
  padding: 5px;
}
.checkbox li > span {
  flex: 1;
  text-align: left;
}
.checkbox li > input {
  display: inline-block;
  width: 6vh;
  height: 6vh;
}
</style>
