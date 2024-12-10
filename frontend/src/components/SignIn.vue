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
</style>
