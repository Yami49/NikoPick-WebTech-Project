<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 Meine Website. Alle Rechte vorbehalten.</p>
      <nav>
        <ul>
          <li><router-link to="/impressum">Impressum</router-link></li>
          <li>
            <router-link to="/datenschutzerklaerung"
              >Datenschutzerklärung</router-link
            >
          </li>
          <li><router-link to="/kontakt">Kontakt</router-link></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponente",
};
</script>

<style src="../assets/footer.css"></style>
