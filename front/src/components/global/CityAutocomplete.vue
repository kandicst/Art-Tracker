<template>
  <v-autocomplete
    v-model="locationProp"
    :disabled="isUpdating"
    :items="getEntries"
    :search-input.sync="search"
    :loading="isLoading"
    :rules="ruleRequired"
    hide-no-data
    hide-selected
    label="Location"
    prepend-icon="mdi-home-city"
    item-text="name"
  >
  </v-autocomplete>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  props: ['location', ],
  data() {
    return {
      ruleRequired: [v => !!v || 'Required field'],
      isLoading: false,
      isUpdating: false,
      model: null,
      search: null,
    };
  },

  methods: {
    ...mapActions({
      searchEntries: 'autocomplete/search',
      deleteUnused: 'autocomplete/deleteUnused',
    }),
  },

  computed: {
    ...mapGetters({
      getEntries: 'autocomplete/getEntries',
    }),

    locationProp: {
      get() {
        return this.location;
      },
      set(val) {
        this.$emit('locationChanged', val);
      },
    },
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },

    async search(val) {
      if (!val) return;
      await this.searchEntries(val);
    },

    async location(val) {
      if (val && this.getEntries.filter(loc => loc == val).length == 0)
        await this.getEntries.push(val);
    },
  },
};
</script>

<style></style>
