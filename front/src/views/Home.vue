<template>
    <v-container class=" mainContainer">

      <v-row class="pa-5">
          <div >
          <v-tabs v-model="tab" class="mb-6" background-color="transparent">
            <v-tab key="painters">Painters</v-tab>
            <v-tab key="artwork">Artwork</v-tab>
            <v-tab key="tags">Tags</v-tab>
          </v-tabs>
          </div>

          <v-spacer></v-spacer>
          <v-switch>DUGME</v-switch>
          <button v-hotkey="keymap"> DUGME </button>
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
    }
  },

  methods: {
    theAction() {
      alert('lelelel')
    },

    switchToLeftTab() {
      this.tab = (this.tab - 1) % 3
    },

    switchToRightTab() {
      this.tab = (this.tab + 1) % 3
    }
  },

  computed :{
    keymap () {
      return {
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


</style>