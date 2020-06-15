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
        <v-form ref="form" class="mt-5 mr-8" lazy-validation v-model="valid">
          <v-text-field
            v-model="artist.name"
            label="Name"
            id="nameInput"
            :rules="rule"
            required
            prepend-icon="mdi-account"
            autofocus
            validate-on-blur
          ></v-text-field>

          <DatePicker
            :day="artist.birthday.day"
            v-bind:rule="rule"
            v-bind:ruleDay="rule.concat(ruleDay)"
            v-bind:ruleYear="rule.concat(ruleYear)"
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
            :rule="rule"
            required
            id="homeTownAutocomplete"
          />

          <v-text-field
            v-model="artist.nationality"
            label="Nationality"
            prepend-icon="mdi-flag"
            :rules="rule"
            required
          ></v-text-field>

          <v-select
            :items="mapNames"
            v-model="artist.map"
            menu-props="auto"
            class="pb-3"
            label="Map"
            :rules="rule"
            required
            hide-details
            single-line
            prepend-icon="mdi-map"
          ></v-select>

          <v-select
            :items="artMovements"
            v-model="artist.artMovement"
            menu-props="auto"
            label="Artist movement"
            :hint="checkHint()"
            persistent-hint
            :rules="rule"
            required
            single-line
            prepend-icon="mdi-timer-sand"
          ></v-select>

          <DatePicker
            :day="artist.death.day"
            v-bind:rule="[]"
            v-bind:ruleDay="ruleDay"
            v-bind:ruleYear="ruleYear"
            @dayChanged="artist.death.day = $event"
            :month="artist.death.month"
            @monthChanged="artist.death.month = $event"
            :year="artist.death.year"
            @yearChanged="artist.death.year = $event"
            icon="mdi-grave-stone"
            hint="Death date (not required)"
          />

          <v-file-input
            v-model="img"
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
import firebase from 'firebase/app';
import 'firebase/storage';
import CityAutocomplete from './../../global/CityAutocomplete';
import { artistsDB, app } from './../../../firebase';
import { bus } from '@/main';

export default {
  components: {
    DatePicker,
    CityAutocomplete,
  },

  data() {
    return {
      valid: true,
      rule: [v => !!v || 'Required field'],
      type: '',
      key: '',
      dialog: false,
      img: null,
      artist: {
        name: '',
        birthday: { day: '', month: '', year: '' },
        birthplace: '',
        nationality: '',
        map: '',
        artMovement: '',
        death: { day: '', month: '', year: '' },
        img: '',
      },
      ruleDay: [
        v => v == '' || (v > 0 && v < 32) || 'Incorrect number of days',
      ],
      ruleYear: [
        v =>
          v == '' || (v >= 0 && v <= 2020) || 'Year must be in range 0 - 2020',
      ],
    };
  },

  methods: {
    checkHint() {
      return this.hintsMovement[this.artist.artMovement];
    },
    ...mapActions({
      addArtistAction: 'artists/addArtistAction',
      updateArtistAction: 'artists/updateArtistAction',
      geocodeForward: 'geocoder/geocodeForward',
    }),

    ...mapMutations({
      updatePaintingArtistName: 'paintings/updatePaintingArtistName',
    }),
    ...mapMutations({
      setContext: 'artists/setContext',
    }),
    ...mapActions(['snackbar/showSuccess']),
    async enterPressed() {
      // if focused element is autocomplete allow enter to choose city
      // else user is trying to finish changes so call add
      const autocompleteElement = document.getElementById(
        'homeTownAutocomplete'
      );
      if (await !this.$refs.form.validate()) return;

      if (this.type == 'add') await this.add();
      else await this.update();
    },

    close() {
      this.reset();
      if (this.$refs.form) this.$refs.form.resetValidation();
      this.dialog = false;
      this.setContext('');
    },

    reset() {
      this.img = null;
      this.artist = {
        name: '',
        birthday: { day: '', month: '', year: '' },
        birthplace: '',
        nationality: '',
        map: '',
        artMovement: '',
        death: { day: '', month: '', year: '' },
        img: '',
      };
    },

    async add() {
      if (!(await this.$refs.form.validate())) return;
      this.artist.coords = await this.geocodeForward(this.artist.birthplace);
      this.artist.img = '';
      if (!this.artist.death.day)
        this.artist.death = {
          day: '',
          month: '',
          year: '',
        };

      if (this.img != null) {
        var storageRef = firebase.storage().ref(this.img.name);
        var snapshot = await storageRef.put(this.img);
        this.artist.img = await snapshot.ref.getDownloadURL();
        this.img = null;
      }

      await this.addArtistAction(this.artist);

      //reset input
      this.reset();
      this.$refs.form.resetValidation();
      document.getElementById('nameInput').focus();
    },

    async update() {
      if (!(await this.$refs.form.validate())) return;
      const oldArtist = this.$store.getters['artists/getArtistById'](this.key);

      // if change birthplace get new coords
      if (oldArtist.birthplace !== this.artist.birthplace)
        this.artist.coords = await this.geocodeForward(this.artist.birthplace);

      if (this.img != null) {
        var storageRef = firebase.storage().ref(this.img.name);
        var snapshot = await storageRef.put(this.img);
        this.artist.img = await snapshot.ref.getDownloadURL();
        this.img = null;
      }

      await this.updateArtistAction({
        key: this.key,
        newArtist: this.artist,
      });

      // if change name update paintings
      if (oldArtist.name !== this.artist.name) {
        this.updatePaintingArtistName({
          oldName: oldArtist.name,
          newName: this.artist.name,
        });
      }

      bus.$emit('resetMap');
      this.$store.dispatch(
        'snackbar/showSuccess',
        'Artist was successfully updated.'
      );

      this.close();
    },
  },

  computed: {
    ...mapGetters({
      hintsMovement: 'paintings/getHintsMovement',
      artMovements: 'paintings/getArtMovements',
      mediums: 'paintings/getMediums',
      mapNames: 'map/getMapNames',
    }),

    keymap() {
      return {
        'ctrl+enter': this.enterPressed,
        esc: this.close,
      };
    },
  },

  created() {
    bus.$on('openArtistDialog', data => {
      if (data.artist) this.artist = { ...data.artist };
      this.type = data.type;
      this.key = data.key;
      this.dialog = true;
      this.setContext('#artists');
    });
  },
};
</script>

<style></style>
