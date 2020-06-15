<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Snackbar />
  </v-app>
</template>

<script>
import { artistsDB, paintingsDB } from './firebase';
import { bus } from './main';
import Snackbar from './components/global/MySnackbar';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'App',

  components: { Snackbar },

  data: () => ({}),
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
