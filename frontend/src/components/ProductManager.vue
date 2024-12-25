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

    <!-- Formular zum Erstellen/Bearbeiten eines Produkts -->
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
          {{ getCategoryName(p.category) }}</span
        >
        <div class="button-group">
          <router-link :to="`/products/${p.productId}`">
            <button>Ansehen</button>
          </router-link>
          <div class="button-group" v-if="userRole === 'admin'">
            <button @click="editProduct(p)">Bearbeiten</button>
            <button @click="deleteProduct(p.productId)">Löschen</button>
          </div>
          <button @click="addToCart(p)">In den Warenkorb</button>
        </div>
      </li>
    </ul>

    <!-- Warenkorb -->
    <div class="cart">
      <h2>Warenkorb</h2>
      <ul>
        <li v-for="item in cart" :key="item.productId">
          <span>
            {{ item.name }} - {{ item.price }}€ x {{ item.quantity }}
          </span>
          <div class="cart-actions">
            <button @click="decreaseQuantity(item.productId)">-</button>
            <button @click="removeFromCart(item.productId)">
              Alles entfernen
            </button>
          </div>
        </li>
      </ul>
      <p v-if="cart.length === 0">Der Warenkorb ist leer.</p>
      <p v-else>Gesamt: {{ totalPrice() }}€</p>
      <button v-if="cart.length > 0" @click="checkout">Zur Kasse</button>
    </div>
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
      cart: [], // Warenkorb
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
    async searchProducts() {
      try {
        // Bereinigen der Eingabewerte
        const params = {};
        if (this.searchQuery) params.name = this.searchQuery.trim();
        if (this.minPrice) params.minPrice = parseFloat(this.minPrice);
        if (this.maxPrice) params.maxPrice = parseFloat(this.maxPrice);
        if (this.selectedCategory) params.category = this.selectedCategory;

        console.log("Suchparameter:", params); // Debugging

        const response = await api.get("/products/search", { params });
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
    // Produkt in den Warenkorb legen
    addToCart(product) {
      const existingProduct = this.cart.find(
        (item) => item.productId === product.productId,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    // Anzahl eines Produkts verringern
    decreaseQuantity(productId) {
      const existingProduct = this.cart.find(
        (item) => item.productId === productId,
      );
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          this.cart = this.cart.filter((item) => item.productId !== productId);
        }
      }
    },
    // Produkt komplett aus dem Warenkorb entfernen
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.productId !== productId);
    },
    // Gesamtpreis des Warenkorbs berechnen
    totalPrice() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
    // Warenkorb zur Kasse weiterleiten
    checkout() {
      alert("Zur Kasse gehen!"); // Hier kann die Checkout-Logik implementiert werden
      this.cart = []; // Warenkorb leeren
    },
  },
};
</script>

<style scoped>
.cart-actions button {
  margin-left: 5px;
}

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
