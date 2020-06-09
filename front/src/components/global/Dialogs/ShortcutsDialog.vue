<template>
    

    <v-card>
      <v-card-title>Shortcuts</v-card-title>
      <v-container>
      <v-row>

      <v-col  align="center" class="ma-4 pa-0" cols=5>
          <v-data-table
            dense
            :items="tables[0].shortcuts"
            :headers="headers"
            hide-default-header
            hide-default-footer
    
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>{{tables[0].title}}</v-toolbar-title>
              </v-toolbar>
              <hr bold/>
            </template>

            <template v-slot:item.combination="{ item }">
              {{item.combination}} <v-icon v-if="item.icon" small>{{item.icon}}</v-icon>
            </template>


          </v-data-table>
        </v-col>
        <v-col  align="center" class="ma-4 pa-0" cols=5>
          <v-data-table
            dense
            :items="tables[1].shortcuts"
            :headers="headers"
            hide-default-header
            hide-default-footer
    
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>{{tables[1].title}}</v-toolbar-title>
              </v-toolbar>
              <hr bold/>
              
            </template>

            <template v-slot:item.combination="{ item }">
              {{item.combination}} <v-icon v-if="item.icon" small>{{item.icon}}</v-icon>
            </template>


          </v-data-table>
          <v-data-table
            dense
            :items="tables[2].shortcuts"
            :headers="headers"
            hide-default-header
            hide-default-footer
    
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>{{tables[2].title}}</v-toolbar-title>
              </v-toolbar>
              <hr bold/>
              
            </template>

            <template v-slot:item.combination="{ item }">
              {{item.combination}} <v-icon v-if="item.icon" small>{{item.icon}}</v-icon>
            </template>


          </v-data-table>
        </v-col>
      </v-row>
      </v-container>
    </v-card>
</template>

<script>
export default {
  data(){
    return{
      headers: [
        {
          align: 'start',
          value: 'combination',
        },
        {
          align: 'start',
          value: 'action',
        }
      ],
      tables: [
        {
          title: 'General',
          shortcuts: [
            { combination: 'ctrl +', icon: 'mdi-arrow-right', action: 'Go to painting tab'},
            { combination: 'ctrl +', icon: 'mdi-arrow-left', action: 'Go to artist tab'},
            { combination: 'ctrl + ', icon: 'mdi-arrow-down', action: 'Switch to next map'},
            { combination: 'ctrl + ', icon: 'mdi-arrow-up', action: 'Switch to previuse map'},
            { combination: 'ctrl+alt+h', action: 'Show help dialog'},
            { combination: 'ctrl + alt +  n', action: 'Add artist/painting'},
            { combination: 'ctrl + alt + h', action: 'Show help dialog'},
            { combination: 'ctrl + alt + s', action: 'Show shortcut dialog'},
          ]
        },
        {
          title: 'Artist Dialog',
          shortcuts: [
            { combination: 'enter', action: 'Add/Change artist'},
            { combination: 'esc', action: 'Exit dialog'},
          ]
        },
        {
          title: 'Painting Dialog',
          shortcuts: [
            { combination: 'enter', action: 'Add/Change painting'},
            { combination: 'esc', action: 'Exit dialog'},
          ]
        },
      ],
    };
  },
  methods: {
    close(){
      this.$emit("zatvori");
    }
  },
  computed: {
    keymap() {
      return {
        esc: this.close,
      };
    },
  },
};
</script>

<style>
tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
 }
</style>
