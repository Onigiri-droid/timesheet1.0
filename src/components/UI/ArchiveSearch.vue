<template>
  <v-combobox
      :items="myDates"
      label="Введите дату"
      variant="solo"
      item-value="id"
      clearable
      v-model="$store.state.searchDates"
  ></v-combobox>
</template>

<script>
import axios from "axios";

export default {
  name: "ArchiveSearch",
  data: () => ({
    myDates: '',
    'api': 'https://jaronimo.pythonanywhere.com/api/lessonlist/',
  }),
  methods: {
    async getDates() {
      axios.get(this.api).then(
          response => {
            let dates = response.data.map(item => item.date);
            this.myDates = [...new Set(dates)];
          }
      ).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    this.getDates();
  }
}
</script>

<style scoped>

</style>
