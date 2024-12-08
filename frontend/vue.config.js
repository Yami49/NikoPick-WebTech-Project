const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,

  // Feature-Flags für das ESM-Bundler-Build von Vue definieren
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Behebt die Warnung bezüglich Feature-Flags
      }),
    ],
  },

  // Proxy-Konfiguration für CORS-Probleme
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1337', // URL zu deinem Sails-Backend
        changeOrigin: true,
        pathRewrite: { '^/api': '' },    // Entfernt '/api' aus dem Pfad beim Weiterleiten
      },
    },
  },
});


