<template>
  <v-container class="top-cont px-6 mt-3">
    <v-row>
      <v-col class="pl-8">
        <div class="display-1">New painter</div>
      </v-col>
    </v-row>

    <v-row class="scro" justify="space-between" style="direction:rtl;">
        <v-col cols="6" v-for="n in 20" :key="n">
          <GridComponent />
        </v-col>
    </v-row>

    <v-row class="mt-12">
      <v-col cols="6" class="pa-0" align="center" justify="begin">
        <v-btn @click="openAddDialog" class="blue white--text" v-hotkey="keymap"
          >Artist Dialog</v-btn
        >
      </v-col>
      <v-col cols="6" class="pa-0" align="center" justify="begin">
        <v-btn @click="openPaintingsAddDialog" class="blue white--text"
          >Painting Dialog</v-btn
        >
      </v-col>
      <ArtistsDialog />
      <PaintingsDialog />
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ArtistsDialog from './dialogues/ArtistsDialog';
import PaintingsDialog from './dialogues/PaintingsDialog';
import GridComponent from './GridComponent';

export default {
  components: {
    ArtistsDialog,
    PaintingsDialog,
    GridComponent,
  },

  data() {
    return {};
  },

  methods: {
    ...mapMutations('artistsDialog', {
      openAddDialog: 'openAddDialog',
      openEditDialog: 'openEditDialog',
    }),

    // TEST
    ...mapMutations('paintingsDialog', {
      openPaintingsAddDialog: 'openAddDialog',
    }),
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
  max-height: 500px;
  overflow-y: scroll;
}
</style>
