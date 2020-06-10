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
                      v-model="date1"
                      label="First date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date1" @input="menu1 = false"></v-date-picker>
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
                      v-model="date2"
                      label="Second date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-select>
              
            </v-select>
          </v-container>
         
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          :flat="true"
        >
          <v-container>
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
                      v-model="date3"
                      label="First date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date3" @input="menu3 = false"></v-date-picker>
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
                      v-model="date4"
                      label="Second date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date4" @input="menu4 = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
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
        <v-btn class="text-none red--text" text>Clear All Filters</v-btn>
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
      date1 :"",
      date2 :"",
      date3 :"",
      date4 :"",
    };
  },

  methods: {
    apply(){
      
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
