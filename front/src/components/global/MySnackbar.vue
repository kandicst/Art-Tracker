<template>
  <v-snackbar v-model="getSnackbar" :timeout="2000" :color="getColor">
    {{ getText }}
    <v-btn color="white" text @click="closeSnackbar()">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "MySnackbar",
  computed: {
    ...mapGetters("snackbar", {
      snackbarGetter: "getSnackbar",
      getText: "getText",
      getColor: "getColor"
    }),

    getSnackbar: {
      get() {
        return this.snackbarGetter;
      },

      set(value) {
        this.setSnackbar(value);
      }
    }
  },

  methods: {
    ...mapMutations("snackbar", {
      showSnackbar: "showSnackbar",
      closeSnackbar: "closeSnackbar",
      setSnackbar: "setSnackbar"
    })
  }
};
</script>

<style>
</style>