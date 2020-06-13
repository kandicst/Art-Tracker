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
                    v-model="filterArtists.periods"
                    :label="period"
                  ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row>
          <v-col cols="2">
            <label class="filter-label">Medium</label>
          </v-col>
          <v-col cols="10" class="pl-12 pt-3">
            <v-row>
              <v-col
                cols="4"
                class="pa-0"
                v-for="medium in mediums"
                :key="medium"
              >
                <v-row class="pt-0">
                  <v-checkbox
                    class="ma-0 pt-0"
                    v-model="filterPaintings.mediums"
                    :value="medium"
                    :label="medium"
                  ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider>
          
        </v-divider>
        <v-row>
          <v-col class="pt-8" cols="2">
            <label class="filter-label">Date</label>
          </v-col>

          <v-col cols="10">
            <v-row class="pl-4">
              <v-col cols="5">
                <v-text-field
                  v-model="startDate"
                  placeholder="YYYY-MM-DD"
                  style="border-radius:0;"
                  single-line
                  dense
                  append-icon="mdi-calendar"
                  outlined
                  :rules = "date1rules"
                ></v-text-field>
              </v-col>

              <span class="headline pt-3">-</span>

              <v-col cols="5">
                <v-text-field
                  v-model="endDate"
                  style="border-radius:0;"
                  placeholder="Today"
                  single-line
                  append-icon="mdi-calendar"
                  dense
                  outlined
                  :rules = "date2rules"
                ></v-text-field>
              </v-col>
            </v-row>
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
      dateRGX:/-?([0-9]{3}|[0-3][0-9]{3})-([0-9]|1[0-2])-([0-9]|[1][0-9]|[2][0-9]|3[0-1])/,
      menu: false,
      startDate:"",
      endDate:"",
      selectedMediums:[],
      date1rules:[v=>!v||(this.dateRGX.test(v)||"This value must be date") ,v=>!this.endDate||(new Date(v)<=new Date(this.endDate)||"First date must be before second.")],
      date2rules:[v=>!v||(this.dateRGX.test(v)||"This value must be date"),v=>!this.startDate||(new Date(this.startDate)<=new Date(v)||"Second date must be after first.")],
      filterArtists:{
        date1:null,
        date2:new Date(Date.now()),
        periods:[]
      },
      filterPaintings:{
        mediums:[]
      }
    };
  },

  computed:{
    ...mapGetters({
      artMovements: 'paintings/getArtMovements',
      mediums: 'paintings/getMediums',
    }),
  },
  methods: {
   
    apply(){
      this.filterArtists.date1 = new Date(Date.parse(this.startDate));
      this.filterArtists.date2 = new Date(Date.parse(this.endDate));
      if(!this.$refs.artistsForm||this.$refs.artistsForm.validate()){
        this.$store.commit("artists/setFilter", JSON.parse(JSON.stringify(this.filterArtists)) );
        this.$store.commit("paintings/setFilter", JSON.parse(JSON.stringify(this.filterPaintings)));
      }
      this.menu = false;
    },
    clear(){
      this.filterArtists={
        date1:null,
        date2:null,
        periods:[]
      };
      this.filterPaintings={
        mediums:[]
      }
      this.$refs.artistsForm.reset();
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
