<template>
  <main class="main-content">
    <div class="grey-bg">
      <div class="container">
        <!-- Überschrift -->
        <div class="row justify-content-center mb-4">
          <div class="col-md-12 text-center ">
            <h1>FÜHL DICH FREI EGAL WO DU BIST</h1>
          </div>
        </div>

        <!-- Logo -->
        <div class="row justify-content-center mb-4">
          <div class="col-md-12 text-center">
            <img src="@/assets/images/nikopick-logo.jpeg" alt="NikoPick Logo" class="logo"/>
          </div>
        </div>

        <!-- Anmelden Button -->
        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <button class="custom-button">Anmelden und Vorbestellen</button>
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

    <div class="flavor-container">
  <!-- Geschmacksrichtungen -->
  <div class="flavors-section">
    <img src="@/assets/images/geschmaecker.png" alt="Geschmäcker" />
  </div>

  <!-- Nikopick Varianten -->
  <div class="row columForTwo">
    <!-- Mint -->
    <div class="col-md-6 gray-bg text-center">
      <img src="@/assets/images/blue-nikopick.png" alt="Mint NikoPick" />
    </div>
    <div class="col-md-6 black-bg text-center" style="background-color: blue;">
      <p class="headline">MINT NIKOPICK</p>
    </div>
    <!-- Lemon -->
    <div class="col-md-6 black-bg text-center" style="background-color: yellow;">
      <p class="headline">LEMON NIKOPICK</p>
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
    <div class="col-md-6 black-bg text-center" style="background-color: green;">
      <p class="headline">HERB NIKOPICK</p>
    </div>
    <!-- Strong -->
    <div class="col-md-6 black-bg text-center" style="background-color: red;">
      <p class="headline">STRONG NIKOPICK</p>
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
            IDEAL FÜR LANGE MEETINGS, REISEN ODER MOMENTE, IN DENEN RAUCHEN KEINE
            OPTION IST. UNSERE NIKOTIN-ZAHNSTOCHER SIND IN VERSCHIEDENEN
            GESCHMACKSRICHTUNGEN ERHÄLTLICH UND LASSEN DICH DEIN VERLANGEN NACH
            NIKOTIN OHNE AUFSEHEN STILLEN. EIN KLEINER ZAHNSTOCHER, EIN GROSSER
            UNTERSCHIED!
          </p>
        </div>
      </div>
    </div>

    <div class="flavor-container">
      <!-- Warnung -->
      <div class="row flavors-section">
        <img src="@/assets/images/warnung.png" alt="Warnung" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    goToSignUpPage() {
      this.$router.push("/documents");
    },
  },
};
</script>

<style src="../assets/styles.css"></style>
