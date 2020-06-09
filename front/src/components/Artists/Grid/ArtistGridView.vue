<template>
  <v-container class="scrollable mt-5" id="" style="direction:rtl;">
    <v-row style="direction:ltr;">
      <v-col sm="12" lg="6" align="center" v-for="artist in artists" :key="artist.id">
        <!-- {{loguj(artist.name)}} -->
        <ArtistGridComponent :artist="artist"/>
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

  methods: {
    loguj(name){
      console.log(name);
    }
  },

  computed: {
    ...mapGetters({
      artists: 'artists/getArtists',
    }),
  },
};
</script>

<style>
.scrollable {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll ;
}

.scrollable::-webkit-scrollbar {
    /* background-color:#fff; */
    background-color: rgb(227, 231, 248);
    width:16px;
}

/* background of the scrollbar except button or resizer */
.scrollable::-webkit-scrollbar-track {
    /* background-color:#fff; */
    background-color: rgb(227, 231, 248);
}

/* scrollbar itself */
.scrollable::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius:16px;
    /* border:4px solid #fff; */
    border:4px solid rgb(227, 231, 248);
}

/* set button(top and bottom of the scrollbar) */
.scrollable::-webkit-scrollbar-button {display:none}

</style>
