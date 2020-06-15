<template>
  <v-container> </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { bus } from '../../main';

export default {
  data() {
    return {};
  },

  mounted() {
    // listen to any changes to update the lines
    bus.$on('markerChanged', data => this.connectArtistsAndPaintings(data));

    bus.$on('paintingMarkerDeleted', data => this.deletePainting(data));

    bus.$on('paintingArtistChanged', data => this.deleteLayer(data));

    bus.$on('resetMap', data => this.resetMap());

    // but first initialize all lines
    this.connectArtistsAndPaintings('');
  },

  methods: {
    deleteLayer(data) {
      const { key, newArtistName } = data;
      console.log(key);
      if (this.$store.map.getSource(key)) {
        this.$store.map.removeLayer(key);
        this.$store.map.removeSource(key);
      }
      this.connectArtistsAndPaintings(newArtistName);
    },

    deletePainting(data) {
      const { artistName, paintingName } = data;
      const key = artistName + '|' + paintingName;
      // delete the line
      if (this.$store.map.getSource(key)) {
        this.$store.map.removeLayer(key);
        this.$store.map.removeSource(key);
      }
    },

    connectArtistsAndPaintings(changed) {
      for (let artist of this.artists) {
        for (let painting of this.paintings) {
          // only draw if point was changed or if
          // user is loading the page for the first time
          if (
            artist.name == painting.artist.name &&
            (artist.name == changed ||
              painting.name == changed ||
              changed == '')
          ) {
            this.drawLine(artist, painting);
          }
        }
      }
    },

    drawLine(artist, painting) {
      const key = artist.name + '|' + painting.name;
      if (this.$store.map.getSource(key)) {
        this.$store.map.removeLayer(key);
        this.$store.map.removeSource(key);
      }

      this.$store.map.addSource(key, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [artist.coords, painting.coords],
          },
        },
      });

      this.$store.map.addLayer({
        id: key,
        type: 'line',
        source: key,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#888',
          'line-width': 3,
        },
      });
    },

    resetMap() {
      for (let source in this.$store.map.getStyle().sources) {
        if (source != 'composite') {
          this.$store.map.removeLayer(source);
          this.$store.map.removeSource(source);
        }
      }
      this.connectArtistsAndPaintings('');
    },
  },

  computed: {
    ...mapGetters({
      artists: 'artists/getArtists',
      allArtists: 'artists/getAllArtists',
      paintings: 'paintings/getPaintings',
      allPaintings: 'paintings/getAllPaintings',
    }),
  },
};
</script>

<style></style>
