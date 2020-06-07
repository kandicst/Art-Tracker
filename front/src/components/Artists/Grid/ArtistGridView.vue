<template>
  <v-container class="scro mt-5" style="direction:rtl;">
    <v-row style="direction:ltr;">
      <v-col sm="12" lg="6" align="center" v-for="artist in artists" :key="artist.name">
        <ArtistGridComponent :artist="artist" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ArtistGridComponent from './ArtistGridComponent';

export default {
  components: {
    ArtistGridComponent,
  },

  computed: {
    ...mapGetters({
      artists: 'artists/getArtists',
    }),
  },
};
</script>

<style scoped>
.scro {
  /* max-height: 770px; */
  /* overflow-y: auto; */
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll ;
}
</style>
