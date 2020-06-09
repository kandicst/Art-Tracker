<template>
  <div class="ma-5">
    <v-data-table
      :headers="headers"
      :items="paintings"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Paintings</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}  <v-icon small color="green lighten-2" >mdi-palette-advanced</v-icon>
      </template>

      <template v-slot:header.created="{ header }">
        {{ header.text.toUpperCase() }}  <v-icon small color="orange lighten-2">mdi-palette</v-icon> 
      </template>

      <template v-slot:header.location="{ header }">
        {{ header.text.toUpperCase() }}  <v-icon small color="purple lighten-2">mdi-map-marker</v-icon>
      </template>

      <template v-slot:header.medium="{ header }">
        {{ header.text.toUpperCase() }}  <v-icon small color="red lighten-2" >mdi-brush</v-icon>
      </template>

      <template v-slot:header.artMovement="{ header }">
        {{ header.text.toUpperCase() }}  <v-icon small color="blue lighten-2">mdi-timer-sand</v-icon>
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
    data: () => ({
      dialog: false, 
      headers: [
        {
          text: 'Painting',
          align: 'start',
          value: 'name',
        },
        { text: 'Created', value: 'created' },
        { text: 'Location', value: 'location' },
        { text: 'Medium', value: 'medium' },
        { text: 'movement', value: 'artMovement' },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    }),

    computed: {
      
      ...mapGetters({
        paintings: 'paintings/getPaintings',
      }),
    },


    methods: {
      ...mapMutations('paintingsDialog', {
      openEditDialog: 'openEditDialog',
      }),

      ...mapActions({
      removePaintingAction: 'paintings/removePaintingAction'
      }),

      editItem (item) {
        this.openEditDialog(Object.assign({},item));
      },

      deleteItem (item) {
        this.removePaintingAction(Object.assign({}, this.item));
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
          Object.assign(this.paintings[this.editedIndex], this.editedItem)
        } else {
          this.paintings.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>


</style>
