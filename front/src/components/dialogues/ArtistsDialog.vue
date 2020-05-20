<template>
  <v-dialog
    :value="dialog"
    width="35%"
    @click:outside="close"
    v-hotkey="keymap"
    :retain-focus="false"
  >
    <v-card class="pa-3 ">
      <v-card-title v-if="type === 'add'">Add New Artist</v-card-title>
      <v-card-title v-else>Edit Artist</v-card-title>
      <v-card-text>
        <v-form ref="form" class="mt-5 mr-8" lazy-validation>
          <v-text-field
            v-model="artist.name"
            label="Name"
            id="nameInput"
            prepend-icon="mdi-account"
            autofocus
          ></v-text-field>

          <DatePicker
            :day="artist.birthday.day"
            @dayChanged="artist.birthday.day = $event"
            :month="artist.birthday.month"
            @monthChanged="artist.birthday.month = $event"
            :year="artist.birthday.year"
            @yearChanged="artist.birthday.year = $event"
            icon="mdi-cake-variant"
            hint="Date of birth"
          />

          <v-text-field
            v-model="artist.birthplace"
            label="Home Town"
            prepend-icon="mdi-home-city"
          ></v-text-field>

          <v-text-field
            v-model="artist.nationality"
            label="Nationality"
            prepend-icon="mdi-flag"
          ></v-text-field>

          <v-select
            :items="artMovements"
            v-model="artist.artMovement"
            menu-props="auto"
            label="Art movement"
            hide-details
            single-line
            prepend-icon="mdi-timer-sand"
          ></v-select>

          <DatePicker
            :day="artist.death.day"
            @dayChanged="artist.death.day = $event"
            :month="artist.death.month"
            @monthChanged="artist.death.month = $event"
            :year="artist.death.year"
            @yearChanged="artist.death.year = $event"
            icon="mdi-grave-stone"
            hint="Death date (not required)"
          />

          <v-file-input
            accept="image/*"
            label="Image"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions class="mr-8">
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
      reset: 'resetDialogArtist',
    }),

    ...mapActions({
      addArtistAction: 'artists/addArtistAction',
    }),

    async add() {
      await this.addArtistAction(Object.assign({}, this.artist));
      this.reset(); //reset input
      document.getElementById('nameInput').focus();
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
