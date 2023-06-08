<template>
  <div class="btn-week">
    <input
        v-for="(label, index) in weeksLabels"
        :key="index"
        type="radio"
        :id="`radio-${index + 1}`"
        name="weeks"
        @click="dayToday(weekCodes[index])"
        :value="index + 1"
    />
    <label
        v-for="(label, index) in weeksLabels"
        :key="index"
        :class="['radio-week', label.toLowerCase()]"
        :for="`radio-${index + 1}`"
    >
      {{ label }}
    </label>
    <div class="glider"></div>
  </div>
</template>


<script>
import {
  eachDayOfInterval,
  formatISO, startOfWeek, subWeeks,
} from "date-fns";

export default {
  name: "ButtonWeek",
  data: () => ({
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    sad: new Date(),
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    weeksLabels: ['ПРОШЛАЯ', 'ТЕКУЩАЯ', 'СЛЕДУЮЩАЯ'],
    weekCodes: ['p', 'c', 'f']
  }),
  methods: {
    previousWeek() {
      const startDate = startOfWeek(subWeeks(new Date(), 1));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      const dates = eachDayOfInterval({start: startDate, end: endDate});
      this.mon = dates[1];
      this.tue = dates[2];
      this.wed = dates[3];
      this.thu = dates[4];
      this.fri = dates[5];
      this.sat = dates[6];
      this.dayTransfer();
    },
    nextWeek() {
      const startDate = startOfWeek(subWeeks(new Date(), -1));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      const dates = eachDayOfInterval({start: startDate, end: endDate});
      this.mon = dates[1];
      this.tue = dates[2];
      this.wed = dates[3];
      this.thu = dates[4];
      this.fri = dates[5];
      this.sat = dates[6];
      this.dayTransfer();
    },
    currentWeek() {
      this.days.forEach((day, index) => {
        this[day] = new Date(this.sad);
        this[day].setDate(this.sad.getDate() - this.sad.getDay() + index + 1);
      });
      this.dayTransfer();
    },
    dayUpdate() {
      let currentDay = document.querySelectorAll('input[name="days"]')
      for (let dayC of currentDay) {
        if (dayC.checked == true) {
          if (dayC.value == this.$store.state.mon.getDay()) {
            dayC.checked = true;
            this.$store.state.transfers = formatISO(this.$store.state.mon, {representation: 'date'})
          } else if (dayC.value == this.$store.state.tue.getDay()) {
            dayC.checked = true;
            this.$store.state.transfers = formatISO(this.$store.state.tue, {representation: 'date'})
          } else if (dayC.value == this.$store.state.wed.getDay()) {
            dayC.checked = true;
            this.$store.state.transfers = formatISO(this.$store.state.wed, {representation: 'date'})
          } else if (dayC.value == this.$store.state.thu.getDay()) {
            dayC.checked = true;
            this.$store.state.transfers = formatISO(this.$store.state.thu, {representation: 'date'})
          } else if (dayC.value == this.$store.state.fri.getDay()) {
            dayC.checked = true;
            this.$store.state.transfers = formatISO(this.$store.state.fri, {representation: 'date'})
          } else if (dayC.value == this.$store.state.sat.getDay()) {
            dayC.checked = true;
            this.$store.state.transfers = formatISO(this.$store.state.sat, {representation: 'date'})
          }
        }
      }
    },
    sundayWeek() {
      if (this.sad.getDay() == 0) {
        let next = document.querySelector('#radio-3')
        next.checked = true;
      } else {
        let current = document.querySelector('#radio-2')
        current.checked = true;
      }
    },
    dayToday(e) {
      if (e === 'p') {
        this.previousWeek()
        this.dayUpdate()
      } else if (e === 'f') {
        this.nextWeek()
        this.dayUpdate()
      } else if (e === 'c') {
        this.currentWeek()
        this.dayUpdate()
      }
    },
    dayTransfer() {
      this.$store.state.mon = this.mon
      this.$store.state.tue = this.tue
      this.$store.state.wed = this.wed
      this.$store.state.thu = this.thu
      this.$store.state.fri = this.fri
      this.$store.state.sat = this.sat
    }
  },
  mounted() {
    if (this.sad.getDay() == 0) {
      this.nextWeek()
    } else {
      this.currentWeek()
    }
    this.sundayWeek()
  }
}
</script>

<style scoped>
.btn-week {
  display: grid;
  grid-template:
      [row1-start] "past current future" 60px [row1-end]
      [row2-start] "glider glider glider" 3px [row2-end]
      / 1fr 1fr 1fr;
  align-items: center;
  margin-bottom: 10px;
  justify-items: center;
  transition: all .5s ease-out;
}

.radio-week {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  font-size: clamp(15px, 1.7vw, 22px);
}

.glider {
  grid-area: glider;
  height: 3px;
  width: 33.3%;
  background-color: var(--dark-main);
  border-radius: 100px;
  transition: all .5s ease-out;
}

input[type="radio"] {
  display: none;
}

input[id=radio-1]:checked ~ .glider {
  transition: all .3s ease-out;
  margin-right: 66.6%;
}

input[id=radio-2]:checked ~ .glider {
  transition: all .3s ease-out;
  margin: 0 50%;
}

input[id=radio-3]:checked ~ .glider {
  transition: all .3s ease-out;
  margin-left: 66.6%;
}
</style>
