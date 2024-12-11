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
      <textarea
        v-model="form.message"
        placeholder="Ihre Nachricht"
        required
      ></textarea>
      <button type="submit">Nachricht senden</button>
    </form>
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
        message: "",
      },
      messages: [],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    // Nachricht senden
    async sendMessage() {
      try {
        await api.post("/messages", this.form);
        this.form = { name: "", email: "", message: "" };
        this.fetchMessages();
      } catch (error) {
        console.error("Fehler beim Senden der Nachricht:", error);
      }
    },
    // Alle Nachrichten abrufen
    async fetchMessages() {
      try {
        const response = await api.get("/messages");
        this.messages = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Nachrichten:", error);
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
}

h1 {
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
</style>
