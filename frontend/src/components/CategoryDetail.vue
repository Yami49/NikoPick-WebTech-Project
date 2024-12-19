<template>
  <div class="container">
    <h1>Kategorie Details</h1>

    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Kategorie Details anzeigen -->
    <div v-if="category" class="category-details">
      <h2>{{ category.name }}</h2>
      <p><strong>Beschreibung:</strong> {{ category.description }}</p>

      <h3>Produkte in dieser Kategorie:</h3>
      <ul v-if="category.product && category.product.length">
        <li v-for="product in category.product" :key="product.id">
          {{ product.name }} - {{ product.price }}€
        </li>
      </ul>
      <p v-else>Keine Produkte in dieser Kategorie vorhanden.</p>
    </div>

    <div v-else>
      <p>Lade Kategorie...</p>
    </div>

    <button @click="$router.go(-1)">Zurück</button>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "CategoryDetail",
  data() {
    return {
      category: null,
      errorMessage: "",
    };
  },
  created() {
    this.fetchCategory();
  },
  methods: {
    // Eine einzelne Kategorie laden
    async fetchCategory() {
      try {
        const categoryId = this.$route.params.categoryId;
        const response = await api.get(`/category/${categoryId}`);
        this.category = response.data;
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = "Fehler beim Laden der Kategorie.";
        console.error("Fehler beim Laden der Kategorie:", error);
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
  background-color: #f4f6f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.category-details {
  margin-bottom: 20px;
}

h2 {
  margin: 10px 0;
}

h3 {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
}

button:hover {
  background-color: #2980b9;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
</style>
