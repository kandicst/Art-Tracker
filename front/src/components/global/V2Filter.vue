<template>
  <v-menu v-model="menu" offset-y :close-on-content-click="false">
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
    <v-card class="px-4" width="600px">
      <v-container>
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
                  ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row >
          <v-col class="pt-8" cols="2">
            <label class="filter-label">Date</label>
          </v-col>

          <v-col cols="10">
            <v-row class="pl-4">
              <v-col cols="5">
                <v-text-field
                  placeholder="YYYY-MM-DD"
                  style="border-radius:0;"
                  single-line
                  dense
                  append-icon="mdi-calendar"
                  outlined
                ></v-text-field>
              </v-col>

                <span class="headline pt-3">-</span>

              <v-col cols="5">
                <v-text-field
                style="border-radius:0;"
                  placeholder="Today"
                  single-line
                  append-icon="mdi-calendar"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-text-filed></v-text-filed>

        <v-divider></v-divider>
      </v-container>
      <v-card-actions>
        <v-btn class="text-none red--text" text>Clear All Filters</v-btn>
        <v-spacer></v-spacer>

        <v-btn class="text-none" text @click="menu = false">Cancel</v-btn>
        <v-btn class="text-none" color="primary" text @click="menu = false"
          >Apply</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
    };
  },

  methods: {
    close() {
      console.log(this.menu);
      this.menu = false;
    },
  },

  computed: {
    ...mapGetters({
      artMovements: 'paintings/getArtMovements',
    }),
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
  color: black !important;
}
</style>
