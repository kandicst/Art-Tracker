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
        <v-form ref="form" class="mt-5 mr-8" lazy-validation>
          <v-text-field
            v-model="painting.name"
            label="Name"
            id="paintingNameInput"
            prepend-icon="mdi-rename-box"
            autofocus
          >
          </v-text-field>

          <v-select
            :items="artists"
            v-model="painting.artist"
            item-text="name"
            return-object
            menu-props="auto"
            label="Artist"
            hide-details
            single-line
            prepend-icon="mdi-account"
          ></v-select>

          <v-text-field
            v-model="painting.created"
            class="mt-5"
            label="Created"
            type="number"
            prepend-icon="mdi-timer"
            hint="Year that it was painted"
          ></v-text-field>

          <!-- <v-text-field
            v-model="painting.location"
            label="Location"
            prepend-icon="mdi-home-city"
            hint="Where the image is located today"
          ></v-text-field> -->
          <CityAutocomplete
            :location="painting.location"
            @locationChanged="painting.location = $event"
            id="locationAutocomplete"
          />

          <v-select
            :items="artMovements"
            v-model="painting.artMovement"
            menu-props="auto"
            label="Art movement"
            hide-details
            single-line
            prepend-icon="mdi-timer-sand"
          ></v-select>

          <v-select
            :items="mediums"
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
import CityAutocomplete from './../CityAutocomplete';

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
    };
  },

  methods: {
    ...mapMutations('paintingsDialog', {
      close: 'closeDialog',
      reset: 'resetDialogPainting',
    }),

    ...mapActions({
      addPaintingAction: 'paintings/addPaintingAction',
    }),

    async enterPressed() {
      // if focused element is autocomplete allow enter to choose city
      // else user is trying to finish changes so call add
      const autocompleteElement = document.getElementById(
        'locationAutocomplete'
      );
      if (
        !autocompleteElement ||
        autocompleteElement.contains(document.activeElement)
      )
        return;

      await this.add();
    },

    async add() {
      await this.addPaintingAction(Object.assign({}, this.painting));
      this.reset();
      document.getElementById('paintingNameInput').focus();
    },

    update() {
      console.log('update');
    },
  },

  computed: {
    ...mapGetters({
      dialog: 'paintingsDialog/getShowDialog',
      painting: 'paintingsDialog/getDialogPainting',
      type: 'paintingsDialog/getDialogType',
      artMovements: 'paintings/getArtMovements',
      artists: 'artists/getArtists',
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
