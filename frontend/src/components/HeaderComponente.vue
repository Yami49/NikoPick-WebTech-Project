<template>
  <header class="header">
    <!-- Logo auf der linken Seite -->
    <div class="header-left">
      <div class="logo" @click="navigateHome" style="cursor: pointer">
        <img src="@/assets/images/nikopick-logo.png" alt="App Logo" />
      </div>
    </div>

    <!-- Navigationselemente auf der rechten Seite -->
    <div class="header-right">
      <!-- Burger-Menü -->
      <nav v-if="eventBus.userRole" class="burger-menu">
        <button @click="toggleMenu" class="burger-button">☰</button>
        <div v-if="isMenuOpen" class="menu-dropdown">
          <ul>
            <li @click="navigateTo('/products')">Products</li>
            <li
              v-if="eventBus.userRole === 'admin'"
              @click="navigateTo('/message')"
            >
              Messages
            </li>
            <li
              v-if="eventBus.userRole === 'admin'"
              @click="navigateTo('/category')"
            >
              Categories
            </li>
            <li
              v-if="eventBus.userRole === 'admin'"
              @click="navigateTo('/users')"
            >
              Benutzerliste
            </li>
            <li
              v-if="eventBus.userRole === 'user'"
              @click="navigateTo('/cart')"
            >
              Warenkorb
            </li>
          </ul>
        </div>
      </nav>

      <!-- Rolle anzeigen -->
      <nav v-if="eventBus.userRole">
        <span>{{ eventBus.userRole }}</span>
      </nav>

      <!-- Anmelden/Abmelden -->
      <nav>
        <button v-if="eventBus.userRole" @click="logout">Abmelden</button>
        <button v-else class="header-button" @click="navigateSignin">
          Anmelden
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
import { eventBus } from "@/eventBus";

export default {
  name: "HeaderComponente",
  data() {
    return {
      eventBus,
      isMenuOpen: false, // Zustand für das Burger-Menü
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        eventBus.userRole = payload.role; // Setze die Rolle direkt im eventBus
      } catch (error) {
        console.error("Fehler beim Dekodieren des Tokens:", error);
        eventBus.userRole = null;
      }
    }
  },
  methods: {
    navigateSignin() {
      this.$router.push("/signin");
    },
    navigateHome() {
      this.$router.push("/");
    },
    logout() {
      localStorage.removeItem("token");
      eventBus.clearUserRole();
      window.location.reload();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Burger-Menü ein-/ausblenden
    },
    navigateTo(path) {
      this.$router.push(path);
      this.isMenuOpen = false; // Menü schließen nach Navigation
    },
  },
};
</script>

<style src="../assets/header.css"></style>
<style src="../assets/styles.css"></style>
