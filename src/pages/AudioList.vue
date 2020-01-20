<template>
  <div class="main">
    <header>
      <TitleBar title="List">
        <strong @click="clickPlus">+</strong>
        <input @change="addMp3" id="audio_file" type="file" accept="audio/*" style="display:none;" />
      </TitleBar>
    </header>
    <section>
      <List :dataObj="mp3" detailRoute="play" layout="block" :delete="true" />
    </section>
  </div>
</template>

<script>
import AudioList from "../services/AudioList";
import TitleBar from "../components/TitleBar";
import List from "../components/List";

export default {
  data() {
    return {
      mp3: new AudioList()
    };
  },
  components: {
    TitleBar,
    List
  },
  methods: {
    clickPlus() {
      let audio_file = document.querySelector("#audio_file");
      audio_file.click();
    },
    addMp3(e) {
      var files = e.target.files;
      this.mp3.add(files[0]);
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
</style>
