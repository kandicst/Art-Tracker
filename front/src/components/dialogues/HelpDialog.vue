<template>
  <v-dialog
    :value="dialog"
    width="50%"
    @click:outside="close"
    v-hotkey="keymap"
    :retain-focus="false"
  >
    <v-card>
      <v-card-title>Add New Artist</v-card-title>
      <v-card-text>
        DDDDDDDDIJALOG
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style></style>
