<template>
  <div class="container">
    <h2>Anmelden</h2>
    <form @submit.prevent="handleSignIn">
      <div class="form-group">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Passwort</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Anmelden</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- Link zur Registrierungsseite -->
      <p class="register-link">
        Noch kein Konto?
        <button type="button" @click="navigateRegister">
          Jetzt registrieren
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import api from "@/services/api";
import { eventBus } from "@/eventBus";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSignIn() {
      try {
        const response = await api.post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        // Token speichern
        localStorage.setItem("token", response.data.token);

        // Rolle im Event-Bus setzen
        const payload = JSON.parse(atob(response.data.token.split(".")[1]));
        eventBus.setUserRole(payload.role);

        // Zur Homepage weiterleiten
        this.$router.push("/");
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error || "Anmeldung fehlgeschlagen.";
      }
    },
    navigateRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #5899ff;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 15px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3456a1;
}

.register-link {
  text-align: center;
  margin-top: 15px;
}

.register-link button {
  background: none;
  color: #5899ff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
}

.register-link button:hover {
  color: #3456a1;
}
</style>
