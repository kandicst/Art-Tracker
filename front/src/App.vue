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
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
