<template>
  <div class="container">
    <h1>Datenschutzerklärung</h1>

    <div class="datenschutz-section">
      <h2>1. Allgemeine Hinweise</h2>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
        Ihren personenbezogenen Daten passiert, wenn Sie unsere Website
        besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
        persönlich identifiziert werden können.
      </p>
    </div>

    <div class="datenschutz-section">
      <h2>2. Verantwortliche Stelle</h2>
      <p>
        <strong>Max Mustermann</strong><br />
        Musterfirma GmbH<br />
        Musterstraße 123<br />
        12345 Musterstadt<br />
        Telefon: +49 (0) 123 456789<br />
        E-Mail: datenschutz@musterfirma.de
      </p>
    </div>

    <div class="datenschutz-section">
      <h2>3. Datenerfassung auf unserer Website</h2>

      <h3>Cookies</h3>
      <p>
        Unsere Website verwendet sogenannte Cookies. Cookies richten auf Ihrem
        Rechner keinen Schaden an und enthalten keine Viren. Sie dienen dazu,
        unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
      </p>

      <h3>Server-Log-Dateien</h3>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen
        in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns
        übermittelt. Dies sind:
      </p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
    </div>

    <div class="datenschutz-section">
      <h2>4. Kontaktformular</h2>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
        Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
        Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
        Anschlussfragen bei uns gespeichert.
      </p>
    </div>

    <div class="datenschutz-section">
      <h2>5. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre
        gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und
        den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
        Sperrung oder Löschung dieser Daten.
      </p>
    </div>

    <div class="datenschutz-section">
      <h2>6. Widerspruch gegen Werbe-E-Mails</h2>
      <p>
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
        Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter
        Werbung und Informationsmaterialien wird hiermit widersprochen.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatenschutzErklaerung",
};
</script>

<style src="../assets/styles.css"></style>

<style scoped>
.datenschutz-section {
  margin-bottom: 30px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #5899ff;
}

h3 {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #3456a1;
}

p {
  margin: 0 0 10px;
}

ul {
  margin: 0 0 10px;
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}

a {
  color: #5899ff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
