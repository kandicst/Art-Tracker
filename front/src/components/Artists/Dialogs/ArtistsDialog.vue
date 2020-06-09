<template>
  <v-dialog
    :value="dialog"
    width="600px"
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

          <CityAutocomplete
            :location="artist.birthplace"
            @locationChanged="artist.birthplace = $event"
            id="homeTownAutocomplete"
          />

          <v-text-field
            v-model="artist.nationality"
            label="Nationality"
            prepend-icon="mdi-flag"
          ></v-text-field>

          <v-select
            :items="mapNames"
            v-model="artist.map"
            menu-props="auto"
            class="pb-3"
            label="Map"
            hide-details
            single-line
            prepend-icon="mdi-map"
          ></v-select>

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
import DatePicker from './../../global/DatePicker';
import CityAutocomplete from './../../global/CityAutocomplete';
import { artistsDB } from './../../../firebase';

export default {
  components: {
    DatePicker,
    CityAutocomplete,
  },

  data() {
    return {
      slika: '',
    };
  },

  methods: {
    ...mapMutations('artistsDialog', {
      close: 'closeDialog',
      reset: 'resetDialogArtist',
    }),

    ...mapActions({
      addArtistAction: 'artists/addArtistAction',
      geocodeForward: 'geocoder/geocodeForward',
    }),

    async enterPressed() {
      // if focused element is autocomplete allow enter to choose city
      // else user is trying to finish changes so call add
      const autocompleteElement = document.getElementById(
        'homeTownAutocomplete'
      );
      if (
        !autocompleteElement ||
        autocompleteElement.contains(document.activeElement)
      )
        return;

      await this.add();
    },

    async add() {
      console.log(artistsDB)
      this.artist.coords = await this.geocodeForward(this.artist.birthplace);
      this.artist.img = ''
      artistsDB.push(this.artist);
      // await this.addArtistAction(Object.assign({}, this.artist));
      //reset input
      this.reset();
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
      mapNames: 'map/getMapNames',
    }),

    keymap() {
      return {
        enter: this.enterPressed,
        esc: this.close,
      };
    },
  },
};
</script>

<style></style>
