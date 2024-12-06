<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">Meine Website</h1>
      <nav class="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <button class="menu-toggle" @click="toggleMenu">☰</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponente",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      const nav = document.querySelector('.nav ul');
      if (this.isMenuOpen) {
        nav.classList.add('active');
      } else {
        nav.classList.remove('active');
      }
    },
  },
};
</script>

<style src="../assets/header.css"></style>
