<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    @load="onMapLoaded"
    :maxBounds="selectedMap.bounds"
    :key="selectedMap.name"
    :zoom="selectedMap.zoom"
    :center="selectedMap.center"
  >
        <!-- :coordinates.sync="artist.coord" -->
    <template v-for="artist in artists">
      <MglMarker
        :id="artist.name"
        :coordinates.sync="artist.coord"
        color="green"
        :key="artist.name"
        @dragend="markerDragEnd"
        :draggable="true"
      >
        <MglPopup>
          <div>{{ artist.name }}</div>
        </MglPopup>
      </MglMarker>
    </template>

    <MglNavigationControl position="bottom-right" :showCompass="false" />
  </MglMap>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker, MglNavigationControl, MglPopup } from 'vue-mapbox';
import { mapGetters, mapActions } from 'vuex';
import NodeGeocoder from 'node-geocoder';
const opencage = require('opencage-api-client');
import Vue from 'vue';

// const NodeGeocoder = require('node-geocoder');

export default {
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
    MglPopup,
  },
  data() {
    return {
      // geoCoder : nodeGeocoder({provider: 'openstreetmap'}),
      accessToken:
        'pk.eyJ1Ijoic3N0ZWYiLCJhIjoiY2thMDEzMXBpMGNpYjNmcG11Y2ozYTlucCJ9.GDzoIBfJMXOLfL1vxMuGnw',
      mapStyle: 'mapbox://styles/mapbox/streets-v9',
      markerCoordinates: [50, 50],
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },

  computed: {
    ...mapGetters({
      selectedMap: 'map/getSelectedMap',
      artists: 'artists/getArtists',
    }),
  },

  methods: {

    ...mapActions({
      geocodeForward: 'geocoder/geocodeForward',
    }),

    async onMapLoaded(event) {
      // in component
      this.map = event.map;
      // or just to store if you want have access from other components
      this.$store.map = event.map;

      // let options = { draggable: true };
      // var marker = new Mapbox.Marker(options)
      //   .setLngLat([30.5, 50.5])
      //   .addTo(this.$store.map)
      //   .on('dragend', function(e) {
      //     console.log(e);
      //     console.log(e.target._lngLat);
      //   })
      //   .getElement()
      //   .setAttribute('painterId', 'OMFG');


    },

    ale(x) {
      console.log(x);
    },

    async forwardGeoLocate(city) {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${this.$cageApiKey}`
      const { data } = await Vue.$axios.get(url);
      const coord = data.results[0].geometry;
      // console.log(coord);
      return [coord.lat, coord.lng]
    },

    async markerDragEnd(event) {
      const artist = event.component.$el.id;
      const coords = event.marker._lngLat;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=${this.$cageApiKey}`
      const { data } = await Vue.$axios.get(url);
      // console.log(data.results[0].components);
    },
  },
};
</script>

<style></style>
