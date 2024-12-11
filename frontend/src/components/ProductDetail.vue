<template>
  <div class="container">
    <h1>Produktdetails</h1>
    <div v-if="product">
      <p><strong>Name:</strong> {{ product.name }}</p>
      <p><strong>Beschreibung:</strong> {{ product.description }}</p>
      <p><strong>Preis:</strong> {{ product.price }}€</p>
      <p><strong>Kategorie:</strong> {{ getCategoryName(product.category) }}</p>
    </div>
    <div v-else>
      <p>Lade Produktdetails...</p>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
      categories: [],
    };
  },
  created() {
    this.fetchProduct();
    this.fetchCategories();
  },
  methods: {
    async fetchProduct() {
      try {
        const productId = this.$route.params.id;
        const response = await api.get(`/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error("Fehler beim Laden des Produkts:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await api.get("/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Kategorien:", error);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((c) => c.id === categoryId);
      return category ? category.name : "Keine Kategorie";
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin: 10px 0;
}
</style>
