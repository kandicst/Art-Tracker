<template>
  <v-dialog
    :value="dialog"
    width="35%"
    min-width="800px"
    @click:outside="close"
    v-hotkey="keymap"
    :retain-focus="false"
  >
    <v-card>
      <v-card-title v-if="type === 'add'">Add New Artist</v-card-title>
      <v-card-title v-else>Edit Existing Artist</v-card-title>
      <v-card-text>
        <v-form ref="form" class="ma-3" lazy-validation>
          <v-text-field label="Name"></v-text-field>
          <DatePicker />
          <v-text-field label="Home Town"></v-text-field>
          <v-text-field label="Nationality"></v-text-field>
          <v-select
            :items="artMovements"
            menu-props="auto"
            label="Art movement"
            hide-details
            single-line
          >
          </v-select>
          <DatePicker />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close" text>Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="add" text
          >Add</v-btn
        >
        <v-btn v-else color="primary" @click="update" text>Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import DatePicker from './../DatePicker';

export default {
  components: {
    DatePicker,
  },

  data() {
    return {};
  },

  methods: {
    ...mapMutations('artistsDialog', {
      close: 'closeDialog',
    }),

    add() {
      console.log('add');
    },

    update() {
      console.log('update');
    },
  },

  computed: {
    ...mapGetters({
      dialog: 'artistsDialog/getShowDialog',
      artist: 'artistsDialog/getDialogArtist',
      type: 'artistsDialog/getDialogType',
      artMovements: 'paintings/getArtMovements',
    }),

    keymap() {
      return {
        enter: this.add,
        esc: this.close,
      };
    },
  },
};
</script>

<style></style>
