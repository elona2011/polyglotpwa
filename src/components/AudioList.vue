<template>
  <div class="hello">
    <ul>
      <li v-for="item in list" :key="item.id">
        <div>
          <span>{{item.name}}</span>
          <span>{{item.length}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getList } from "../services/db";
export default {
  data(){
    return {
      list:[]
    }
  },
  props: {
    msg: String
  },
  async created(){
    let list = await getList()
    this.list = list
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
}
li div{
  display: flex;
  justify-content: center;
}
li span {
  flex: 1;
}
</style>
