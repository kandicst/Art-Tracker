<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="dayProp"
        :prepend-icon="icon"
        :hint="hint"
        type="number"
        label="Day"
      />
    </v-col>
    <v-col>
      <v-select :items="monthsOfYear" v-model="monthProp" label="Month" />
    </v-col>
    <v-col>
      <v-text-field v-model="yearProp" label="Year" type="number" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['day', 'month', 'year', 'icon', 'hint'],
  data() {
    return {
      monthsOfYear: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    };
  },

  computed: {
    dayProp: {
      get() {
        return this.day;
      },
      set(val) {
        this.$emit('dayChanged', val);
      },
    },

    monthProp: {
      get() {
        return this.month;
      },
      set(val) {
        this.$emit('monthChanged', val);
      },
    },

    yearProp: {
      get() {
        return this.year;
      },
      set(val) {
        this.$emit('yearChanged', val);
      },
    },
  },
};
</script>

<style></style>
