<template>
  <v-card class="d-inline-block mx-auto rounded-card" min-width="275px">
    <v-container class="ma-0 pa-0">
      <v-row style="max-height:150px;">
        <v-col class="ma-0 pa-0">
          <v-img
            v-if="artist.img"
            class="rounded-card"
            height="150"
            width="275"
            :src="artist.img"
          ></v-img>
          <avatar
            v-else
            class="avatar-image rounded-card"
            color="steelblue"
            :radius="0"
            :fullname="artist.name"
          >
          </avatar>
        </v-col>
      </v-row>

      <v-card-title>{{ artist.name }}</v-card-title>

      <v-card-subtitle style="text-align:left;">
        {{ artist.birthday.month }} {{ artist.birthday.day }},
        {{ artist.birthday.year }}
        <span v-if="artist.death.day">
          - {{ artist.death.month }} {{ artist.death.day }}, 
          {{ artist.death.year }}
        </span>
      </v-card-subtitle>

      <v-card-text>
        <v-row class="ma-0 pa-0">
          <v-icon class="mr-2" color="red lighten-2">mdi-home-city</v-icon>
          {{ artist.birthplace }}
        </v-row>

        <v-row class="ma-0 pa-0 mt-2">
          <v-col cols="5" align="start" class="ma-0 pa-0">
            <v-icon class="mr-1" color="red lighten-2">mdi-flag</v-icon>
            {{ artist.nationality }}
          </v-col>
          <v-col cols="7" class="ma-0 pa-0">
            <v-icon class="mr-0" color="red lighten-2">mdi-timer-sand</v-icon>
            {{ artist.artMovement }}
          </v-col>
        </v-row>
      </v-card-text>

      <!-- <v-card-actions>
        <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions> -->
    </v-container>
  </v-card>
</template>

<script>
import Avatar from 'vue-avatar-component';
export default {
  components: {
    Avatar,
  },
  props: ['artist'],
};
</script>

<style scoped>
.rounded-card {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}

.avatar-image {
  width: 275px!important;
  height: 150px!important;
  font-size: 56px!important;
}

.iconify {
  width: 24px;
  height: 20px;
}
</style>
