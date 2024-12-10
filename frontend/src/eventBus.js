import { reactive } from "vue";

export const eventBus = reactive({
  userRole: null,
  setUserRole(role) {
    this.userRole = role;
  },
  clearUserRole() {
    this.userRole = null;
  },
});
