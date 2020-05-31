<template>
  <v-container class="scro mt-5" style="direction:rtl;">
    <v-row style="direction:ltr;">
      <v-col sm="12" xl="6" align="center" v-for="artist in artists" :key="artist.name">
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
  max-height: 770px;
  overflow-y: auto;
}
</style>
