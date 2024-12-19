import { reactive } from "vue";

export const eventBus = reactive({
  userRole: null,
  userId: null, // Benutzer-ID hinzufügen

  setUserRole(role) {
    this.userRole = role;
  },

  setUserId(id) {
    // Methode zum Setzen der Benutzer-ID hinzufügen
    this.userId = id;
  },

  clearUserRole() {
    this.userRole = null;
  },

  clearUserId() {
    // Methode zum Löschen der Benutzer-ID hinzufügen
    this.userId = null;
  },

  clearAll() {
    // Methode zum Löschen von Rolle und Benutzer-ID
    this.userRole = null;
    this.userId = null;
  },
});
