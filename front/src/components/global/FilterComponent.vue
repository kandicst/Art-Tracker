<template>
  <v-menu v-model="menu" offset-y :close-on-content-click="false">
    <v-tabs>
      <v-tab>
        ARTISTS
      </v-tab>
      <v-tab>
        PAINTINGS
      </v-tab>
      <v-tab-item>
        <v-card
          :flat="true"
        >
        <v-container>
          <v-form ref="artistsForm">
            <label class="subtitle-1">
              Date of birth
            </label>
            <v-row>
              <v-col
                cols="6"
              >
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filterArtists.date1"
                      :rules="date1rules"
                      label="First date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filterArtists.date1" @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="6"
              >
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filterArtists.date2"
                      :rules="date2rules"
                      label="Second date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filterArtists.date2" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <label class="subtitle-1">
              Date of death
            </label>
            <v-row>
              <v-col
                cols="6"
              >
                <v-menu
                  v-model="menu5"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filterArtists.date3"
                      :rules="date5rules"
                      label="First date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filterArtists.date3" @input="menu5 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="6"
              >
                <v-menu
                  v-model="menu6"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filterArtists.date4"
                      :rules="date6rules"
                      label="Second date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filterArtists.date4" @input="menu6 = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-select>
  
            </v-select>
          </v-form>
          </v-container>
         
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          :flat="true"
        >
          <v-container>
            <v-form ref="paintingsForm">
              <label class="subtitle-1">
                Date of creation
              </label>
              <v-row>
                <v-col
                  cols="6"
                >
                  <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="filterPaintings.date1"
                        :rules="date3rules"
                        label="First date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="filterPaintings.date1" @input="menu3 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-menu
                    v-model="menu4"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="date4rules"
                        v-model="filterPaintings.date2"
                        label="Second date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="filterPaintings.date2" @input="menu4 = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-form>

          </v-container>
         
        </v-card>
      </v-tab-item>
    </v-tabs>

    <template v-slot:activator="{ on }">
      <v-btn
        class="text-none filterBtn"
        depressed
        outlined
        dense
        tile
        v-on="on"
        min-height="40px"
      >
        Filter
        <div class="ml-4 mt-1 filterIcon">
          <span class="iconify" data-icon="bx:bx-slider-alt"></span>
        </div>
      </v-btn>
    </template>
    <v-card class="px-4" :flat="true">
      <v-card-actions>
        <v-btn class="text-none red--text" text @click="clear">Clear All Filters</v-btn>
        <v-spacer></v-spacer>

        <v-btn class="text-none" text @click="menu = false">Cancel</v-btn>
        <v-btn class="text-none" color="primary" text @click="apply"
          >Apply</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu6: false,
      date1rules:[v=>!this.filterArtists.date2||(new Date(v)<=new Date(this.filterArtists.date2)||"First date must be before second.")],
      date2rules:[v=>!this.filterArtists.date1||(new Date(this.filterArtists.date1)<=new Date(v)||"Second date must be after first.")],
      date3rules:[v=>!this.filterPaintings.date2||(new Date(v)<=new Date(this.filterPaintings.date2)||"First date must be before second.")],
      date4ndrules:[v=>!this.filterArtists.date1||(new Date(this.filterArtists.date1)<=new Date(v)||"Second date must be after first.")],
      date5rules:[v=>!this.filterPaintings.date5||(new Date(v)<=new Date(this.filterPaintings.date5)||"First date must be before second.")],
      date6ndrules:[v=>!this.filterArtists.date6||(new Date(this.filterArtists.date6)<=new Date(v)||"Second date must be after first.")],
      filterArtists:{
        date1:null,
        date2:null,
        date3:null,
        date4:null,
      },
      filterPaintings:{
        date1:null,
        date2:null
      }
    };
  },

  methods: {
    apply(){
      if((!this.$refs.artistsForm||this.$refs.artistsForm.validate())&&(!this.$refs.paintingsForm||this.$refs.paintingsForm.validate())){
        this.$store.commit("artists/setFilter", this.filterArtists);
        this.$store.commit("paintings/setFilter", this.filterPaintings);
      }
    },
    clear(){
      this.filterArtists={
        date1:null,
        date2:null,
        date4:null,
        date5:null
      };
      this.filterPaintings={
        date1:null,
        date2:null
      };
      this.$store.commit("artists/setFilter", this.filterArtists);
      this.$store.commit("paintings/setFilter", this.filterPaintings);
    },
    close() {
      console.log(this.menu);
      this.menu = false;
    },
  },
};
</script>

<style>
.filterIcon .iconify {
  width: 25px;
  height: 25px;
  color: #616161 !important;
}

.filterBtn {
  /* color: #616161 !important; */
  border-color: grey;
  /* border-left: none; */
  color: black!important;
}
</style>
