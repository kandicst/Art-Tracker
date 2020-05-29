<template>
  <v-container class="top-cont px-6 pt-2">
    <v-row class="mr-10 ml-5">
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

    <!-- <v-container class="scro mt-5" style="direction:rtl;">
      <v-row justify="center">
        <v-col cols="6" align="center" v-for="n in 20" :key="n">
          <GridComponent />
        </v-col>
      </v-row>
    </v-container> -->
    <ArtistGridView />

    <ArtistsDialog />
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ArtistsDialog from './Dialogs/ArtistsDialog';
import ArtistGridView from './Grid/ArtistGridView';

export default {
  components: {
    ArtistsDialog,
    ArtistGridView,
  },

  data() {
    return {
      selectedView: '',
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

.scro {
  max-height: 750px;
  overflow-y: scroll;
}
</style>
