<template>
  <div id="app">
    <HeaderComponente />
    <!-- Header wird hier eingebunden -->
    <router-view />
    <!-- Geroutete Seite wird hier eingebunden -->
    <FooterComponente />
    <!-- Footer wird hier eingebunden -->
  </div>
</template>

<script>
import HeaderComponente from "./components/HeaderComponente.vue"; // Header importieren
import FooterComponente from "./components/FooterComponente.vue"; // Footer importieren

export default {
  name: "App",
  components: {
    HeaderComponente,
    FooterComponente,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0; /* Entferne margin-top, da Header enthalten ist */
}
</style>
