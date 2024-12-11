<template>
  <div class="container">
    <h1>Eingegangene Nachrichten</h1>

    <ul>
      <li v-for="msg in messages" :key="msg.id">
        <strong>{{ msg.name }} ({{ msg.email }}):</strong>
        <p>{{ msg.message }}</p>
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
}
</style>
