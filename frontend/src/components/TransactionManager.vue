<template>
  <div class="container">
    <h1>Transaktionen</h1>

    <!-- Formular für Transaktion -->
    <form @submit.prevent="saveTransaction">
      <input
        v-model="transaction.customerName"
        placeholder="Kundenname"
        required
      />
      <select v-model="transaction.transactionType" required>
        <option disabled value="">Wähle Transaktionsart</option>
        <option>Kauf</option>
        <option>Verkauf</option>
        <option>Rückerstattung</option>
      </select>
      <input
        v-model.number="transaction.amount"
        type="number"
        placeholder="Betrag"
        required
      />
      <textarea
        v-model="transaction.description"
        placeholder="Beschreibung"
      ></textarea>
      <button type="submit">Transaktion hinzufügen</button>
    </form>

    <h2>Alle Transaktionen</h2>
    <ul>
      <li v-for="trans in transactions" :key="trans.id">
        <strong>{{ trans.customerName }}:</strong> {{ trans.transactionType }} -
        {{ trans.amount }}€
        <p>{{ trans.description }}</p>
        <button @click="deleteTransaction(trans.id)">Löschen</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      transactions: [],
      transaction: {
        customerName: "",
        transactionType: "",
        amount: null,
        description: "",
      },
    };
  },
  created() {
    this.fetchTransactions();
  },
  methods: {
    // Transaktion speichern
    async saveTransaction() {
      try {
        await api.post("/transactions", this.transaction);
        this.resetForm();
        this.fetchTransactions();
      } catch (error) {
        console.error("Fehler beim Speichern der Transaktion:", error);
      }
    },
    // Alle Transaktionen abrufen
    async fetchTransactions() {
      try {
        const response = await api.get("/transactions");
        this.transactions = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
    // Transaktion löschen
    async deleteTransaction(id) {
      try {
        await api.delete(`/transactions/${id}`);
        this.fetchTransactions();
      } catch (error) {
        console.error("Fehler beim Löschen der Transaktion:", error);
      }
    },
    // Formular zurücksetzen
    resetForm() {
      this.transaction = {
        customerName: "",
        transactionType: "",
        amount: null,
        description: "",
      };
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
form input,
form select,
form textarea {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
}

form button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
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
  flex-direction: column;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
