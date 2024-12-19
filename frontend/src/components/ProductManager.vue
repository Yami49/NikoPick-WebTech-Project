<template>
  <div class="container">
    <h1>Produktverwaltung</h1>

    <!-- Such- und Filterbereich -->
    <div class="search-filters">
      <input
        v-model="searchQuery"
        @input="searchProduct"
        placeholder="Suche nach Name"
      />
      <input v-model="minPrice" placeholder="Min Preis" type="number" />
      <input v-model="maxPrice" placeholder="Max Preis" type="number" />

      <!-- Kategorie-Dropdown für den Filter -->
      <select v-model="selectedCategory" @change="searchProduct">
        <option value="">Alle Kategorien</option>
        <option
          v-for="category in categories"
          :key="category.categoryId"
          :value="category.categoryId"
        >
          {{ category.name }}
        </option>
      </select>
      <button @click="searchProduct">Suchen</button>
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

      <!-- Kategorie-Dropdown -->
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
      <li v-for="p in product" :key="p.productId">
        <span>
          {{ p.name }} - {{ p.price }}€ - {{ getCategoryName(p.category) }}
        </span>

        <div class="button-group">
          <router-link :to="`/product/${p.productId}`">
            <button>Ansehen</button>
          </router-link>
          <!-- Buttons nur für Admins anzeigen -->
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
      product: [],
      categories: [],
      searchQuery: "",
      minPrice: "",
      maxPrice: "",
      selectedCategory: "",
      product: { name: "", description: "", price: 0, category: null },
      isEditing: false,
      editingId: null,
      userRole: null, // Benutzerrolle hinzufügen
    };
  },
  created() {
    this.fetchProduct();
    this.fetchCategories();
    this.userRole = eventBus.userRole; // Benutzerrolle aus dem Event-Bus laden
  },
  methods: {
    // Alle Produkte laden
    async fetchProduct() {
      try {
        const response = await api.get("/product");
        this.product = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Produkte:", error);
      }
    },
    // Alle Kategorien laden
    async fetchCategories() {
      try {
        const response = await api.get("/category");
        this.categories = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Kategorien:", error);
      }
    },
    // Such- und Filterfunktion
    async searchProduct() {
      try {
        const response = await api.get("/product/search", {
          params: {
            name: this.searchQuery,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
            category: this.selectedCategory,
          },
        });
        this.product = response.data;
      } catch (error) {
        console.error("Fehler bei der Suche:", error);
      }
    },
    // Produkt speichern (Erstellen oder Aktualisieren)
    async saveProduct() {
      try {
        if (this.isEditing) {
          await api.put(`/product/${this.editingId}`, this.product);
        } else {
          await api.post("/product", this.product);
        }
        this.resetForm();
        this.fetchProduct();
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
        category: product.category,
      };
      this.isEditing = true;
      this.editingId = product.productId;
    },
    // Produkt löschen
    async deleteProduct(productId) {
      try {
        await api.delete(`/product/${productId}`);
        this.fetchProduct();
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
  gap: 10px; /* Abstand zwischen den Buttons */
}
</style>
