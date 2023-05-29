<template>
  <div v-for="(tickets, numberlesson_name) in groupedTickets" :key="numberlesson_name" class="ticket">
    <v-row v-for="ticket in tickets" :key="ticket.id" class="ticket-row">
      <!-- Теперь здесь выводятся два объекта с одинаковым значением ticket.number.numberlesson_name -->
      <v-col class="ticket-number">
        <div class="ticket-time">{{ ticket.number.starttimelesson.substr(0, 5) }}
          {{ ticket.number.endtimelesson.substr(0, 5) }}
        </div>
        <div class="ticket-number-num">
          <div class="number-num">{{ ticket.number.numberlesson_name }}</div>
          <div class="number-short">{{ ticket.number.short }}</div>
        </div>
      </v-col>
      <v-col class="ticket-theme">{{ ticket.theme.theme_name }}</v-col>
      <v-col cols="4" class="ticket-teacher">{{ ticket.teacher.last_name }} {{ ticket.teacher.first_name }}
        {{ ticket.teacher.middle_name }}
      </v-col>
      <v-col cols="2" class="ticket-group">{{ ticket.group.group_name }}</v-col>
      <v-col cols="1" class="ticket-subgroup">{{ ticket.subgroup.subgroups_name }}</v-col>
      <v-col cols="1" class="ticket-cabinet">{{ ticket.cabinet.cabinet_name }}</v-col>
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
    lazy: 'Пар нет, ленимся дальше 😪',
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
      const searchDates = this.$store.state.searchDates;
      const teacherFullName = ticket.teacher.last_name + ' ' + ticket.teacher.first_name + ' ' + ticket.teacher.middle_name;

      return (searchQuery === teacherFullName && ticket.date === searchDates) ||
          (searchQuery === ticket.group.group_name && ticket.date === searchDates) ||
          (searchQuery === ticket.cabinet.cabinet_name && ticket.date === searchDates);
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
  },
}
</script>

<style scoped>

</style>
