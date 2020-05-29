<template>
  <v-container class=" mainContainer mt-0 pt-0" v-hotkey="keymap">
    <v-row class="px-5 pt-7 mb-5">
      <v-col cols="4" class="ma-0 pa-0">
        <v-tabs v-model="tab" class="" background-color="transparent">
          <v-tab key="artists">Artists</v-tab>
          <v-tab key="paintings">Paintings</v-tab>
        </v-tabs>
      </v-col>

      <!-- filled -->
      <v-col sm="3" md="5" class="ma-0 pa-0 pt-2">
        <v-row class="ma-0 pa-0">
          <v-col cols="8" class="ma-0 pa-0">
            <v-text-field
              class="searchInput"
              outlined
              dense
              single-line
              placeholder="Search..."
            >
              <template slot="prepend-inner">
                <div class="mt-1 ml-2 mr-4 searchIcon">
                  <span class="iconify" data-icon="zondicons:search"></span>
                </div>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="2" class="ma-0 pa-0">
            <FilterComponent />
          </v-col>
        </v-row>
      </v-col>
      
      <v-col sm="5" md="3" class="ma-0 pa-0">
        <v-row justify="start" align="end"  class="mt-2 mr-3">
            <v-spacer></v-spacer>
            <v-select
              class="mapSelection mx-4"
              v-model="selectedMap.name"
              :items="mapOptions"
              hide-details
              solo
              dense
              @change="mapChanged"
              item-text="name"
              return-object
            ></v-select>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  id="shortcuts"
                  v-on="on"
                  @click.stop="shortcutDialog = true"
                >
                  <span
                    class="iconify"
                    data-icon="ri-command-fill"
                    data-inline="false"
                  ></span>
                </v-btn>
              </template>
              <span>Keyboard Shortcuts</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  @click.stop="helpDialog = true"
                  id="help"
                  class="ml-4"
                  icon
                >
                  <span
                    class="iconify"
                    data-icon="bx:bx-help-circle"
                    data-inline="false"
                  ></span>
                </v-btn>
              </template>
              <span>Demo mode</span>
            </v-tooltip>
        </v-row>
      </v-col>
    </v-row>

    <!-- Page Content -->
    <v-row class="mainRow">
      <v-col md="4" class="ma-0 py-0 px-1">
        <v-tabs-items v-model="tab" style="height:100%;">
          <v-tab-item key="artists" style="height:100%;">
            <SideBar class="leftSideBar pl-0 pr-0" />
          </v-tab-item>
          <v-tab-item key="paintings" class="">
            <SideBar class="leftSideBar" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>

      <v-col md="8">
        <div style="height:100%;">
          <Map />
        </div>
      </v-col>
    </v-row>

    <!-- DIALOGS -->
    <v-dialog
      v-model="helpDialog"
      width="35%"
      @click:outside="helpDialog = false"
      :retain-focus="false"
    >
      <HelpDialog />
    </v-dialog>

    <v-dialog
      v-model="shortcutDialog"
      width="35%"
      @click:outside="shortcutDialog = false"
      :retain-focus="false"
    >
      <ShortcutsDialog />
    </v-dialog>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/SideBar';
import Map from '@/components/Map';
import FilterComponent from '@/components/FilterComponent';
import HelpDialog from '../components/dialogues/HelpDialog';
import ShortcutsDialog from '../components/dialogues/ShortcutsDialog';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    SideBar,
    Map,
    HelpDialog,
    ShortcutsDialog,
    FilterComponent,
  },

  data() {
    return {
      tab: null,
      helpDialog: false,
      shortcutDialog: false,
    };
  },

  methods: {
    ...mapActions({
      changeSelectedMapAction: 'map/changeSelectedMapAction',
    }),

    theAction() {
      alert('lelelel');
    },

    mapChanged(val) {
      this.changeSelectedMapAction(val);
    },

    switchToLeftTab() {
      this.tab = (this.tab - 1) % 3;
    },

    switchToRightTab() {
      this.tab = (this.tab + 1) % 3;
    },

    switchMapDown() {
      let index = this.mapOptions.findIndex(
        map => map.name == this.selectedMap.name
      );
      index = (index + 1) % this.mapOptions.length;
      this.changeSelectedMapAction(this.mapOptions[index]);
    },

    switchMapUp() {
      let index = this.mapOptions.findIndex(
        map => map.name == this.selectedMap.name
      );
      if (index == 0) index = this.mapOptions.length - 1;
      else index = index - 1;
      this.changeSelectedMapAction(this.mapOptions[index]);
    },
  },

  computed: {
    ...mapGetters({
      mapOptions: 'map/getMapOptions',
      selectedMap: 'map/getSelectedMap',
    }),

    keymap() {
      return {
        'ctrl+up': this.switchMapUp,
        'ctrl+down': this.switchMapDown,
        'ctrl+left': this.switchToLeftTab,
        'ctrl+right': this.switchToRightTab,
      };
    },
  },
};
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

.mapSelection {
  max-width: 170px !important;
}

#shortcuts .iconify {
  width: 20px;
  height: 20px;
}

#help .iconify {
  width: 25px;
  height: 25px;
}

.searchInput{
  border-radius:0px!important;
  
}

.searchIcon .iconify {
  width: 15px;
  height: 15px;
  color: grey;
}
</style>
