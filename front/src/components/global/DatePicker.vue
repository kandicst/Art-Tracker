<template>
  <v-row >
    <v-col >
      <v-text-field
        ref="days"
        v-model="dayProp"
        :prepend-icon="icon"
        :hint="hint"
        :rules="ruleDay.concat(ruleEmpty)"
        @change="resetValidationDay()"
        type="number"
        label="Day"
      />
    </v-col>
    <v-col>
      <v-select 
      ref="mo" 
      :items="monthsOfYear" 
      v-model="monthProp"  
      @change="resetValidationMonth()" 
      label="Month" 
      :rules="rule.concat(ruleEmpty)" 
      />
    </v-col>
    <v-col>
      <v-text-field 
      ref="years" 
      v-model="yearProp" 
      @change="resetValidationYear()" 
      label="Year" 
      type="number" 
      :rules="ruleYear.concat(ruleEmpty)" 
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['day', 'month', 'year', 'icon', 'hint','rule','ruleDay','ruleYear'],
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
      ruleEmpty: [
        v => (this.day !== '' && this.month !== "" && this.year !== "" ||
              this.day === '' && this.month === "" && this.year === ""
              ) || "All fields of date must be aquired"
      ]
    };
  },
  methods:{
    resetValidationYear(){
      this.$refs.days.resetValidation();
      this.$refs.mo.resetValidation();
    },
    resetValidationDay(){
      this.$refs.years.resetValidation();
      this.$refs.mo.resetValidation();
    },
    resetValidationMonth(){
      this.$refs.days.resetValidation();
      this.$refs.years.resetValidation();
    }
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
