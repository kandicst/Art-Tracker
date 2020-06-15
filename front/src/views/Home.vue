<template>
  <v-container class=" mainContainer mt-0 pa-0" v-hotkey="keymap">
    <v-card class="" style="">
      <v-row class="px-5 pt-7" :height="82">
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
                v-model="search"
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
          <v-row justify="start" align="end" class="mt-2 mr-3">
            <v-spacer></v-spacer>
            <v-select
              class="mapSelection mx-4"
              v-model="selectedMap.name"
              :items="mapOptions"
              hide-details
              outlined
              dense
              @change="mapChanged"
              item-text="name"
              style="border-radius:0px!important;"
              return-object
            ></v-select>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  id="shortcuts"
                  class="hidden-md-and-down grey--text"
                  height="40px"
                  depressed
                  tile
                  outlined
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
            <v-menu>
              <template v-slot:activator="{ on:onMenu, attrs }">
                
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: onTooltip }">
                    <v-btn
                      v-bind="attrs"
                      v-on="{ ...onMenu, ...onTooltip }"
                      id="help"
                      class="hidden-md-and-down ml-4"
                      height="40px"
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
              </template>
              <v-list>
                <v-subheader>

                  <v-btn
                    @click="openHelp"
                  >
                    <span
                        class="iconify"
                        data-icon="bx:bx-help-circle"
                        data-inline="false"
                      ></span>
                  </v-btn>
                </v-subheader>

                <v-list-item
                >
                  <v-list-item-title>Dodavanje slikara</v-list-item-title>
                </v-list-item>
                <v-list-item
                >
                  <v-list-item-title>Dodavanje slike</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <!-- Page Content -->
    <v-row class="mainRow content-color pt-5 px-3">
      <v-col lg="5" xl="4" class="ma-0 pb-0 px-1">
        <v-tabs-items v-model="tab" style="height:100%;">
          <v-tab-item key="artists" style="height:100%;">
            <ArtistSideBar class="leftSideBar pl-0 pr-0" />
          </v-tab-item>
          <v-tab-item key="paintings" style="height:100%;">
            <PaintingSideBar class="leftSideBar pl-0 pr-0" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>

      <v-col lg="7" xl="8" class="pb-6" style="height:100%;">
        <Map />
      </v-col>
    </v-row>

    <!-- DIALOGS -->
    <v-dialog
      v-model="helpDialog"
      width="35%"
      @click:outside="helpDialog = false"
      :retain-focus="false"
    >
      <HelpDialog v-on:zatvori="shortcutDialog = false" />
    </v-dialog>

    <v-dialog
      v-model="shortcutDialog"
      width="800"
      @click:outside="shortcutDialog = false"
      :retain-focus="false"
    >
      <ShortcutsDialog v-on:zatvori="shortcutDialog = false" />
    </v-dialog>

    <DeleteDialog />

    <router-link :to="'/help' + context" id="help-hyperlink" target="_blank" :hidden="true">
      Link Text
    </router-link>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ArtistSideBar from './../components/Artists/ArtistSideBar';
import PaintingSideBar from './../components/Paintings/PaintingSideBar';
import Map from './../components/global/Map';
import FilterComponent from './../components/global/FilterComponent.vue';
import HelpDialog from './../components/global/Dialogs/HelpDialog';
import ShortcutsDialog from './../components/global/Dialogs/ShortcutsDialog';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import DeleteDialog from '../components/global/Dialogs/DeleteDialog';
import { bus } from '@/main';

export default {
  name: 'Home',
  components: {
    ArtistSideBar,
    PaintingSideBar,
    Map,
    HelpDialog,
    ShortcutsDialog,
    FilterComponent,
    DeleteDialog,
  },

  data() {
    return {
      tab: null,
      helpDialog: false,
      shortcutDialog: false,
      search: '',
    };
  },

  watch: {
    search(val) {
      this.$store.commit('artists/setSearch', val);
      bus.$emit('resetMap');
    },
  },
  methods: {
    ...mapActions({
      changeSelectedMapAction: 'map/changeSelectedMapAction',
    }),

    ...mapMutations({
      openArtistDialog: 'artistsDialog/openAddDialog',
      openPaintingDialog: 'paintingsDialog/openAddDialog',
    }),

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

    showShorcut() {
      this.shortcutDialog = true;
      this.helpDialog = false;
    },
    showHelp() {
      this.helpDialog = true;
      this.shortcutDialog = false;
    },

    openDialog() {
      if (this.tab == 0) {
        bus.$emit('openArtistDialog', {
          artist: '',
          type: 'add',
          key: '',
        });
      } else {
        bus.$emit('openPaintingDialog', {
          painting: '',
          type: 'add',
          key: '',
        });
      }
    },

    openHelp() {
      document.getElementById('help-hyperlink').click();
    },
  },

  computed: {
    ...mapGetters({
      mapOptions: 'map/getMapOptions',
      selectedMap: 'map/getSelectedMap',
      context: 'artists/getContext'
    }),

    keymap() {
      return {
        'ctrl+up': this.switchMapUp,
        'ctrl+down': this.switchMapDown,
        'ctrl+left': this.switchToLeftTab,
        'ctrl+right': this.switchToRightTab,
        'ctrl+alt+s': this.showShorcut,
        'ctrl+alt+h': this.showHelp,
        'ctrl+alt+n': this.openDialog,
        'ctrl+f1': this.openHelp,
      };
    },
  },
};
</script>

<style>
.leftSideBar {
  height: 100%;
}

.mainContainer {
  height: 100%;
  max-width: 100%;
}

.mainRow {
  /* height: 89%; */
  height: calc(100% - 82px - 5 * 4px);
}

.mapSelection {
  max-width: 170px !important;
}

#shortcuts .iconify {
  width: 20px;
  height: 20px;
}

#help .iconify {
  width: 30px;
  height: 30px;
}

.content-color {
  /* background-color: rgb(227, 231, 248) !important; */
  background-color: #e7eaf2;
}

.searchInput {
  border-radius: 0px !important;
}

.searchIcon .iconify {
  width: 15px;
  height: 15px;
  color: grey;
}
</style>
