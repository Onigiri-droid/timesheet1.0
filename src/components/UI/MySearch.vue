<template>
    <v-combobox :items="mySearch" label="Введите номер группы, кабинет или преподавателя" variant="solo" item-value="id" clearable v-model="this.$store.state.searchQuery"></v-combobox>
</template>

<script>
import axios from 'axios'

export default {
  name: "StudentView",
  data: () => ({
    mySearch: [],
      'api': 'https://jaronimo.pythonanywhere.com/api/lessonlist/',
  }),
  methods: {
    async getTeachers() {
      axios.get(this.api + 'teacher').then(
          response => {
            let teacher = response.data.map(item => item.last_name + ' ' + item.first_name + ' ' + item.middle_name);
            this.mySearch = teacher.sort()
          }
      ).catch(error => {
        console.log(error)
      })
    },
    async getGroups() {
      axios.get(this.api + 'group').then(
          response => {
            let groups = response.data.map(item => item.group_name);
            for (let group of groups) {
              this.mySearch.push(group);
            }
          }
      ).catch(error => {
        console.log(error)
      })
    },
    async getCabinets() {
      axios.get(this.api + 'cabinet').then(
          response => {
            let cabinets = response.data.map(item => item.cabinet_name);
            for (let cabinet of cabinets) {
              this.mySearch.push(cabinet);
            }
          }
      ).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    if (localStorage.search) {
      this.$store.state.searchQuery = localStorage.search;
    }
  },
  watch: {
    '$store.state.searchQuery'(newName) {
      localStorage.search = newName;
    }
  },
  created() {
    this.getTeachers();
    this.getGroups();
    this.getCabinets();
  }
}
</script>

<style>
.v-menu {
  border-radius: 200px;
}
.v-input__control {
  height: 70px;
}
.v-field__input {
  font-size: 21px;
}
.dark .v-field.v-field {
  color: #FAFAFA;
}
.v-field--variant-solo {
  background: transparent;
  border: 1px solid #727272;
  box-shadow: none;
  transition: all .5s ease-out;
}
/*цвет полей*/
.v-theme--light {
  background: transparent;
  border-radius: 20px;
}
.dark .v-theme--light {
  --v-theme-surface: 32,34,37;
  color: #F6F6F6;
  border-radius: 20px;
  --v-theme-on-surface-variant: 66, 70, 77;
}
.v-locale--is-ltr.v-menu>div{
  border-radius: 20px;
}
</style>

<!--Использовать Promise.all() для параллельного выполнения запросов к API. Это может сократить время ожидания и ускорить загрузку данных.-->
<!--Сохранять результаты запросов в кеше, чтобы не делать повторные запросы при повторном использовании приложения или при переходах между страницами.-->
<!--Использовать async/await вместо .then() и .catch() для более читаемого и удобного кода.-->
<!--Использовать map() вместо цикла for для более чистого и лаконичного кода.-->
