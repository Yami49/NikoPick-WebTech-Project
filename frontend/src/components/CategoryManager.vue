<template>
  <div class="container">
    <h1>Kategorien verwalten</h1>

    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Formular zum Erstellen einer Kategorie -->
    <form @submit.prevent="saveCategory">
      <input v-model="category.name" placeholder="Kategorie-Name" required />
      <input v-model="category.description" placeholder="Beschreibung" />
      <button type="submit">Kategorie hinzufügen</button>
    </form>

    <!-- Kategorienliste -->
    <ul>
      <li v-for="cat in categories" :key="cat.categoryId">
        <div class="category-details">
          <strong>{{ cat.name }}</strong>
          <p>{{ cat.description }}</p>
        </div>
        <div class="button-group">
          <router-link :to="`/category/${cat.categoryId}`">
            <button>Anzeigen</button>
          </router-link>
          <button @click="deleteCategory(cat.categoryId)">Löschen</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      categories: [],
      category: { name: "", description: "" },
      errorMessage: "",
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    // Alle Kategorien laden
    async fetchCategories() {
      try {
        const response = await api.get("/category");
        this.categories = response.data;
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = "Fehler beim Laden der Kategorien.";
        console.error("Fehler beim Laden der Kategorien:", error);
      }
    },
    // Kategorie speichern
    async saveCategory() {
      try {
        await api.post("/category", this.category);
        this.category = { name: "", description: "" };
        this.fetchCategories();
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = "Fehler beim Speichern der Kategorie.";
        console.error("Fehler beim Speichern der Kategorie:", error);
      }
    },
    // Kategorie löschen
    async deleteCategory(categoryId) {
      try {
        await api.delete(`/category/${categoryId}`);
        this.fetchCategories();
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = "Fehler beim Löschen der Kategorie.";
        console.error("Fehler beim Löschen der Kategorie:", error);
      }
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
form input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-details {
  display: flex;
  flex-direction: column;
}

/* Button-Gruppe für die Anzeige und Löschen Buttons */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end; /* Rechtsbündige Anordnung */
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
</style>
