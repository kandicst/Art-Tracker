<template>
  <v-container class="scro mt-5" style="direction:rtl;">
    <v-row justify="center">
      <v-col cols="6" align="center" v-for="n in 20" :key="n">
        <ArtistGridComponent/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArtistGridComponent from './ArtistGridComponent'

export default {
    components: {
        ArtistGridComponent,
    }
};
</script>

<style scoped>

.scro {
  max-height: 650px;
  overflow-y: scroll;
}

</style>
