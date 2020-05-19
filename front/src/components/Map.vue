<template>
  <MglMap 
    :accessToken="accessToken" 
    :mapStyle="mapStyle"
    @load="onMapLoaded"
    :key="selectedMap"
  >
     <MglMarker
      :coordinates.sync="markerCoordinates"
      color='green'
      @dragend="ale"
      :draggable="true"
    >
      <MglPopup>
          <div>Hello, I'm popup!</div>
      </MglPopup>
    </MglMarker>
    <MglNavigationControl position="bottom-right" :showCompass="false" />
  </MglMap>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglNavigationControl, MglPopup } from "vue-mapbox";

export default {
  components: {
    MglMap, MglMarker,
    MglNavigationControl, MglPopup  
  },
  data() {
    return {
      selectedMap : "",
      accessToken: 'pk.eyJ1Ijoic3N0ZWYiLCJhIjoiY2thMDEzMXBpMGNpYjNmcG11Y2ozYTlucCJ9.GDzoIBfJMXOLfL1vxMuGnw', 
      mapStyle : 'mapbox://styles/mapbox/streets-v9',
      markerCoordinates: [50, 50],

    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },

  methods: {
    onMapLoaded(event) {
      // in component
      this.map = event.map;
      // or just to store if you want have access from other components
      this.$store.map = event.map;

      let options = {"draggable" : true}
      var marker = new Mapbox.Marker(options)
      .setLngLat([30.5, 50.5])
      .addTo(this.$store.map)
      .on('dragend', function(e) {
        console.log(e);
        console.log(e.target._lngLat)
      })
      .getElement().setAttribute('painterId', 'OMFG')


    },

    ale(x) {
      this.selectedMap += "11"
      console.log(this.selectedMap)
      console.log(x);
    }
  }
};
</script>

<style>

</style>