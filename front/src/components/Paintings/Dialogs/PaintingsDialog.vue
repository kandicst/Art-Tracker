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
            validate-on-blur
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
            :rules="
              rule.concat([
                v => (v >= 0 && v <= 2020) || 'Must be in range 0 - 2020',
              ])
            "
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
            required
            v-model="painting.artMovement"
            menu-props="auto"
            label="Art movement"
            :hint="checkHint()"
            persistent-hint
            :rules="rule"
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
            required
            class="mt-5"
            label="Description"
            rows="2"
            prepend-icon="mdi-comment"
          ></v-textarea>

          <!-- v-model="painting.image" -->
          <v-file-input
            v-model="img"
            accept="image/*"
            label="Image"
            :rules="type === 'add' ? rule : []"
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
import CityAutocomplete from './../../global/CityAutocomplete';
import firebase from 'firebase/app';
import 'firebase/storage';
import { bus } from '../../../main';
import { paintingsDB } from './../../../firebase';

export default {
  components: {
    CityAutocomplete,
  },
  data() {
    return {
      img: null,
      mediums: [
        'Pastel',
        'Colage',
        'Tapestry',
        'Graffiti',
        'Ugljen',
        'Oil',
        'Acril',
        'Watercolor',
        'Gouache',
        'Tempera',
        'Mosaic',
        'Enakustika',
      ],
      valid: false,
      rule: [v => !!v || 'Requred field'],
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
    checkHint() {
      return this.hintsMovement[this.painting.artMovement];
    },

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
      if (await !this.$refs.form.validate()) return;

      if (this.type == 'add') await this.add();
      else await this.update();
    },

    async add() {
      if (!(await this.$refs.form.validate())) return;
      this.painting.coords = await this.geocodeForward(this.painting.location);

      if (this.img != null) {
        var storageRef = firebase.storage().ref(this.img.name);
        var snapshot = await storageRef.put(this.img);
        this.painting.img = await snapshot.ref.getDownloadURL();
        this.img = null;
      }
      await this.addPaintingAction(this.painting);
      bus.$emit('markerChanged', this.painting.name);
      this.reset();
      this.$refs.form.resetValidation();
      document.getElementById('paintingNameInput').focus();
    },

    async update() {
      if (!(await this.$refs.form.validate())) return;
      const oldPainting = this.$store.getters['paintings/getPaintingById'](
        this.key
      );

      // if change birthplace get new coords
      if (oldPainting.location !== this.painting.location)
        this.painting.coords = await this.geocodeForward(this.painting.location);

      if (this.img != null) {
        var storageRef = firebase.storage().ref(this.img.name);
        var snapshot = await storageRef.put(this.img);
        this.painting.img = await snapshot.ref.getDownloadURL();
        this.img = null;
      }

      await this.updatePaintingAction({
        key: this.key,
        newPainting: this.painting,
      });

      // check if artist is changed in case you need to redraw map
      if (oldPainting.artistId != this.painting.artistId) {
        const oldArtistName = this.$store.getters['artists/getArtistById'](
          oldPainting.artistId
        ).name;
        const newArtistName = this.$store.getters['artists/getArtistById'](
          this.painting.artistId
        ).name;
        bus.$emit('paintingArtistChanged', {
          key: oldArtistName + '|' + oldPainting.name,
          newArtistName,
        });
      }
      
      bus.$emit('resetMap');
      this.close();
      this.$store.dispatch('snackbar/showSuccess', 'Painting was successfully updated')
    },

    emitPaintingChanged(data) {
      bus.$emit('markerChanged', data);
    },

    close() {
      if (this.$refs.form) this.$refs.form.resetValidation();
      this.dialog = false;
      this.reset();
    },

    reset() {
      this.img = null;
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
      hintsMovement: 'paintings/getHintsMovement',
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
      if (data.painting) this.painting = { ...data.painting };
      this.type = data.type;
      this.key = data.key;
      this.dialog = true;
    });
  },
};
</script>

<style></style>
