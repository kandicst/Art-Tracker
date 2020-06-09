<template>
  <v-container class="top-cont px-6 pt-1 content-color">
    <v-row class="mr-3 ml-5">
      <v-spacer></v-spacer>
      <v-btn @click="addArtist" class="mx-5 text-none blue--text" tile>
        <v-icon class="mr-5 black--text">mdi-plus</v-icon>
        Add Artist
      </v-btn>
      <v-btn-toggle v-model="selectedView" mandatory dense borderless>
        <v-btn icon><v-icon>mdi-view-grid</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-format-list-bulleted</v-icon></v-btn>
      </v-btn-toggle>
    </v-row>

    <ArtistGridView class="mt-12" :hidden="selectedView == 1" />
    <ArtistListView :hidden="selectedView == 0" />

    <ArtistsDialog />
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ArtistsDialog from './Dialogs/ArtistsDialog';
import ArtistGridView from './Grid/ArtistGridView';
import ArtistListView from './List/ArtistListView';

import { artistsDB } from './../../firebase';

export default {
  components: {
    ArtistsDialog,
    ArtistGridView,
    ArtistListView,
  },

  data() {
    return {
      selectedView: 0,
    };
  },

  methods: {
    ...mapMutations('artistsDialog', {
      openAddDialog: 'openAddDialog',
      openEditDialog: 'openEditDialog',
    }),

    addArtist() {
      this.openAddDialog();
      console.log(this.selectedView);
    },
  },

  computed: {
    keymap() {
      return {
        'ctrl+alt+n': this.openAddDialog,
      };
    },

    ...mapGetters({
      artMovements: 'paintings/getArtMovements',
    }),
  },
};
</script>

<style scoped>
.top-cont {
  height: 100%;
}
</style>
