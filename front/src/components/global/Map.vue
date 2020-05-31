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
        :key="artist.name"
        @dragend="markerDragEnd"
        :draggable="true"
        anchor="center"
      >
        <v-img
          v-if="artist.img"
          class="marker-img-artist"
          aspect-ratio="1"
          width="40px"
          height="40px"
          slot="marker"
          :src="artist.img"
        >
        </v-img>
        <!-- IF Artists has no img put initials -->
        <avatar
          v-else
          slot="marker"
          color="steelblue"
          :fullname="artist.name"
          :size="40"
        >
        </avatar>

        <MglPopup class="pa-0" anchor="bottom">
          <v-card class="ma-0 pa-0">
            <v-card-title>
              {{ artist.name }}
            </v-card-title>
          </v-card>
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
import Vue from 'vue';
import Avatar from 'vue-avatar-component';
const opencage = require('opencage-api-client');

// const NodeGeocoder = require('node-geocoder');

export default {
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
    MglPopup,
    Avatar,
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

      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      let x = new Mapbox.Marker(el);
      x._draggable = true;
      // x.setLngLat([30.5, 50.5]).addTo(this.$store.map);
    },

    ale(x) {
      console.log(x);
    },

    async forwardGeoLocate(city) {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${this.$cageApiKey}`;
      const { data } = await Vue.$axios.get(url);
      const coord = data.results[0].geometry;
      // console.log(coord);
      return [coord.lat, coord.lng];
    },

    async markerDragEnd(event) {
      const artist = event.component.$el.id;
      const coords = event.marker._lngLat;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=${this.$cageApiKey}`;
      const { data } = await Vue.$axios.get(url);
      console.log(data.results[0].components);
    },
  },
};
</script>

<style>
.marker {
  /* background-image: url('https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/9445674921540553618-512.png'); */
  background-image: url('https://www.biography.com/.image/t_share/MTY2NTIzNTAyNjgwMDg5ODQy/pablo-picasso-at-his-home-in-cannes-circa-1960-photo-by-popperfoto_getty-images.jpg');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.marker-img-artist {
  border-radius: 30px;
}

.mapboxgl-popup-content {
  padding: 0px;
}

.mapboxgl-marker {
  position: absolute;
  top: 0;
}
</style>
