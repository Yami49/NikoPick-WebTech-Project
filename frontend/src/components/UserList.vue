<template>
  <div class="container">
    <h2>Benutzerliste</h2>
    <ul>
      <li v-for="user in users" :key="user.userId">
        {{ user.username }} - {{ user.email }} - Rolle: {{ user.role }}
        <div class="button-group" v-if="userRole === 'admin'">
          <button @click="editUser(user)">Bearbeiten</button>
          <button @click="deleteUser(user.userId)">Löschen</button>
        </div>
      </li>
    </ul>

    <!-- Formular zum Bearbeiten eines Benutzers (nur für Admins) -->
    <form @submit.prevent="saveUser" v-if="isEditing && userRole === 'admin'">
      <h3>Benutzer bearbeiten</h3>
      <input
        v-model="editingUser.username"
        placeholder="Benutzername"
        required
      />
      <input
        v-model="editingUser.email"
        placeholder="E-Mail"
        type="email"
        required
      />
      <select v-model="editingUser.role" required>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Speichern</button>
      <button type="button" class="cancel" @click="resetForm">Abbrechen</button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import api from "@/services/api";
import { eventBus } from "@/eventBus";

export default {
  data() {
    return {
      users: [],
      errorMessage: "",
      successMessage: "",
      isEditing: false,
      editingUser: { userId: null, username: "", email: "", role: "user" },
      userRole: null, // Benutzerrolle hinzufügen
    };
  },
  created() {
    this.fetchUsers();
    this.userRole = eventBus.userRole; // Benutzerrolle aus dem Event-Bus laden
  },
  methods: {
    // Benutzerliste laden
    async fetchUsers() {
      try {
        const response = await api.get("/users");
        this.users = response.data;
      } catch (error) {
        this.errorMessage = "Fehler beim Laden der Benutzerliste.";
      }
    },
    // Benutzer zum Bearbeiten laden
    editUser(user) {
      this.editingUser = { ...user };
      this.isEditing = true;
      this.errorMessage = "";
      this.successMessage = "";
    },
    // Benutzer aktualisieren
    async saveUser() {
      try {
        await api.put(`/users/${this.editingUser.userId}`, {
          username: this.editingUser.username,
          email: this.editingUser.email,
          role: this.editingUser.role,
        });
        this.successMessage = "Benutzer erfolgreich aktualisiert.";
        this.isEditing = false;
        this.resetForm();
        this.fetchUsers();
      } catch (error) {
        this.errorMessage = "Fehler beim Aktualisieren des Benutzers.";
      }
    },
    // Benutzer löschen
    async deleteUser(userId) {
      if (confirm("Möchten Sie diesen Benutzer wirklich löschen?")) {
        try {
          await api.delete(`/users/${userId}`);
          this.successMessage = "Benutzer erfolgreich gelöscht.";
          this.fetchUsers();
        } catch (error) {
          this.errorMessage = "Fehler beim Löschen des Benutzers.";
        }
      }
    },
    // Formular zurücksetzen
    resetForm() {
      this.editingUser = {
        userId: null,
        username: "",
        email: "",
        role: "user",
      };
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f6f9;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

/* Überschrift */
h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2rem;
}

/* Benutzerliste */
ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

li:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Button-Gruppe */
.button-group {
  display: flex;
  gap: 10px;
}

.button-group button {
  padding: 8px 15px;
  font-size: 0.9rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-group button:hover {
  background-color: #2980b9;
}

.button-group button.delete {
  background-color: #e74c3c;
}

.button-group button.delete:hover {
  background-color: #c0392b;
}

/* Fehlermeldung */
.error-message {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
}

/* Erfolgsmeldung */
.success-message {
  color: #2ecc71;
  font-weight: bold;
  text-align: center;
}

/* Formular */
form {
  margin-top: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

form h3 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

form input,
form select {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s;
}

form input:focus,
form select:focus {
  border-color: #3498db;
  outline: none;
}

form button {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

form button:hover {
  background-color: #2980b9;
}

form button.cancel {
  background-color: #95a5a6;
}

form button.cancel:hover {
  background-color: #7f8c8d;
}
</style>
