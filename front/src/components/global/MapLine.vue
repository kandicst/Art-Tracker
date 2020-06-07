<template>
  <v-container> </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['changed'],
  data() {
    return {
      // origin: [11.2558, 43.7696],
      // destination: [2.3522, 48.8566],
    };
  },

  mounted() {
    for (let artist of this.artists) {
      for (let painting of this.paintings) {
        // only draw if point was changed or if
        // user is loading the page for the first time
        if (
          artist.name == painting.artist.name &&
          (artist.name == this.changed ||
            painting.name == this.changed ||
            this.changed == '')
        )
          this.drawLine(artist, painting);
      }
    }
  },

  methods: {
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
  },

  computed: {
    ...mapGetters({
      artists: 'artists/getArtists',
      paintings: 'paintings/getPaintings',
    }),
  },
};
</script>

<style></style>
