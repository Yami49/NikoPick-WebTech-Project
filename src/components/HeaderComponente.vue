<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/images/nikopick-logo.jpeg" alt="App Logo" />
    </div>
    <nav>
      <button class="header-button" @click="navigateSignin">Anmelden</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponente",
  methods: {
    navigateSignin() {
      this.$router.push("/signin");
    },
  },
};
</script>

<style src="../assets/header.css"></style>
