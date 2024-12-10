<template>
  <div class="container">
    <h1>Kontaktformular</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="phone">Telefonnummer</label>
        <input type="tel" id="phone" v-model="phone" required />
      </div>

      <div class="form-group">
        <label for="message">Nachricht</label>
        <textarea id="message" v-model="message" rows="5" required></textarea>
      </div>

      <button type="submit" class="submit-button">Nachricht senden</button>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "ContactComponente",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      message: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await api.post("/message/send", {
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message,
        });
        this.successMessage = "Nachricht erfolgreich gesendet!";
        this.resetForm();
      } catch (error) {
        console.error("Fehler beim Senden der Nachricht:", error);
        this.errorMessage =
          error.response?.data?.error || "Fehler beim Senden der Nachricht.";
      }
    },

    resetForm() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.message = "";
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  background-color: #5899ff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3456a1;
}

.success-message {
  color: green;
  margin-top: 15px;
}

.error-message {
  color: red;
  margin-top: 15px;
}
</style>
