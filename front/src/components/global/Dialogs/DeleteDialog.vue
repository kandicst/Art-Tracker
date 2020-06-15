<template>
  <v-dialog
    v-model="dialog"
    width="400px"
    @click:outside="cancel()"
    :retain-focus="false"
  >
    <v-card>
      <v-card-title class="headline">Delete {{ type }}?</v-card-title>
      <v-card-text>
        Deleting
        <span class="font-weight-bold"> {{ type }} {{ object.name }} </span>
        will permanently remove it from the map as well as from the database.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="cancel()" text>Cancel</v-btn>
        <v-btn color="blue" @click="deleteEntity" text>Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from '@/main';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      object: '',
      type: '',
    };
  },

  methods: {
    ...mapActions({
      removeArtistAction: 'artists/removeArtistAction',
      removePaintingAction: 'paintings/removePaintingAction',
    }),

    ...mapMutations({
      setContext: 'artists/setContext',
    }),

    cancel(){
      this.dialog = false;
      this.setContext('');
    },

    async deleteEntity() {
      if (this.type == 'Artist') {
        // check if artist has paintings
        // if he has he can't be deleted
        await this.removeArtistAction(this.key);
      } else {
        await this.removePaintingAction(this.key);
        bus.$emit('paintingMarkerDeleted', {
          artistName: this.artistById,
          paintingName: this.object.name,
        });
      }

      this.cancel();
    },
  },

  created() {
    bus.$on('onDelete', data => {
      this.object = { ...data.object };
      this.type = data.type;
      this.key = data.key;
      this.dialog = true;
      this.setContext(`#${this.type.toLowerCase()}s`);
    });
  },

  computed: {
    artistById() {
      // console.log(this.object.artistById)
      return this.$store.getters['artists/getArtistById'](this.object.artistId)
        .name;
    },
  },
};
</script>

<style></style>
