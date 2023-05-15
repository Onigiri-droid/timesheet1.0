<template>
  <div class="btn-day">
    <input type="radio" id="day-1" name="days" @click="daySearch(1)" value="1"/>
    <label class="radio-day monday" for="day-1">ПН</label>

    <input type="radio" id="day-2" name="days" @click="daySearch(2)" value="2"/>
    <label class="radio-day tuesday" for="day-2">ВТ</label>

    <input type="radio" id="day-3" name="days" @click="daySearch(3)" value="3"/>
    <label class="radio-day wednesday" for="day-3">СР</label>

    <input type="radio" id="day-4" name="days" @click="daySearch(4)" value="4"/>
    <label class="radio-day thursday" for="day-4">ЧТ</label>

    <input type="radio" id="day-5" name="days" @click="daySearch(5)" value="5"/>
    <label class="radio-day friday" for="day-5">ПТ</label>

    <input type="radio" id="day-6" name="days" @click="daySearch(6)" value="6"/>
    <label class="radio-day saturday" for="day-6">СБ</label>
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
    weekDay: new Date().getDay(),
    transfer: '',
  }),
  methods: {
    daySearch(e) {
      if (e == this.$store.state.mon.getDay()) {
        this.$store.state.transfers = formatISO(this.$store.state.mon, {representation: 'date'})
      } else if (e == this.$store.state.tue.getDay()) {
        this.$store.state.transfers = formatISO(this.$store.state.tue, {representation: 'date'})
      } else if (e == this.$store.state.wed.getDay()) {
        this.$store.state.transfers = formatISO(this.$store.state.wed, {representation: 'date'})
      } else if (e == this.$store.state.thu.getDay()) {
        this.$store.state.transfers = formatISO(this.$store.state.thu, {representation: 'date'})
      } else if (e == this.$store.state.fri.getDay()) {
        this.$store.state.transfers = formatISO(this.$store.state.fri, {representation: 'date'})
      } else if (e == this.$store.state.sat.getDay()) {
        this.$store.state.transfers = formatISO(this.$store.state.sat, {representation: 'date'})
      } else {
        this.$store.state.transfers = formatISO(this.$store.state.mon, {representation: 'date'})
      }
    },
    dayActive() {
      let currentDay = document.querySelectorAll('input[name="days"]')
      if (this.weekDay == 0) {
        let sunday = document.querySelector('#day-1')
        sunday.checked = true;
      } else {
        for (let dayC of currentDay) {
          if (dayC.value == this.weekDay) {
            dayC.checked = true;
          }
        }
      }
    },
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
  padding: 12% 40%;
}

.btn-day label {
  cursor: pointer;
}

.monday {
  grid-area: monday;
}

.tuesday {
  grid-area: tuesday;
}

.wednesday {
  grid-area: wednesday;
}

.thursday {
  grid-area: thursday;
}

.friday {
  grid-area: friday;
}

.saturday {
  grid-area: saturday;
}

.glide {
  grid-area: glide;
  height: 3px;
  width: 150px;
  /*width: 50px;*/
  background-color: var(--dark-main);
  border-radius: 99px;
  transition: 0.3s ease-out;
}

input[type="radio"] {
  display: none;
}

input[type=radio]:checked + label {
  color: var(--main-color);
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
