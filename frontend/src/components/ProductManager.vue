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
          :key="category.categoryId"
          :value="category.categoryId"
        >
          {{ category.name }}
        </option>
      </select>
      <button @click="searchProducts">Suchen</button>
    </div>

    <!-- Formular zum Erstellen/Bearbeiten eines Produkts (nur für Admins) -->
    <form @submit.prevent="saveProduct" v-if="userRole === 'admin'">
      <input v-model="product.name" placeholder="Name" required />
      <input v-model="product.description" placeholder="Beschreibung" />
      <input
        v-model="product.price"
        type="number"
        placeholder="Preis"
        required
      />

      <select v-model="product.category">
        <option value="" disabled>Wähle eine Kategorie</option>
        <option
          v-for="category in categories"
          :key="category.categoryId"
          :value="category.categoryId"
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
      <li v-for="p in products" :key="p.productId">
        <span
          >{{ p.name }} - {{ p.price }}€ -
          {{ p.category ? p.category.name : "Keine Kategorie" }}</span
        >
        <div class="button-group">
          <router-link :to="`/products/${p.productId}`">
            <button>Ansehen</button>
          </router-link>
          <div class="button-group" v-if="userRole === 'admin'">
            <button @click="editProduct(p)">Bearbeiten</button>
            <button @click="deleteProduct(p.productId)">Löschen</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api";
import { eventBus } from "@/eventBus";

export default {
  data() {
    return {
      products: [],
      categories: [],
      searchQuery: "",
      minPrice: "",
      maxPrice: "",
      selectedCategory: "",
      product: { name: "", description: "", price: 0, category: null },
      isEditing: false,
      editingId: null,
      userRole: null,
    };
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.userRole = eventBus.userRole;
  },
  methods: {
    // Alle Produkte laden
    async fetchProducts() {
      try {
        const response = await api.get("/products");
        this.products = response.data;
        console.log("Geladene Produkte:", this.products); // Debugging-Log
      } catch (error) {
        console.error("Fehler beim Laden der Produkte:", error);
      }
    },
    // Alle Kategorien laden
    async fetchCategories() {
      try {
        const response = await api.get("/category");
        this.categories = response.data;
        console.log("Geladene Kategorien:", this.categories); // Debugging-Log
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
        const payload = {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
        };

        // Kategorie nur hinzufügen, wenn sie gesetzt ist
        if (this.product.category) {
          payload.category = this.product.category;
        }

        if (this.isEditing) {
          await api.put(`/products/${this.editingId}`, payload);
        } else {
          await api.post("/products", payload);
        }
        this.resetForm();
        this.fetchProducts();
      } catch (error) {
        console.error("Fehler beim Speichern des Produkts:", error);
      }
    },
    // Produkt zum Bearbeiten laden
    editProduct(product) {
      this.product = {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category ? product.category.categoryId : "",
      };
      this.isEditing = true;
      this.editingId = product.productId;
    },
    // Produkt löschen
    async deleteProduct(productId) {
      try {
        await api.delete(`/products/${productId}`);
        this.fetchProducts();
      } catch (error) {
        console.error("Fehler beim Löschen des Produkts:", error);
      }
    },
    // Formular zurücksetzen
    resetForm() {
      this.product = { name: "", description: "", price: 0, category: null };
      this.isEditing = false;
      this.editingId = null;
    },
    // Kategorie-Name anhand der ID holen
    getCategoryName(categoryId) {
      const category = this.categories.find((c) => c.categoryId === categoryId);
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
  gap: 10px;
}
</style>
