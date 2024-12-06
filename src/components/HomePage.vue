<template>
    <div class="home">
      <header class="header">
        <h1>Willkommen auf meiner Homepage!</h1>
      </header>
      <main class="content">
        <p>Das ist eine responsive Vue.js-Homepage.</p>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  .header {
    text-align: center;
  }
  .content {
    max-width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 600px) {
    .content {
      padding: 10px;
    }
  }
  </style>
  