<template>
  <div class="container">
    <h1>Eingegangene Nachrichten</h1>

    <div v-if="messages.length === 0" class="empty-message">
      <p>Keine Nachrichten vorhanden.</p>
    </div>

    <ul class="message-list">
      <li
        v-for="msg in messages"
        :key="msg.id"
        class="message-card"
        @click="goToMessageDetail(msg.id)"
        style="cursor: pointer"
      >
        <div class="message-header">
          <h2>{{ msg.name }}</h2>
          <p class="email">{{ msg.email }}</p>
          <p class="phone" v-if="msg.phone">📞 {{ msg.phone }}</p>
        </div>
        <p class="message-content">{{ msg.message }}</p>
        <button @click="deleteMessage(msg.id)" class="delete-button">
          Löschen
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    // Nachrichten laden
    async fetchMessages() {
      try {
        const response = await api.get("/message");
        this.messages = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Nachrichten:", error);
      }
    },
    // Nachricht löschen
    async deleteMessage(id) {
      if (confirm("Möchten Sie diese Nachricht wirklich löschen?")) {
        try {
          await api.delete("/message", {
            data: { id }, // Die ID im Request-Body senden
          });
          this.fetchMessages(); // Nachrichtenliste nach dem Löschen aktualisieren
        } catch (error) {
          console.error("Fehler beim Löschen der Nachricht:", error);
        }
      }
    },
    goToMessageDetail(id) {
      this.$router.push(`/message/${id}`);
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
.container {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-list {
  list-style: none;
  padding: 0;
}

.message-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.message-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.message-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.email {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 5px 0;
}

.phone {
  font-size: 0.9rem;
  color: #27ae60;
  margin: 5px 0;
}

.message-content {
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 15px;
}

.empty-message {
  text-align: center;
  color: #7f8c8d;
  font-size: 1.2rem;
  margin-top: 50px;
}
</style>
