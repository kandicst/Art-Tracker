<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { artistsDB, paintingsDB } from './firebase';
import { bus } from './main'

import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),

  methods: {
    ...mapMutations({
      setArtist: 'artists/setArtist',
      setPaintings: 'paintings/setPaintings'
    }),
    metoda() {
    }
  },

  async created() {
    // let artists = [];
    // let paintings = [];

    // await artistsDB.once('value', async function(data) {
    //   artists = [];
    //   let items = data.val();
    //   for (let key in items) {
    //     items[key].id = key;
    //     artists.push(items[key]);
    //   }
    // });
    // await this.setArtist(artists);

    // await paintingsDB.once('value', async function(data) {
    //   paintings = [];
    //   let items = data.val();
    //   for (let key in items) {
    //     items[key].id = key;
    //     paintings.push(items[key]);
    //   }
    // });
    // await this.setPaintings(paintings);

    // bus.$emit('markerChanged', '');
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
