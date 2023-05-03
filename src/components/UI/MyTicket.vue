<template>
  <div v-for="ticket in lesson" :key="ticket">
      <v-row class="ticket" v-if="(($store.state.searchQyery === (ticket.teacher.last_name + ' ' + ticket.teacher.first_name + ' ' + ticket.teacher.middle_name) && (ticket.date === $store.state.transfers)) || (($store.state.searchQyery === ticket.group.group_name) && (ticket.date === $store.state.transfers)) || (($store.state.searchQyery === ticket.cabinet.cabinet_name) && (ticket.date === $store.state.transfers)))">
        <v-col class="ticket-number">
          <div class="ticket-time">{{ ticket.number.starttimelesson.substr(0, 5) }}
            {{ ticket.number.endtimelesson.substr(0, 5) }}
          </div>
          <div class="ticket-number-num">{{ ticket.number.numberlesson_name }}</div>
        </v-col>
        <v-col class="ticket-theme">{{ ticket.theme.theme_name }}</v-col>
        <v-col cols="4" class="ticket-teacher">{{ ticket.teacher.last_name }} {{ ticket.teacher.first_name }} {{ ticket.teacher.middle_name }}</v-col>
        <v-col cols="2" class="ticket-group">{{ ticket.group.group_name }}</v-col>
        <v-col cols="1" class="ticket-group">{{ ticket.subgroup.subgroups_name }}</v-col>
        <v-col cols="1" class="ticket-cabinet">{{ ticket.cabinet.cabinet_name }}</v-col>
      </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyTicket",
  components: {},
  data: () => ({
    lesson: '',
    SessonSort: '',
    'api': 'https://jaronimo.pythonanywhere.com/api/lessonlist/',
  }),
  methods: {
    getTeachers() {
      axios.get(this.api).then(
          response => {
            this.lesson = response.data;
          }
      ).catch(error => {
        console.log(error)
      })
    },
  },
  created() {
    this.getTeachers()
  }
}
</script>

<style>
.ticket {
  flex-wrap: nowrap;
  background: #F6F6F6;
  border-radius: 20px;
  height: 90px;
  width: 100%;
  filter: drop-shadow(0px 4px 4px rgba(114, 114, 114, 0.25));
  margin: 10px 0 0;
  transition: all .5s ease-out;
}

.dark .ticket {
  background: #42464D;
  filter: none;
  color: #F6F6F6;
}

.ticket:hover .ticket-time {
  display: flex;
}

.ticket:hover .ticket-number-num {
  display: none;
}

.ticket:hover .ticket-number {
  background-color: #FF820C;
  color: #F6F6F6;
}

.dark .ticket:hover .ticket-number {
  background-color: #FF7B51;
}

.ticket-time {
  color: #F6F6F6;
  display: none;
  flex-direction: column;
  font-size: 22px;
  font-weight: 700;
}

.ticket-number-num {
  font-size: 32px;
}

.ticket-number {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #FF820C;
  border-radius: 20px 50px 50px 20px;
  max-width: 90px;
  margin: 0 18px 0 0;
  padding: 0 12px;
  transition: all 0.3s ease;
}

.ticket-theme {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 20px;
}

.ticket-teacher {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 20px;
}

.ticket-group {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 20px;
}

.ticket-cabinet {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 20px;
}

.dark .ticket-number {
  border: 2px solid #FF7B51;
}
</style>
