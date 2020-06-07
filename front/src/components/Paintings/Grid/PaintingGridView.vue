<template>
  <v-container class="scro mt-5" style="direction:rtl;">
    <v-row style="direction:ltr;">
      <v-col sm="12" xl="6" align="center" v-for="painting in paintings" :key="painting.name">
        <PaintingGridComponent :painting="painting"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import PaintingGridComponent from './PaintingGridComponent';

export default {
  components: {
    PaintingGridComponent,
  },

  computed: {
    ...mapGetters({
      paintings: 'paintings/getPaintings',
    }),
  },
};
</script>

<style scoped>
.scro {
  /* max-height: 770px;
  overflow-y: auto; */
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll ;
}
</style>
