<template>
  <div class="container">
    <h2>Benutzerliste</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }} - {{ user.email }}
        <button @click="deleteUser(user.id)">Löschen</button>
      </li>
    </ul>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      users: [],
      errorMessage: "",
      successMessage: "",
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.get("/user");
        this.users = response.data;
      } catch (error) {
        this.errorMessage = "Fehler beim Laden der Benutzerliste.";
      }
    },
    async deleteUser(userId) {
      try {
        await api.delete(`/user/${userId}`);
        this.successMessage = "Benutzer erfolgreich gelöscht.";
        this.fetchUsers(); // Benutzerliste nach dem Löschen aktualisieren
      } catch (error) {
        this.errorMessage = "Fehler beim Löschen des Benutzers.";
      }
    },
  },
};
</script>

<style src="../assets/header.css"></style>

<style scoped>
.error-message {
  color: red;
}

.success-message {
  color: green;
}
</style>
