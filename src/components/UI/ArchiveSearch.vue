<template>
  <v-combobox :items="myDates" label="Введите дату" variant="solo" item-value="id" clearable v-model="$store.state.searchDates"></v-combobox>
</template>

<script>
import axios from "axios";

export default {
  name: "ArchiveSearch",
  data: () => ({
    myDates: [],
    'api': 'https://jaronimo.pythonanywhere.com/api/lessonlist/',
  }),
  methods: {
    async getDates() {
      axios.get(this.api).then(response => {
            let dates = response.data.map(item => {
              let date = item.date;
              return date;
            });
            let nonEmptyDates = dates.filter(date => date !== null); // Исключение пустых значений
            let uniqueDates = [...new Set(nonEmptyDates)]; // Удаление дубликатов
            // Сортировка дат от недавнего к давнему
            this.myDates = uniqueDates
                .sort((a, b) => {
                  return new Date(b) - new Date(a);
                })
                .map(date => date.replace(/-/g, '.')); // Замена дефисов на точки
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  async created() {
    this.getDates();
  }
}
</script>

<style scoped>
</style>

