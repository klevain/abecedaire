<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Les Lettres</router-link> |
      <router-link to="/about">À propos</router-link>
    </div>
    <transition
      name="router-fade"
      mode="out-in"
      appear
    >
      <router-view/>
    </transition>
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

.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .5s;
}
.router-fade-enter, .router-fade-leave-to {
  opacity: 0;
}
</style>
