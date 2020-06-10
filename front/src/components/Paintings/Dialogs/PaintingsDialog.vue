<template>
  <v-dialog
    :value="dialog"
    width="600px"
    @click:outside="close"
    v-hotkey="keymap"
    :retain-focus="false"
  >
    <v-card class="pa-3">
      <v-card-title v-if="type === 'add'">Add New Painting</v-card-title>
      <v-card-title v-else>Edit Painting</v-card-title>
      <v-card-text>
        <v-form ref="form" class="mt-5 mr-8" lazy-validation v-model="valid">
          <v-text-field
            v-model="painting.name"
            label="Name"
            :rules="rule"
            required
            id="paintingNameInput"
            prepend-icon="mdi-rename-box"
            autofocus
          >
          </v-text-field>

          <v-select
            :items="getAllArtists"
            v-model="painting.artistId"
            item-text="name"
            menu-props="auto"
            label="Artist"
            :rules="rule"
            required
            hide-details
            single-line
            prepend-icon="mdi-account"
            item-value=".key"
          ></v-select>
          <!-- return-object -->

          <v-text-field
            v-model="painting.created"
            :rules="rule"
            required
            class="mt-5"
            label="Created"
            type="number"
            prepend-icon="mdi-timer"
            hint="Year that it was painted"
          ></v-text-field>

          <CityAutocomplete
            :location="painting.location"
            @locationChanged="painting.location = $event"
            v-bind:rule="rule"
            required
            id="locationAutocomplete"
          />

          <v-select
            :items="artMovements"
            :rules="rule"
            required
            v-model="painting.artMovement"
            menu-props="auto"
            label="Art movement"
            hide-details
            single-line
            prepend-icon="mdi-timer-sand"
          ></v-select>

          <v-select
            :items="mediums"
            :rules="rule"
            required
            class="mt-5"
            v-model="painting.medium"
            menu-props="auto"
            label="Mediums"
            hide-details
            single-line
            prepend-icon="mdi-brush"
          ></v-select>

          <v-textarea
            v-model="painting.description"
            :rules="rule"
            required
            class="mt-5"
            label="Description"
            rows="2"
            prepend-icon="mdi-comment"
          ></v-textarea>

          <!-- v-model="painting.image" -->
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
        <v-btn
          v-if="type === 'add'"
          color="primary"
          @click="add"
          text
          :disabled="!valid"
          >Add</v-btn
        >
        <v-btn v-else color="primary" @click="update" text :disabled="!valid"
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CityAutocomplete from './../../global/CityAutocomplete';
import { bus } from '../../../main';
import { paintingsDB } from './../../../firebase';

export default {
  components: {
    CityAutocomplete,
  },
  data() {
    return {
      mediums: [
        'Pastel',
        'Colage',
        'Vitrage',
        'Tapiserija',
        'Graffite',
        'Ugljen',
        'Oil',
        'Acril',
        'Aquarel',
        'Guas',
        'Tempera',
        'Mozaik',
        'Enakustika',
      ],
      valid: true,
      rule: [v => !!v || 'Obavezno polje'],
      type: '',
      key: '',
      dialog: '',
      painting: {
        name: '',
        artistId: '',
        created: '',
        location: '',
        medium: '',
        description: '',
        artMovement: '',
        img: '',
      },
    };
  },

  methods: {
    ...mapActions({
      addPaintingAction: 'paintings/addPaintingAction',
      geocodeForward: 'geocoder/geocodeForward',
      updatePaintingAction: 'paintings/updatePaintingAction',
    }),

    async enterPressed() {
      // if focused element is autocomplete allow enter to choose city
      // else user is trying to finish changes so call add
      const autocompleteElement = document.getElementById(
        'locationAutocomplete'
      );
      if (!this.valid) return;

      await this.add();
    },

    async add() {
      this.painting.coords = await this.geocodeForward(this.painting.location);
      this.painting.img =
        'https://i.ytimg.com/vi/IwtuO6kkMTA/maxresdefault.jpg';
      // paintingsDB.push(this.painting);
      await this.addPaintingAction(this.painting);
      bus.$emit('markerChanged', this.painting.name);
      this.reset();
      this.$refs.form.reset();
      document.getElementById('paintingNameInput').focus();
    },

    update() {
      this.updatePaintingAction(Object.assign({}, this.painting));
      this.close();
    },

    emitPaintingChanged(data) {
      bus.$emit('markerChanged', data);
    },

    close() {
      this.dialog = false;
      this.$refs.form.reset();
    },

    reset() {
      this.painting = {
        name: '',
        artistId: '',
        created: '',
        location: '',
        medium: '',
        description: '',
        artMovement: '',
        img: '',
      };
    },
  },

  computed: {
    ...mapGetters({
      artMovements: 'paintings/getArtMovements',
      artists: 'artists/getArtists',
      getAllArtists: 'artists/getAllArtists',
    }),

    keymap() {
      return {
        'ctrl+enter': this.enterPressed,
        esc: this.close,
      };
    },
  },

  created() {
    bus.$on('openPaintingDialog', data => {
      console.log('received');
      if (data.painting) this.painting = { ...data.painting };
      this.type = data.type;
      this.key = data.key;
      this.dialog = true;
    });
  },
};
</script>

<style></style>
