<template>
  <main class="main-content">
    <div class="grey-bg">
      <div class="container">
        <h1>{{ message }}</h1>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <!-- Überschrift -->
        <div class="row justify-content-center mb-4">
          <div class="col-md-12 text-center">
            <h1>FÜHL DICH FREI EGAL WO DU BIST</h1>
          </div>
        </div>

        <!-- Logo -->
        <div class="row justify-content-center mb-4">
          <div class="col-md-12 text-center">
            <img
              src="@/assets/images/nikopick-logo.png"
              alt="NikoPick Logo"
              class="logo"
            />
          </div>
        </div>

        <!-- Anmelden Button -->
        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <button class="custom-button" @click="navigateToProducts">
              Zu den Produkten
            </button>
          </div>
        </div>

        <!-- Vorteile -->
        <div class="row justify-content-center mb-4">
          <div class="col-md-12 text-center">
            <p>&#10003; DISKRET & GERUCHSNEUTRAL</p>
            <p>&#10003; VERSCHIEDENE GESCHMACKSRICHTUNGEN</p>
            <p>&#10003; RAUCHFREIE NIKOTINZUFUHR, JEDERZEIT UND ÜBERALL</p>
          </div>
        </div>
      </div>
    </div>

    <div class="blue-bg">
      <div class="container">
        <!-- Beschreibung -->
        <div class="row white-bg alt-bg text-center">
          <p>
            SUCHST DU NACH EINER SMARTEN, DISKRETEN ALTERNATIVE, UM DEINEN
            NIKOTIN-KICK ZU GENIESSEN, OHNE RAUCH UND OHNE E-ZIGARETTE? DIE
            NIKOPICKS LIEFERN DIR GENAU DAS - WO UND WANN DU WILLST! EINFACH IN
            DEN MUND NEHMEN, DEN GESCHMACK GENIEßEN UND DEN NIKOTIN-KICK
            ERLEBEN, WÄHREND DU NEBENBEI DIE ZÄHNE PFLEGST.
          </p>
        </div>
      </div>
    </div>

    <!-- Geschmacksrichtungen -->
    <div class="flavors-section grey-bg">
      <img src="@/assets/images/geschmaecker.png" alt="Geschmäcker" />
    </div>

    <div class="flavor-container grey-bg">
      <!-- Nikopick Varianten -->
      <div class="row columForTwo">
        <!-- Mint -->
        <div class="col-md-6 gray-bg text-center">
          <img src="@/assets/images/blue-nikopick.png" alt="Mint NikoPick" />
        </div>
        <div class="col-md-6 blue-bg center">
          <div class="content">
            <p class="headline"><span class="underline">MINT</span> NIKOPICK</p>
            <p class="subtext">
              Ein kühler, erfrischender Minzgeschmack, der den Mund belebt und
              für langanhaltende Frische sorgt – dezent und angenehm im
              Hintergrund
            </p>
          </div>
        </div>
        <!-- Lemon -->
        <div
          class="col-md-6 black-bg text-center center"
          style="background-color: yellow"
        >
          <div class="content">
            <p class="headline">
              <span class="underline">Lemon</span> NIKOPICK
            </p>
            <p class="subtext">
              Ein spritziger Zitronengeschmack, der frisch und belebend wirkt –
              mit einer angenehmen, dezenten Säurenote für einen klaren,
              erfrischenden Kick.
            </p>
          </div>
        </div>
        <div class="col-md-6 gray-bg text-center">
          <img src="@/assets/images/yellow-nikopick.png" alt="Lemon NikoPick" />
        </div>
      </div>

      <div class="row columForTwo">
        <!-- Herb -->
        <div class="col-md-6 gray-bg text-center">
          <img src="@/assets/images/green-nikopick.png" alt="Herb NikoPick" />
        </div>
        <div
          class="col-md-6 black-bg text-center center"
          style="background-color: green"
        >
          <div class="content">
            <p class="headline"><span class="underline">Herb</span> NIKOPICK</p>
            <p class="subtext">
              Ein würziger, erdiger Geschmack mit leicht bitteren Noten –
              kräftig und natürlich, für ein angenehm herbes Erlebnis.
            </p>
          </div>
        </div>
        <!-- Strong -->
        <div
          class="col-md-6 black-bg text-center center"
          style="background-color: red"
        >
          <div class="content">
            <p class="headline">
              <span class="underline">Strong</span> NIKOPICK
            </p>
            <p class="subtext">
              Ein intensiver, markanter Geschmack mit kräftigem Kick – stark und
              direkt, für ein besonders energisches Erlebnis.
            </p>
          </div>
        </div>
        <div class="col-md-6 gray-bg text-center">
          <img src="@/assets/images/red-nikopick.png" alt="Strong NikoPick" />
        </div>
      </div>
    </div>

    <div class="blue-bg">
      <div class="container">
        <!-- Vorbestellen -->
        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <button @click="goToSignUpPage" class="custom-button">
              Vorbestellen
            </button>
          </div>
          <p>
            IDEAL FÜR LANGE MEETINGS, REISEN ODER MOMENTE, IN DENEN RAUCHEN
            KEINE OPTION IST. UNSERE NIKOTIN-ZAHNSTOCHER SIND IN VERSCHIEDENEN
            GESCHMACKSRICHTUNGEN ERHÄLTLICH UND LASSEN DICH DEIN VERLANGEN NACH
            NIKOTIN OHNE AUFSEHEN STILLEN. EIN KLEINER ZAHNSTOCHER, EIN GROSSER
            UNTERSCHIED!
          </p>
        </div>
      </div>
    </div>
    <!-- Warnung -->
    <div class="flavors-section">
      <img src="@/assets/images/warnung.png" alt="Warnung" />
    </div>
  </main>
</template>

<script>
import api from "@/services/api";

export default {
  name: "HomePage",
  data() {
    return {
      message: "", // Für den API-Text
      errorMessage: "",
    };
  },
  created() {
    this.fetchMessage(); // API-Daten beim Erstellen der Komponente laden
    if (this.$route.query.error) {
      this.errorMessage = this.$route.query.error;
    }
  },

  methods: {
    // Navigiert zur SignUp-Seite
    goToSignUpPage() {
      this.$router.push("/documents");
    },

    navigateToProducts() {
      this.$router.push("/product");
    },

    // Holt die Nachricht vom Backend-API
    async fetchMessage() {
      try {
        const response = await api.get("/hello");
        this.message = response.data.message;
      } catch (error) {
        console.error("API-Fehler:", error);
      }
    },
  },
};
</script>

<style src="../assets/styles.css"></style>

<style>
.center {
  display: flex;
  justify-content: center; /* Horizontal zentrieren */
  align-items: center; /* Vertikal zentrieren */
  padding: 20px;
  text-align: center;
}
/* Inhalt innerhalb des blauen Bereichs */
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Überschrift */
.headline {
  font-size: 2rem;
  margin: 0;
}

/* Unterstrich für das Wort "MINT" */
.headline .underline {
  text-decoration: underline;
}

/* Zusätzlicher Text */
.subtext {
  font-size: 1.2rem;
  margin-top: 10px;
  max-width: 80%;
  text-align: center;
}
</style>
