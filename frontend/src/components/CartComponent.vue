<template>
  <div class="cart-container">
    <h1>Warenkorb</h1>

    <!-- Wenn der Warenkorb leer ist -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Ihr Warenkorb ist leer.</p>
    </div>

    <!-- Warenkorb-Items anzeigen -->
    <div v-else>
      <ul class="cart-items">
        <li v-for="item in cartItems" :key="item.productId" class="cart-item">
          <div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.price }} €</p>
            <div>
              <label for="quantity">Menge:</label>
              <input
                id="quantity"
                type="number"
                v-model.number="item.quantity"
                min="1"
                @change="updateCart(item.productId)"
              />
            </div>
          </div>
          <button @click="removeFromCart(item.productId)">Entfernen</button>
        </li>
      </ul>

      <!-- Gesamtsumme -->
      <div class="cart-summary">
        <h2>Gesamtsumme: {{ totalPrice }} €</h2>
        <button @click="checkout">Zur Kasse</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [], // Warenkorb-Items
    };
  },
  computed: {
    // Gesamtsumme berechnen
    totalPrice() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
  },
  methods: {
    // Warenkorb aus lokalem Speicher laden
    loadCart() {
      const savedCart = localStorage.getItem("cart");
      this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    },
    // Artikel aus dem Warenkorb entfernen
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(
        (item) => item.productId !== productId,
      );
      this.saveCart();
    },
    // Warenkorb aktualisieren
    updateCart(productId) {
      const updatedItem = this.cartItems.find(
        (item) => item.productId === productId,
      );
      if (updatedItem && updatedItem.quantity < 1) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
      }
    },
    // Warenkorb im lokalen Speicher speichern
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    // Checkout-Prozess starten
    checkout() {
      alert("Zur Kasse gehen!"); // Diese Logik kann an deine Backend-Integration angepasst werden
      this.cartItems = [];
      this.saveCart();
    },
  },
  created() {
    // Beim Laden der Komponente den Warenkorb initialisieren
    this.loadCart();
  },
};
</script>

<style scoped>
.cart-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
}

.cart-items {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.cart-summary {
  margin-top: 20px;
  text-align: right;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
