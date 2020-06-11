<template>
  <div class="mx-0 my-5" >
    <v-data-table
      :headers="headers"
      :items="artists"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Artists</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.death="{ item }">
        <span v-if="item.death.day != ''">

        {{ item.death.month }}
        {{ item.death.day }}
        {{ item.death.year }}
        </span>
        <span v-else>Alive</span>
      </template>

      <template v-slot:item.birthday="{ item }">

        {{ item.birthday.month }}
        {{ item.birthday.day }}
        {{ item.birthday.year }}
      </template>


      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
      dialog: false, 
      headers: [
        {
          text: 'Artist',
          align: 'start',
          value: 'name',
        },
        { text: 'Birth', value: 'birthday' },
        { text: 'Place', value: 'birthplace' },
        { text: 'Death', value: 'death' },
        { text: 'Movement', value: 'artMovement' },
        { text: 'ACTIONS', value: 'actions', sortable: false },
      ]
    }
  },

  computed: {
      
      ...mapGetters({
        artists: 'artists/getArtists',
      }),
    },


    methods: {
      ...mapMutations('artistsDialog', {
      openEditDialog: 'openEditDialog',
      }),

      ...mapActions({
      removeArtistAction: 'artists/removeArtistAction'
      }),

      editItem (item) {
        this.openEditDialog(item);
      },

      deleteItem (item) {
        this.removeArtistAction(Object.assign({}, this.item));
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.artists[this.editedIndex], this.editedItem)
        } else {
          this.paintings.push(this.editedItem)
        }
        this.close()
      },
    },
};
</script>

<style></style>
