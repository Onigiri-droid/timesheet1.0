<template>
  <div class="btn-day">
    <input
        v-for="(label, index) in daysLabels"
        :key="index"
        type="radio"
        :id="`day-${index + 1}`"
        name="days"
        @click="daySearch(index + 1)"
        :value="index + 1"
    />
    <label
        v-for="(label, index) in daysLabels"
        :key="index"
        :class="['radio-day', label.toLowerCase()]"
        :for="`day-${index + 1}`"
    >
      {{ label }}
    </label>
    <div class="glide"></div>
  </div>
</template>

<script>
import {formatISO} from "date-fns";

export default {
  name: "ButtonDay",
  data: () => ({
    days: '',
    'api': 'https://jaronimo.pythonanywhere.com/api/lessonlist/',
    daysLabels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    weekDay: new Date().getDay(),
    transfer: '',
  }),
  methods: {
    daySearch(e) {
      const days = [
        this.$store.state.mon,
        this.$store.state.tue,
        this.$store.state.wed,
        this.$store.state.thu,
        this.$store.state.fri,
        this.$store.state.sat
      ];
      const day = days.find(day => day.getDay() === e) || this.$store.state.mon;
      this.$store.state.transfers = formatISO(day, { representation: 'date' });
    },
    dayActive() {
      const checkedDay = this.weekDay === 0 ? 1 : this.weekDay;
      const dayToCheck = document.querySelector(`#day-${checkedDay}`);
      if (dayToCheck) dayToCheck.checked = true;
    }
  },
  mounted() {
    this.dayActive();
    this.daySearch(this.weekDay)
  },
}
</script>

<style scoped>
.btn-day {
  display: grid;
  grid-template:
      [row1-start] "monday tuesday wednesday thursday friday saturday" 60px [row1-end]
      [row2-start] "glide glide glide glide glide glide" 3px [row2-end]
      / 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  margin: 0 0 40px;
  justify-items: center;
  transition: 0.3s ease-out;
}
.radio-day {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  font-size: clamp(15px, 1.7vw, 22px);
}
.glide {
  grid-area: glide;
  height: 3px;
  width: 16.67%;
  background-color: var(--dark-main);
  border-radius: 100px;
  transition: 0.3s ease-out;
}
input[type="radio"] {
  display: none;
}
input[id=day-1]:checked ~ .glide {
  transition: all .3s ease-out;
  margin-right: 83.3%;
}
input[id=day-2]:checked ~ .glide {
  transition: all .3s ease-out;
  margin-right: 50%;
}
input[id=day-3]:checked ~ .glide {
  transition: all .3s ease-out;
  margin-right: 16.6%;
}
input[id=day-4]:checked ~ .glide {
  transition: all .3s ease-out;
  margin-left: 16.6%;
}
input[id=day-5]:checked ~ .glide {
  transition: all .3s ease-out;
  margin-left: 50%;
}
input[id=day-6]:checked ~ .glide {
  transition: all .3s ease-out;
  margin-left: 83.3%;
}
</style>
