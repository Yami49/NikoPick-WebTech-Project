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

    <!-- Formular zur Abgabe einer Bewertung -->
    <form @submit.prevent="submitReview">
      <div>
        <label for="rating">Bewertung (1-5):</label>
        <input
          v-model="newReview.rating"
          type="number"
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label for="comment">Kommentar:</label>
        <textarea v-model="newReview.comment" required></textarea>
      </div>
      <button type="submit">Bewertung abgeben</button>
    </form>

    <h2>Bewertungen</h2>
    <ul>
      <li v-for="review in reviews" :key="review.reviewId">
        <p><strong>Bewertung:</strong> {{ review.rating }} / 5</p>
        <p><strong>Kommentar:</strong> {{ review.comment }}</p>
        <p>
          <strong>Von:</strong>
          {{ review.user ? review.user.username : "Unbekannt" }}
        </p>
      </li>
    </ul>

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
      reviews: [],
      newReview: { rating: null, comment: "" },
      userId: null,
      errorMessage: "",
    };
  },
  created() {
    this.fetchProduct();
    this.fetchReviews();
    this.userId = localStorage.getItem("userId") || null; // Benutzer-ID aus localStorage holen
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

    // Bewertungen laden
    async fetchReviews() {
      try {
        const productId = this.$route.params.productId;
        const response = await api.get(`/products/${productId}/reviews`);
        this.reviews = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Bewertungen:", error);
        this.errorMessage = "Fehler beim Laden der Bewertungen.";
      }
    },

    // Bewertung absenden
    async submitReview() {
      try {
        if (!this.userId) {
          this.errorMessage =
            "Sie müssen eingeloggt sein, um eine Bewertung abzugeben.";
          return;
        }

        const productId = this.$route.params.productId;
        await api.post("/reviews", {
          rating: this.newReview.rating,
          comment: this.newReview.comment,
          user: this.userId,
          product: productId,
        });
        this.fetchReviews();
        this.newReview = { rating: null, comment: "" }; // Formular zurücksetzen
      } catch (error) {
        console.error("Fehler beim Abgeben der Bewertung:", error);
        this.errorMessage = "Fehler beim Abgeben der Bewertung.";
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
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  text-align: center;
  color: #2c3e50;
}

form {
  margin: 20px 0;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

form input,
form textarea {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  background-color: #5899ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3456a1;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>
