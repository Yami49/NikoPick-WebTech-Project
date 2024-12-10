<template>
  <header class="header">
    <div class="logo" @click="navigateHome" style="cursor: pointer">
      <img src="@/assets/images/nikopick-logo.jpeg" alt="App Logo" />
    </div>

    <!-- Rolle anzeigen, wenn der Benutzer eingeloggt ist -->
    <nav>
      <span v-if="eventBus.userRole">
        Eingeloggt als {{ eventBus.userRole }}
      </span>
    </nav>

    <!-- Abmelden-Button anzeigen, wenn der Benutzer eingeloggt ist -->
    <nav v-if="eventBus.userRole">
      <button @click="logout">Abmelden</button>
    </nav>

    <!-- Anmelden-Button anzeigen, wenn der Benutzer nicht eingeloggt ist -->
    <nav v-if="!eventBus.userRole">
      <button class="header-button" @click="navigateSignin">Anmelden</button>
    </nav>
  </header>
</template>

<script>
import { eventBus } from "@/eventBus";

export default {
  name: "HeaderComponente",
  data() {
    return {
      eventBus,
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
      localStorage.removeItem("token"); // Token aus dem lokalen Speicher entfernen
      eventBus.clearUserRole(); // Setze die Rolle im eventBus zurück
    },
  },
};
</script>

<style src="../assets/header.css"></style>
