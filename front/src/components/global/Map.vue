<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    @load="onMapLoaded"
    :maxBounds="selectedMap.bounds"
    :key="selectedMap.name"
    :zoom="selectedMap.zoom"
    :center="selectedMap.center"
    class="main-map"
  >
    <template v-for="artist in artists">
      <MglMarker
        :id="artist.name"
        :coordinates.sync="artist.coords"
        :key="artist['.key']"
        @dragend="artistMarkerDragEnd"
        @dragstart="onMarkerDragStart"
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

    <template v-for="painting in paintings">
      <MglMarker
        :id="painting.name"
        :coordinates.sync="painting.coords"
        :key="painting['.key']"
        @dragend="paintingMarkerDragEnd"
        @dragstart="onMarkerDragStart"
        :draggable="true"
        anchor="center"
      >
        <v-img
          class="marker-img-artist"
          aspect-ratio="1"
          width="40px"
          height="40px"
          slot="marker"
          :src="painting.img"
        >
        </v-img>

        <MglPopup class="pa-0" anchor="bottom">
          <v-card class="ma-0 pa-0">
            <v-card-title>
              {{ painting.name }}
            </v-card-title>
          </v-card>
        </MglPopup>
      </MglMarker>
    </template>

    <!-- <MapLine :key="bool" :changed="changed" /> -->
    <MapLine />
    <MglNavigationControl position="bottom-right" :showCompass="false" />
  </MglMap>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker, MglNavigationControl, MglPopup } from 'vue-mapbox';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import NodeGeocoder from 'node-geocoder';
import Vue from 'vue';
import Avatar from 'vue-avatar-component';
import MapLine from './MapLine';
import { bus } from '../../main';
import { artistsDB, paintingsDB } from './../../firebase';
const opencage = require('opencage-api-client');

export default {
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
    MglPopup,
    Avatar,
    MapLine,
  },
  data() {
    return {
      accessToken:
        'pk.eyJ1Ijoic3N0ZWYiLCJhIjoiY2thMDEzMXBpMGNpYjNmcG11Y2ozYTlucCJ9.GDzoIBfJMXOLfL1vxMuGnw',
      mapStyle: 'mapbox://styles/mapbox/streets-v9',
      markerCoordinates: [50, 50],
      oldCoords: [0, 0],
      bool: false,
      changed: '',
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
      paintings: 'paintings/getPaintings',
    }),
  },

  methods: {
    ...mapActions({
      geocodeForward: 'geocoder/geocodeForward',
      bindArtists: 'artists/bindArtists',
      bindPaintings: 'paintings/bindPaintings',
      movePaintingAction: 'paintings/movePaintingAction',
      moveArtistAction: 'artists/moveArtistAction',
    }),

    ...mapMutations({
      moveArtistOnMap: 'artists/moveArtistOnMap',
      movePaintingOnMap: 'paintings/movePaintingOnMap',
      setArtist: 'artists/setArtist',
      setPaintings: 'paintings/setPaintings',
    }),

    async onMapLoaded(event) {
      // in component
      this.map = event.map;
      // or just to store if you want have access from other components
      this.$store.map = event.map;

      await this.bindArtists();
      await this.bindPaintings();
      bus.$emit('markerChanged', '');
    },

    async forwardGeoLocate(city) {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${this.$cageApiKey}`;
      const { data } = await Vue.$axios.get(url);
      const coords = data.results[0].geometry;
      return [coords.lat, coords.lng];
    },

    async artistMarkerDragEnd(event) {
      const name = event.component.$el.id;
      const coords = event.marker._lngLat;
      // move optimistically
      bus.$emit('markerChanged', name);
      try {
        await this.moveArtistAction({ name, coords });
      } catch {
        // if failed change to old coords and return back
        await this.moveArtistAction({
          name,
          coords: this.oldCoords,
          revert: true,
        });
        bus.$emit('markerChanged', name);
      }
    },

    async onMarkerDragStart(event) {
      this.oldCoords = event.marker._lngLat;
    },

    async paintingMarkerDragEnd(event) {
      const name = event.component.$el.id;
      const coords = event.marker._lngLat;
      // move optimistically
      bus.$emit('markerChanged', name);
      try {
        await this.movePaintingAction({ name, coords });
      } catch {
        // if failed change to old coords and return back
        await this.movePaintingAction({
          name,
          coords: this.oldCoords,
          revert: true,
        });
        bus.$emit('markerChanged', name);
      }
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

.mapboxgl-map {
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
}
</style>
