<template>
    <v-dialog :value="dialog" width="50%" @click:outside="close" v-hotkey="keymap" :retain-focus="false">
    <v-card>
      <v-card-title v-if="type === 'add'">Add New Artist</v-card-title>
      <v-card-title v-else>Edit Existing Artist</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          DDDDDDDDIJALOG
          <!-- <v-select
            :items="getAppointmentTypes"
            v-model="priceList.appointmentTypeId"
            item-text="name"
            item-value="id"
            label="Appointment Type"
          />
          <v-text-field v-model="priceList.price" :rules="rules" label="Price" type="number"/> -->
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="add">Add</v-btn>
        <v-btn v-else color="primary" @click="update">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data()  {
    return {

    }
  },

  methods : {
    ...mapMutations("artistsDialog", {
      close: "closeDialog"
    }),

    add() {
      console.log('add')
    },

    update() {
      console.log('update');
    }
  },

  computed: {
    ...mapGetters({
      dialog: "artistsDialog/getShowDialog",
      artist: "artistsDialog/getDialogArtist",
      type: "artistsDialog/getDialogType",
    }),

    keymap () {
      return {
       'enter': this.add,
       'esc' : this.close,
      }
    }
  },
}
</script>

<style>

</style>