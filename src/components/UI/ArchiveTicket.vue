<template>
  <div v-for="(tickets, numberlesson_name) in groupedTickets" :key="numberlesson_name" class="ticket">
    <v-row v-for="ticket in tickets" :key="ticket.id" class="ticket-row">
      <v-col class="ticket-number">
        <div class="ticket-time">{{ ticket.number.starttimelesson.substr(0, 5) }}
          {{ ticket.number.endtimelesson.substr(0, 5) }}
        </div>
        <div class="ticket-number-num">
          <div class="number-num">{{ ticket.number.numberlesson_name }}</div>
          <div class="number-short">{{ ticket.number.short }}</div>
        </div>
      </v-col>
      <v-col class="ticket-theme">{{ ticket.theme ? ticket.theme.theme_name : '' }}</v-col>
      <v-col cols="4" class="ticket-teacher">{{ ticket.teacher ? ticket.teacher.last_name : '' }}
        {{ ticket.teacher ? ticket.teacher.first_name : '' }}
        {{ ticket.teacher ? ticket.teacher.middle_name : '' }}
      </v-col>
      <v-col cols="2" class="ticket-group">{{ ticket.group.group_name }}</v-col>
      <v-col cols="1" class="ticket-subgroup">{{ ticket.subgroup ? ticket.subgroup.subgroups_name : '' }}</v-col>
      <v-col cols="1" class="ticket-cabinet">{{ ticket.cabinet ? ticket.cabinet.cabinet_name : '' }}</v-col>

      <v-col class="ticket-practice_name">{{ ticket.practice_name ? ticket.practice_name.practice_name : '' }}</v-col>
      <v-col cols="2" class="ticket-startpractice">{{ ticket ? ticket.startpractice : '' }}</v-col>
      <v-col cols="2" class="ticket-endpractice">{{ tickets ? ticket.endpractice : '' }}</v-col>
    </v-row>
  </div>
  <v-row class="lazy" v-show="filteredLesson.length === 0">{{ lazy }}</v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "MyTicket",
  components: {},
  data: () => ({
    lesson: [],
    'api': 'https://jaronimo.pythonanywhere.com/api/lessonlist/',
    lazy: 'Архив в ожидании 🗃️',
  }),
  methods: {
    async getLessons() {
      axios.get(this.api).then(
          response => {
            this.lesson = response.data;
          }
      ).catch(error => {
        console.log(error)
      })
    },
    checkVisibility(ticket) {
      const searchQuery = this.$store.state.searchQuery;
      const searchDates = this.$store.state.searchDates ? this.$store.state.searchDates.replace(/-/g, '.') : null;
      const teacherFullName = (ticket.teacher?.last_name || '') + ' ' + (ticket.teacher?.first_name || '') + ' ' + (ticket.teacher?.middle_name || '');
      const groupName = ticket.group?.group_name || '';
      const cabinetName = ticket.cabinet?.cabinet_name || '';
      const ticketDate = ticket.date ? ticket.date.replace(/-/g, '.') : null; // Перевод даты в формат с точками и проверка на null
      return ((searchQuery === teacherFullName && ticketDate === searchDates) ||
          (searchQuery === groupName && ticketDate === searchDates) ||
          (searchQuery === cabinetName && ticketDate === searchDates)) && searchDates && ticketDate;
    }
  },
  computed: {
    filteredLesson() {
      return this.lesson.filter(ticket => this.checkVisibility(ticket));
    },
    groupedTickets() {
      const groups = {};
      this.filteredLesson.forEach(ticket => {
        if (!groups[ticket.number.numberlesson_name]) {
          groups[ticket.number.numberlesson_name] = [];
        }
        groups[ticket.number.numberlesson_name].push(ticket);
      });
      return groups;
    },
  },
  mounted() {
    this.getLessons()
  }
}
</script>

<style scoped></style>
