<template>
    <v-card>
      <v-card-title>DEMO MODE</v-card-title>
      <v-card-text>
        DDDDDDDDIJALOG
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  methods: {
    close(){
      this.$emit("zatvori");
    }
  },
  computed: {
    keymap() {
      return {
        esc: this.close,
      };
    },
  },
};
</script>

<style></style>
