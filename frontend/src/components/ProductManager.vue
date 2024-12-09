<template>
  <div class="container">
    <h1>Produktverwaltung</h1>

    <!-- Such- und Filterbereich -->
    <div class="search-filters">
      <input
        v-model="searchQuery"
        @input="searchProducts"
        placeholder="Suche nach Name"
      />
      <input v-model="minPrice" placeholder="Min Preis" type="number" />
      <input v-model="maxPrice" placeholder="Max Preis" type="number" />
      <!-- Kategorie-Dropdown für den Filter -->
      <select v-model="selectedCategory" @change="searchProducts">
        <option value="">Alle Kategorien</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <button @click="searchProducts">Suchen</button>
    </div>

    <!-- Formular zum Erstellen/Bearbeiten eines Produkts -->
    <form @submit.prevent="saveProduct">
      <input v-model="product.name" placeholder="Name" required />
      <input v-model="product.description" placeholder="Beschreibung" />
      <input
        v-model="product.price"
        type="number"
        placeholder="Preis"
        required
      />

      <!-- Kategorie-Dropdown -->
      <select v-model="product.category">
        <option value="" disabled>Wähle eine Kategorie</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>

      <button type="submit">
        {{ isEditing ? "Aktualisieren" : "Erstellen" }}
      </button>
      <button type="button" @click="resetForm" v-if="isEditing">
        Abbrechen
      </button>
    </form>

    <!-- Produktliste -->
    <ul>
      <li v-for="p in products" :key="p.id">
        <span>
          {{ p.name }} - {{ p.price }}€ - {{ getCategoryName(p.category) }}
        </span>
        <div class="button-group">
          <button @click="editProduct(p)">Bearbeiten</button>
          <button @click="deleteProduct(p.id)">Löschen</button>
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
      products: [],
      categories: [],
      searchQuery: "",
      minPrice: "",
      maxPrice: "",
      selectedCategory: "",
      product: { name: "", description: "", price: 0, category: "" },
      isEditing: false,
      editingId: null,
    };
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    // Alle Produkte laden
    async fetchProducts() {
      try {
        const response = await api.get("/products");
        this.products = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Produkte:", error);
      }
    },
    // Alle Kategorien laden
    async fetchCategories() {
      try {
        const response = await api.get("/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Kategorien:", error);
      }
    },
    // Such- und Filterfunktion
    async searchProducts() {
      try {
        const response = await api.get("/products/search", {
          params: {
            name: this.searchQuery,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
            category: this.selectedCategory,
          },
        });
        this.products = response.data;
      } catch (error) {
        console.error("Fehler bei der Suche:", error);
      }
    },
    // Produkt speichern (Erstellen oder Aktualisieren)
    async saveProduct() {
      try {
        if (this.isEditing) {
          await api.put(`/products/${this.editingId}`, this.product);
        } else {
          await api.post("/products", this.product);
        }
        this.resetForm();
        this.fetchProducts();
      } catch (error) {
        console.error("Fehler beim Speichern des Produkts:", error);
      }
    },

    // Produkt zum Bearbeiten laden
    editProduct(product) {
      this.product = { ...product };
      this.isEditing = true;
      this.editingId = product.id;
    },

    // Produkt löschen
    async deleteProduct(id) {
      try {
        await api.delete(`/products/${id}`);
        this.fetchProducts();
      } catch (error) {
        console.error("Fehler beim Löschen des Produkts:", error);
      }
    },

    // Formular zurücksetzen
    resetForm() {
      this.product = { name: "", description: "", price: 0, category: "" };
      this.isEditing = false;
      this.editingId = null;
    },
    // Kategorie-Name anhand der ID holen
    getCategoryName(categoryId) {
      const category = this.categories.find((c) => c.id === categoryId);
      return category ? category.name : "Keine Kategorie";
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
.search-filters input {
  display: inline-block;
  margin-right: 10px;
  padding: 8px;
  width: 150px;
  border-radius: 8px;
}

form {
  margin-bottom: 20px;
}

form input,
form select {
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

.button-group {
  display: flex;
  gap: 10px; /* Abstand zwischen den Buttons */
}
</style>
