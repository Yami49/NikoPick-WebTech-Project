<template>
  <div class="container">
    <h1>Kontaktformular</h1>

    <!-- Kontaktformular -->
    <form @submit.prevent="sendMessage">
      <div class="form-group">
        <input v-model="form.name" placeholder="Ihr Name" required />
      </div>
      <div class="form-group">
        <input
          v-model="form.email"
          type="email"
          placeholder="Ihre E-Mail"
          required
        />
      </div>
      <div class="form-group phone-group">
        <div class="phone-wrapper">
          <select v-model="form.dialCode" class="dial-code-select">
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.dialCode"
            >
              {{ country.name }} ({{ country.dialCode }})
            </option>
          </select>
          <input
            v-model="form.phoneNumber"
            type="tel"
            placeholder="Ihre Telefonnummer"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <textarea
          v-model="form.message"
          placeholder="Ihre Nachricht"
          required
        ></textarea>
      </div>
      <button type="submit" class="submit-button">Senden</button>
    </form>

    <!-- Erfolgsnachricht -->
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from "@/services/api";
import axios from "axios"; // Für den API-Aufruf

export default {
  name: "ContactComponente",
  data() {
    return {
      form: {
        name: "",
        email: "",
        dialCode: "+49", // Standardmäßig Deutschland
        phoneNumber: "",
        phone: "",
        message: "",
      },
      successMessage: "",
      errorMessage: "",
      countries: [], // Leere Liste, wird dynamisch gefüllt
    };
  },
  async created() {
    await this.loadCountries();
  },
  methods: {
    // Länder dynamisch laden
    async loadCountries() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        this.countries = response.data
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
            dialCode: country.idd?.root
              ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}`
              : "",
          }))
          .filter((country) => country.dialCode); // Nur Länder mit Vorwahlen
      } catch (error) {
        console.error("Fehler beim Laden der Länderliste:", error);
      }
    },
    // Nachricht senden
    async sendMessage() {
      try {
        this.form.phone = `${this.form.dialCode} ${this.form.phoneNumber}`;

        await api.post("/messages", {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          message: this.form.message,
        });

        this.successMessage = "Ihre Nachricht wurde erfolgreich gesendet!";
        this.errorMessage = "";
        this.resetForm();
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      } catch (error) {
        this.errorMessage =
          "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.";
        this.successMessage = "";
        console.error("Fehler beim Senden der Nachricht:", error);
      }
    },
    // Formular zurücksetzen
    resetForm() {
      this.form = {
        name: "",
        email: "",
        dialCode: "+49",
        phoneNumber: "",
        phone: "",
        message: "",
      };
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
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

/* Telefonnummer-Wrapper */
.phone-group {
  display: flex;
  gap: 10px;
}

.phone-wrapper {
  display: flex;
  width: 100%;
}

.dial-code-select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  font-size: 1rem;
  width: 30%; /* Vorwahl-Feld nimmt 30% der Breite ein */
}

.phone-wrapper input[type="tel"] {
  flex: 1; /* Telefonnummer-Feld nimmt den restlichen Platz ein */
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 0 5px 5px 0;
  font-size: 1rem;
}

/* Erfolgs- und Fehlermeldungen */
.success-message,
.error-message {
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
}

.success-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}

/* Styling für Eingabefelder und Buttons */
form input,
form textarea {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

form textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
