<template>
  <div class="container">
    <h1>Nachrichtendetails</h1>
    <div v-if="message" class="message-detail">
      <p><strong>Name:</strong> {{ message.name }}</p>
      <p><strong>Email:</strong> {{ message.email }}</p>
      <p v-if="message.phone"><strong>Telefon:</strong> {{ message.phone }}</p>
      <p><strong>Nachricht:</strong></p>
      <p class="message-content">{{ message.message }}</p>
    </div>
    <div v-else>
      <p>Lade Nachricht...</p>
    </div>
    <button @click="$router.go(-1)" class="back-button">Zurück</button>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  props: ["messageId"], // Änderung: messageId statt id
  data() {
    return {
      message: null,
      errorMessage: "", // Fehlernachricht für den Fehlerfall
    };
  },
  created() {
    this.fetchMessage();
  },
  methods: {
    // Nachricht anhand der messageId laden
    async fetchMessage() {
      try {
        const response = await api.get(`/messages/${this.messageId}`);
        this.message = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Nachricht:", error);
        this.errorMessage =
          "Fehler beim Laden der Nachricht. Bitte versuchen Sie es später erneut.";
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.message-detail {
  font-size: 1.2rem;
  line-height: 1.6;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.message-content {
  white-space: pre-wrap;
  background-color: #eef2f5;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
}

.back-button {
  display: block;
  margin: 30px auto 0;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980b9;
}

.error-message {
  color: #dc3545;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>
