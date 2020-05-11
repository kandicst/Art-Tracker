<template>
  <v-container class="top-cont px-6">
    <v-row>
      <v-col class="pl-8">
        <div class="display-1"> New painter</div>
      </v-col>
    </v-row>

    <v-form>
    <v-row class="mt-4">
      <v-col cols="8" class="pa-0">
        <v-text-field
          label="Name"
          prepend-icon="mdi-map"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="8" class="pa-0">
        <v-text-field
          label="Place of birth"
          prepend-icon="mdi-map"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="8" class="pa-0">
        <v-text-field
          label="Nationality"
          prepend-icon="mdi-map"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="8" class="pa-0">
        <v-text-field
          label="Nationality"
          prepend-icon="mdi-map"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="8" class="pa-0">
        <v-text-field
          label="Nationality"
          prepend-icon="mdi-map"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="8" class="pa-0">
        <v-select
            :items="artMovements"
            menu-props="auto"
            label="Art movement"
            hide-details
            prepend-icon="mdi-map"
            single-line
          ></v-select>
      </v-col>
    </v-row>

    </v-form>
    <v-row class="mt-12">
      <v-col cols="6" class="pa-0" align="center" justify="begin">
        <v-btn class="blue white--text">Submit</v-btn>
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
export default {

  data() {
    return {
      artMovements : [
        'Classicism', 'Post-Impressionism', 'Impressionism',
        'Cubism', 'Romanticism', 'Gothic', 'Baroque', 'Modern', 
        'Renaissance', 'Humanism'
      ]
    }
  }

}
</script>

<style scoped>

.top-cont{
}


</style>