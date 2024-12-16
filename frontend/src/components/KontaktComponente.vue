<template>
  <div class="container">
    <h1>Kontaktformular</h1>

    <!-- Kontaktformular -->
    <form @submit.prevent="sendMessage">
      <input v-model="form.name" placeholder="Ihr Name" required />
      <input
        v-model="form.email"
        type="email"
        placeholder="Ihre E-Mail"
        required
      />
      <input v-model="form.phone" type="tel" placeholder="Ihre Telefonnummer" />
      <textarea
        v-model="form.message"
        placeholder="Ihre Nachricht"
        required
      ></textarea>
      <button type="submit">Nachricht senden</button>
    </form>

    <!-- Erfolgsnachricht -->
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
    };
  },
  methods: {
    // Nachricht senden
    async sendMessage() {
      try {
        await api.post("/message", this.form); // API-Aufruf zum Senden der Nachricht
        this.successMessage = "Ihre Nachricht wurde erfolgreich gesendet!";
        this.form = { name: "", email: "", phone: "", message: "" };
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      } catch (error) {
        console.error("Fehler beim Senden der Nachricht:", error);
      }
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
form input,
form textarea {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.success-message {
  margin-top: 15px;
  color: #28a745;
  font-weight: bold;
  text-align: center;
}
</style>
