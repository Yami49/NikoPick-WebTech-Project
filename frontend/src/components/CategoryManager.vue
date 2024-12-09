<template>
  <div class="container">
    <h1>Kategorien verwalten</h1>

    <!-- Formular zum Erstellen einer Kategorie -->
    <form @submit.prevent="saveCategory">
      <input v-model="category.name" placeholder="Kategorie-Name" required />
      <input v-model="category.description" placeholder="Beschreibung" />
      <button type="submit">Kategorie hinzufügen</button>
    </form>

    <!-- Kategorienliste -->
    <ul>
      <li v-for="cat in categories" :key="cat.id">
        {{ cat.name }} - {{ cat.description }}
        <button @click="deleteCategory(cat.id)">Löschen</button>
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
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    // Alle Kategorien laden
    async fetchCategories() {
      try {
        const response = await api.get("/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Kategorien:", error);
      }
    },
    // Kategorie speichern
    async saveCategory() {
      try {
        await api.post("/categories", this.category);
        this.category = { name: "", description: "" };
        this.fetchCategories();
      } catch (error) {
        console.error("Fehler beim Speichern der Kategorie:", error);
      }
    },
    // Kategorie löschen
    async deleteCategory(id) {
      try {
        await api.delete(`/categories/${id}`);
        this.fetchCategories();
      } catch (error) {
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
</style>
