<template>
    <v-container class=" mainContainer" v-hotkey="keymap">

      <v-row class="pa-5">
          <div >
          <v-tabs v-model="tab" class="mb-6" background-color="transparent">
            <v-tab key="painters">Painters</v-tab>
            <v-tab key="artwork">Artwork</v-tab>
            <v-tab key="tags">Tags</v-tab>
          </v-tabs>
          </div>

          <v-spacer></v-spacer>
          <!-- <v-switch>DUGME</v-switch> -->
          <v-select
            class="mapSelection mt-2 mr-3"
            v-model="selectedMap.name"
            :items="mapOptions"
            hide-details
            solo 
            dense
            @change="mapChanged"
            item-text="name"
            return-object
          >
          </v-select>
      </v-row>
      <v-row class="mainRow">
        <v-col cols="4" class="ma-0 py-0 pr-0">

          <v-tabs-items v-model="tab">
            <v-tab-item key="painters" class=""> 
              <SideBar class="leftSideBar"/>
            </v-tab-item>
            <v-tab-item key="artwork" class="">
              <SideBar class="leftSideBar"/>
            </v-tab-item>
            <v-tab-item key="tags" class="">
              <SideBar class="leftSideBar"/>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
        
        <v-col cols="8">
          <!-- OVDE CE ICI MAPA -->
          <!-- <NavigationDrawer/> -->
          <div style="height:100%;">
            <Map></Map>
          </div>
          <!-- <div class="blue"></div> -->
        </v-col>
      </v-row>
      
      <!-- button for changing tabs -->
    </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import NavigationDrawer from "@/components/NavigationDrawer";
import SideBar from "@/components/SideBar"
import Map from '@/components/Map'
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'Home',
  components: {
    SideBar,
    Map
    // NavigationDrawer
  },

  data() {
    return {
      tab : null,
      // selectedMap : "World",
      // mapOptions: ['World', 'Europe', 'United States', 'Serbia' ],
    }
  },

  methods: {
    ...mapActions({
      changeSelectedMapAction: 'map/changeSelectedMapAction',
    }),

    theAction() {
      alert('lelelel')
    },

    mapChanged(val) {
      console.log(val);
      this.changeSelectedMapAction(val);
    },

    switchToLeftTab() {
      this.tab = (this.tab - 1) % 3
    },

    switchToRightTab() {
      this.tab = (this.tab + 1) % 3
    },

    switchMapUp() {
      let index = this.mapOptions.findIndex(map => map.name == this.selectedMap.name);
      index = (index + 1) % this.mapOptions.length;
      this.selectedMap = this.mapChanged[index]
    },

    switchMapDown() {
      alert('switched')
      let index = this.mapOptions.findIndex(map => map.name == this.selectedMap.name);
      index = (index - 1) % this.mapOptions.length;
      this.selectedMap = this.mapChanged[index]
    },
  },

  computed: {

    ...mapGetters({
      mapOptions: 'map/getMapOptions',
      selectedMap: 'map/getSelectedMap'
    }),

    keymap () {
      return {
       'ctrl+up': this.switchMapUp,
       'ctrl+down': this.switchMapDown,
       'ctrl+left': this.switchToLeftTab,
       'ctrl+right' : this.switchToRightTab,
       'tab' : this.theAction,
      }
    }
  }
}
</script>


<style scoped>

.leftSideBar {
  height: 100%;
}

.mainContainer {
  height: 100%;
  max-width: 5000px;
}

.mainRow {
  height: 89%;
}

.mapSelection{
  max-width: 170px !important;
}

</style>