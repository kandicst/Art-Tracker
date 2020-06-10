<template>
  <v-card
    class="d-inline-block mx-auto rounded-card"
    width="275px"
    hover
    @click="
      hover = !hover;
      show = false;
    "
    @mouseleave="
      hover = false;
      show = false;
    "
  >
    <v-container class="ma-0 pa-0">
      <v-row style="height:200px;">
        <v-col class="ma-0 pa-0">
          <v-img
            v-if="artist.img"
            class="rounded-card"
            height="200"
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
      <v-card-actions class="my-0 py-0" v-show="hover">
        <v-btn text @click.stop="openEditDialog" class="text-none">Edit</v-btn>
        <v-btn text @click.stop="openDeleteDialog" class="text-none" color="red"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import Avatar from 'vue-avatar-component';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { bus } from '@/main';

export default {
  components: {
    Avatar,
  },
  props: ['artist'],
  data() {
    return {
      show: false,
      hover: false,
    };
  },

  methods: {
    ...mapGetters({}),

    openEditDialog() {
      bus.$emit('openArtistDialog', {
        artist: this.artist,
        type: 'edit',
        key: this.artist['.key'],
      });
    },

    openDeleteDialog() {
      bus.$emit('onDelete', {
        type: 'Artist',
        object: this.artist,
        key: this.artist['.key'],
      });
    },
  },
};
</script>

<style scoped>
.rounded-card {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}

.avatar-image {
  width: 275px !important;
  height: 200px !important;
  font-size: 64px !important;
}

.iconify {
  width: 24px;
  height: 20px;
}
</style>
