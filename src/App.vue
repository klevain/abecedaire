<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">L'Abécédaire</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Les Lettres</b-nav-item>
          <b-nav-item to="/about">À propos</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .5s;
}
.router-fade-enter, .router-fade-leave-to {
  opacity: 0;
}
</style>
