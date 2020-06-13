<template>
  <v-menu v-model="menu" offset-y :close-on-content-click="false">
    <v-card
      :flat="true"
    >
    <v-container>
      <v-form ref="artistsForm">
        <v-row>
          <v-col cols="2">
            <label class="filter-label">Period</label>
          </v-col>
          <v-col cols="10" class="pl-12 pt-3">
            <v-row>
              <v-col
                cols="4"
                class="pa-0"
                v-for="period in artMovements"
                :key="period"
              >
                <v-row class="pt-0">
                  <v-checkbox
                    class="ma-0 pt-0"
                    :value="period"
                    :label="period"
                    @click="togglePeriod(period)"
                  ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider>
          
        </v-divider>
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
                  clearable  
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
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker v-model="filterArtists.date2" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

      </v-form>
      </v-container>
      
    </v-card>

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
import { mapMutations, mapGetters, mapActions } from 'vuex';

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
      filterArtists:{
        date1:null,
        date2:new Date(Date.now()).toUTCString(),
        periods:[]
      },
    };
  },

  computed:{
    ...mapGetters({
      artMovements: 'paintings/getArtMovements',
    }),
  },
  methods: {
    togglePeriod(period){
      if (this.filterArtists.periods.includes(period)) {
        this.filterArtists.periods = this.filterArtists.periods.filter(p=>p!=period);
      } else {
        this.filterArtists.periods.push(period);
      }
      console.log(this.filterArtists.periods);
      
    },
    mounted(){
    },
    apply(){
      if(!this.$refs.artistsForm||this.$refs.artistsForm.validate()){
        this.$store.commit("artists/setFilter", JSON.parse(JSON.stringify(this.filterArtists)) );
      }
    },
    clear(){
      this.filterArtists={
        date1:null,
        date2:null,
        periods:[]
      };
      this.$refs.artistsForm.reset();
      this.$store.commit("artists/setFilter", this.filterArtists);
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
