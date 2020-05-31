<template>
  <v-card
    class="d-inline-block mx-auto rounded-card"
    width="275px"
    hover
    @click="hover = true"
    @mouseleave="hover = false"
  >
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col class="ma-0 pa-0">
          <v-img
            class="rounded-card"
            height="200"
            width="275"
            :src="painting.img"
          ></v-img>
        </v-col>
      </v-row>

      <v-card-title>{{ painting.name }}</v-card-title>

      <v-card-subtitle style="text-align:left;">
        {{ painting.artist.name }}, {{ painting.created }}
      </v-card-subtitle>

      <v-card-text>
        <v-row class="ma-0 pa-0">
          <v-icon class="mr-2" color="red lighten-2">mdi-map-marker</v-icon>
          {{ painting.location }}
        </v-row>

        <v-row class="ma-0 pa-0 mt-2">
          <v-col cols="5" align="start" class="ma-0 pa-0">
            <v-icon class="mr-1" color="red lighten-2">mdi-brush</v-icon>
            {{ painting.medium }}
          </v-col>
          <v-col cols="7" class="ma-0 pa-0">
            <v-icon class="mr-0" color="red lighten-2">mdi-timer-sand</v-icon>
            {{ painting.artMovement }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="my-0 py-0" v-show="hover">
        <v-btn text class="text-none">Edit</v-btn>
        <v-btn text class="text-none" color="red">Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            {{ painting.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ['painting'],
  data() {
    return {
      show: false,
      hover: false,
    };
  },
};
</script>

<style scoped>
.rounded-card {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}

.iconify {
  width: 24px;
  height: 20px;
}
</style>
