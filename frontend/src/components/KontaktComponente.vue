<template>
  <div class="container">
    <h1>Kontaktformular</h1>

    <!-- Kontaktformular -->
    <form @submit.prevent="sendMessage">
      <div class="form-group">
        <input v-model="form.name" placeholder="Ihr Name" required />
      </div>
      <div class="form-group">
        <input
          v-model="form.email"
          type="email"
          placeholder="Ihre E-Mail"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="form.phone"
          type="tel"
          placeholder="Ihre Telefonnummer"
        />
      </div>
      <div class="form-group">
        <textarea
          v-model="form.message"
          placeholder="Ihre Nachricht"
          required
        ></textarea>
      </div>
      <button type="submit" class="submit-button">Nachricht senden</button>
    </form>

    <!-- Erfolgsnachricht -->
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "ContactComponente",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    // Nachricht senden
    async sendMessage() {
      try {
        await api.post("/messages", this.form); // API-Aufruf zum Senden der Nachricht
        this.successMessage = "Ihre Nachricht wurde erfolgreich gesendet!";
        this.errorMessage = "";
        this.form = { name: "", email: "", phone: "", message: "" };
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      } catch (error) {
        this.errorMessage =
          "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.";
        this.successMessage = "";
        console.error("Fehler beim Senden der Nachricht:", error);
      }
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

form input,
form textarea {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

form textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.success-message {
  margin-top: 15px;
  color: #28a745;
  font-weight: bold;
  text-align: center;
}

.error-message {
  margin-top: 15px;
  color: #dc3545;
  font-weight: bold;
  text-align: center;
}
</style>
