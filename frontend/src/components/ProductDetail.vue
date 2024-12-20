<template>
  <div class="container">
    <h1>Produktdetails</h1>

    <div v-if="product">
      <p><strong>Name:</strong> {{ product.name }}</p>
      <p><strong>Beschreibung:</strong> {{ product.description }}</p>
      <p><strong>Preis:</strong> {{ product.price }}€</p>
      <p>
        <strong>Kategorie:</strong>
        {{ product.category ? product.category.name : "Keine Kategorie" }}
      </p>
    </div>

    <div v-else>
      <p>Lade Produktdetails...</p>
    </div>

    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Zurück-Button -->
    <button @click="$router.push('/products')">Zurück zur Produktliste</button>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
      errorMessage: "",
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    // Produkt laden
    async fetchProduct() {
      try {
        const productId = this.$route.params.productId;
        const response = await api.get(`/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error("Fehler beim Laden des Produkts:", error);
        this.errorMessage = "Fehler beim Laden des Produkts.";
      }
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

p {
  font-size: 1.2rem;
  margin: 10px 0;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}
</style>
