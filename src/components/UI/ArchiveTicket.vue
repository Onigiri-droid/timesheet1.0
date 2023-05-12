<template>
  <div v-for="ticket in lesson" :key="ticket">
    <v-row class="ticket" v-if="(($store.state.searchQuery === (ticket.teacher.last_name + ' ' + ticket.teacher.first_name + ' ' + ticket.teacher.middle_name) && (ticket.date === $store.state.searchDates)) || (($store.state.searchQuery === ticket.group.group_name) && (ticket.date === $store.state.searchDates)) || (($store.state.searchQuery === ticket.cabinet.cabinet_name) && (ticket.date === $store.state.searchDates)))">
      <v-col class="ticket-number">
        <div class="ticket-time">{{ ticket.number.starttimelesson.substr(0, 5) }} {{ ticket.number.endtimelesson.substr(0, 5) }}</div>
        <div class="ticket-number-num"><div class="number-num">{{ ticket.number.numberlesson_name }}</div><div class="number-short">{{ ticket.number.short }}</div></div>
      </v-col>
      <v-col class="ticket-theme">{{ ticket.theme.theme_name }}</v-col>
      <v-col cols="4" class="ticket-teacher">{{ ticket.teacher.last_name }} {{ ticket.teacher.first_name }}
        {{ ticket.teacher.middle_name }}
      </v-col>
      <v-col cols="2" class="ticket-group">{{ ticket.group.group_name }}</v-col>
      <v-col cols="1" class="ticket-group">{{ ticket.subgroup.subgroups_name }}</v-col>
      <v-col cols="1" class="ticket-cabinet">{{ ticket.cabinet.cabinet_name }}</v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ArchiveTicket",
  components: {},
  data: () => ({
    lesson: '',
    'api': 'https://jaronimo.pythonanywhere.com/api/lessonlist/',
  }),
  methods: {
    async getTeachers() {
      axios.get(this.api).then(
          response => {
            this.lesson = response.data;
          }
      ).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getTeachers()
  }
}
</script>

<style scoped>

</style>
