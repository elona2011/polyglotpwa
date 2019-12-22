<template>
  <div id="app">
    <section>
      <router-view></router-view>
    </section>
    <footer>
      <nav>
        <ul>
          <li>
            <a href="#/">听力</a>
          </li>
          <li>
            <a href="#">录音</a>
          </li>
          <li>
            <a href="#/words">单词</a>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
section {
  flex: 12;
  overflow-y: scroll;
}
footer {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #eee;
}
footer nav,
footer nav ul {
  height: 100%;
}
footer ul {
  display: flex;
}
footer ul li {
  list-style: none;
  flex: 1;
}
footer ul li a {
  text-decoration: none;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
