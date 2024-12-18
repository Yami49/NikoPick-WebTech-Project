<template>
  <div class="container">
    <h2>Registrieren</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Benutzername</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Passwort</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Registrieren</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import api from "@/services/api"; // Stelle sicher, dass dein API-Service korrekt eingerichtet ist

export default {
  name: "RegisterComponente",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      role: "user",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        this.errorMessage = "";
        this.successMessage = "";

        await api.post("/auth/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          role: "user",
        });

        this.successMessage =
          "Registrierung erfolgreich! Du wirst zur Anmeldeseite weitergeleitet.";
        setTimeout(() => {
          this.$router.push("/signin");
        }, 2000);
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error ||
          "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
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

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.success-message {
  color: green;
  margin-top: 10px;
  text-align: center;
}
</style>
