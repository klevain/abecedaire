<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">À propos</router-link> |
      <router-link v-bind:to="{name: 'lettre', params: { char: 'a' }}">"A"</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 60rem;
  margin: auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
