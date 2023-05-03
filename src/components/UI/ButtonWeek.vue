<template>
  <div class="btn-week">
    <input type="radio" id="radio-1" name="weeks" @click="dayToday('p')"/>
    <label class="btn-12 past" for="radio-1">ПРОШЛАЯ</label>

    <input type="radio" id="radio-2" name="weeks" @click="dayToday('c')" checked />
    <label class="btn-12 current" for="radio-2">ТЕКУЩАЯ</label>

    <input type="radio" id="radio-3" name="weeks" @click="dayToday('f')"/>
    <label class="btn-12 future" for="radio-3">СЛЕДУЮЩАЯ</label>
    <div class="glider"></div>
  </div>
</template>

<script>
import {
  isFriday,
  isMonday,
  isSaturday,
  isThursday,
  isTuesday,
  isWednesday,
  nextFriday,
  nextMonday, nextSaturday,
  nextThursday,
  nextTuesday,
  nextWednesday,
  previousFriday,
  previousMonday,
  previousSaturday,
  previousThursday,
  previousTuesday,
  previousWednesday
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
  }),
  methods: {
    previousWeek() {
      if (isMonday(this.sad)) {
        this.mon = previousMonday(this.sad)
        this.tue = previousTuesday(new Date())
        this.wed = previousWednesday(new Date())
        this.thu = previousThursday(new Date())
        this.fri = previousFriday(new Date())
        this.sat = previousSaturday(new Date())
        this.dayTransfer()
      } else if (isTuesday(this.sad)) {
        this.mon = previousMonday(previousMonday(new Date()))
        this.tue = previousTuesday(this.sad)
        this.wed = previousWednesday(new Date())
        this.thu = previousThursday(new Date())
        this.fri = previousFriday(new Date())
        this.sat = previousSaturday(new Date())
        this.dayTransfer()
      } else if (isWednesday(this.sad)) {
        this.mon = previousMonday(previousMonday(new Date()))
        this.tue = previousTuesday(previousTuesday(new Date()))
        this.wed = previousWednesday(this.sad)
        this.thu = previousThursday(new Date())
        this.fri = previousFriday(new Date())
        this.sat = previousSaturday(new Date())
        this.dayTransfer()
      } else if (isThursday(this.sad)) {
        this.mon = previousMonday(previousMonday(new Date()))
        this.tue = previousTuesday(previousTuesday(new Date()))
        this.wed = previousWednesday(previousWednesday(new Date()))
        this.thu = previousThursday(this.sad)
        this.fri = previousFriday(new Date())
        this.sat = previousSaturday(new Date())
        this.dayTransfer()
      } else if (isFriday(this.sad)) {
        this.mon = previousMonday(previousMonday(new Date()))
        this.tue = previousTuesday(previousTuesday(new Date()))
        this.wed = previousWednesday(previousWednesday(new Date()))
        this.thu = previousThursday(previousThursday(new Date()))
        this.fri = previousFriday(this.sad)
        this.sat = previousSaturday(new Date())
        this.dayTransfer()
      } else if (isSaturday(this.sad)) {
        this.mon = previousMonday(previousMonday(new Date()))
        this.tue = previousTuesday(previousTuesday(new Date()))
        this.wed = previousWednesday(previousWednesday(new Date()))
        this.thu = previousThursday(previousThursday(new Date()))
        this.fri = previousFriday(previousFriday(new Date()))
        this.sat = previousSaturday(this.sad)
        this.dayTransfer()
      }
    },
    nextWeek() {
        if (isMonday(this.sad)) {
          this.mon = nextMonday(nextMonday(this.sad))
          this.tue = nextTuesday(nextTuesday(new Date()))
          this.wed = nextWednesday(nextWednesday(new Date()))
          this.thu = nextThursday(nextThursday(new Date()))
          this.fri = nextFriday(nextFriday(new Date()))
          this.sat = nextSaturday(nextSaturday(new Date()))
          this.dayTransfer()
        } else if (isTuesday(this.sad)) {
          this.mon = nextMonday(new Date())
          this.tue = nextTuesday(this.sad)
          this.wed = nextWednesday(nextWednesday(new Date()))
          this.thu = nextThursday(nextThursday(new Date()))
          this.fri = nextFriday(nextFriday(new Date()))
          this.sat = nextSaturday(nextSaturday(new Date()))
          this.dayTransfer()
        } else if (isWednesday(this.sad)) {
          this.mon = nextMonday(new Date())
          this.tue = nextTuesday(new Date())
          this.wed = nextWednesday(this.sad)
          this.thu = nextThursday(nextThursday(new Date()))
          this.fri = nextFriday(nextFriday(new Date()))
          this.sat = nextSaturday(nextSaturday(new Date()))
          this.dayTransfer()
        } else if (isThursday(this.sad)) {
          this.mon = nextMonday(new Date())
          this.tue = nextTuesday(new Date())
          this.wed = nextWednesday(new Date())
          this.thu = nextThursday(this.sad)
          this.fri = nextFriday(nextFriday(new Date()))
          this.sat = nextSaturday(nextSaturday(new Date()))
          this.dayTransfer()
        } else if (isFriday(this.sad)) {
          this.mon = nextMonday(new Date())
          this.tue = nextTuesday(new Date())
          this.wed = nextWednesday(new Date())
          this.thu = nextThursday(new Date())
          this.fri = nextFriday(this.sad)
          this.sat = nextSaturday(nextSaturday(new Date()))
          this.dayTransfer()
        } else if (isSaturday(this.sad)) {
          this.mon = nextMonday(new Date())
          this.tue = nextTuesday(new Date())
          this.wed = nextWednesday(new Date())
          this.thu = nextThursday(new Date())
          this.fri = nextFriday(new Date())
          this.sat = nextSaturday(this.sad)
          this.dayTransfer()
        }
    },
    currentWeek() {
      if (isMonday(this.sad)) {
        this.mon = this.sad
        this.tue = nextTuesday(new Date())
        this.wed = nextWednesday(new Date())
        this.thu = nextThursday(new Date())
        this.fri = nextFriday(new Date())
        this.sat = nextSaturday(new Date())
        this.dayTransfer()
      } else if (isTuesday(this.sad)) {
        this.mon = previousMonday(new Date())
        this.tue = this.sad
        this.wed = nextWednesday(new Date())
        this.thu = nextThursday(new Date())
        this.fri = nextFriday(new Date())
        this.sat = nextSaturday(new Date())
        this.dayTransfer()
      } else if (isWednesday(this.sad)) {
        this.mon = previousMonday(new Date())
        this.tue = previousTuesday(new Date())
        this.wed = this.sad
        this.thu = nextThursday(new Date())
        this.fri = nextFriday(new Date())
        this.sat = nextSaturday(new Date())
        this.dayTransfer()
      } else if (isThursday(this.sad)) {
        this.mon = previousMonday(new Date())
        this.tue = previousTuesday(new Date())
        this.wed = previousWednesday(new Date())
        this.thu = this.sad
        this.fri = nextFriday(new Date())
        this.sat = nextSaturday(new Date())
        this.dayTransfer()
      } else if (isFriday(this.sad)) {
        this.mon = previousMonday(new Date())
        this.tue = previousTuesday(new Date())
        this.wed = previousWednesday(new Date())
        this.thu = previousThursday(new Date())
        this.fri = this.sad
        this.sat = nextSaturday(new Date())
        this.dayTransfer()
      } else if (isSaturday(this.sad)) {
        this.mon = previousMonday(new Date())
        this.tue = previousTuesday(new Date())
        this.wed = previousWednesday(new Date())
        this.thu = previousThursday(new Date())
        this.fri = previousFriday(new Date())
        this.sat = this.sad
        this.dayTransfer()
      }
    },
    dayToday(e) {
      if (e === 'p') {
        this.previousWeek()
      } else if (e === 'f') {
        this.nextWeek()
      } else if (e === 'c'){
        this.currentWeek()
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
    this.currentWeek()
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
  margin: 20px 0 10px;
  justify-items: center;
  transition: all .5s ease-out;
}
.btn-week label {
  cursor: pointer;
}
.past {
  grid-area: past;
}
.current {
  grid-area: current;
}
.future {
  grid-area: future;
}

.glider {
  grid-area: glider;
  height: 3px;
  width: 200px;
  background-color: var(--dark-main);
  border-radius: 99px;
  transition: all .5s ease-out;
}

input[type="radio"] {
  display: none;
}

input[type=radio]:checked + label {
  color: var(--main-color);
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
