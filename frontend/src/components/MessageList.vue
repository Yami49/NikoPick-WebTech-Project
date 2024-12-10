<template>
  <div class="container">
    <h1>Nachrichten</h1>
    <ul>
      <li v-for="msg in messages" :key="msg.id">
        <p><strong>Name:</strong> {{ msg.name }}</p>
        <p><strong>E-Mail:</strong> {{ msg.email }}</p>
        <p><strong>Telefon:</strong> {{ msg.phone }}</p>
        <p><strong>Nachricht:</strong> {{ msg.message }}</p>
        <p><strong>Datum:</strong> {{ formatDate(msg.createdAt) }}</p>
        <hr />
      </li>
    </ul>
    <p v-if="messages.length === 0">Keine Nachrichten vorhanden.</p>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "MessageList",
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await api.get("/message");
        this.messages = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Nachrichten:", error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

li {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
