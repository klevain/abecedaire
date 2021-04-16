<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      sticky
      class="border-bottom"
    >
      <b-navbar-brand to="/">L'Abécédaire</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/lettres">Les Lettres</b-nav-item>
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

<style lang="scss" >
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');

$font-family-sans-serif: 'Nunito', sans-serif;

// Then import Bootstrap an BootstrapVue SCSS files (order is important)
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss';

.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .5s;
}
.router-fade-enter, .router-fade-leave-to {
  opacity: 0;
}
</style>
