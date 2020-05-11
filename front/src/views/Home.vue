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
          <v-btn>DUGME</v-btn>
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
        
        <v-col cols="8 blue">
          <!-- OVDE CE ICI MAPA -->
          <!-- <NavigationDrawer/> -->
          <div class="blue"></div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import NavigationDrawer from "@/components/NavigationDrawer";
import SideBar from "@/components/SideBar"

export default {
  name: 'Home',
  components: {
    SideBar
    // NavigationDrawer
  },

  data() {
    return {
      tab : null,
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