<template>
  <v-combobox :items="mySearch" label="Выберите параметр" variant="solo" item-value="id" clearable v-model="this.$store.state.searchQuery"></v-combobox>
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
    handleError(error) {
      console.log(error);
    },
    async fetchData(apiEndpoint, dataProcessor) {
      try {
        const response = await axios.get(this.api + apiEndpoint);
        dataProcessor(response);
      } catch (error) {
        this.handleError(error);
      }
    },
    async getGroups() {
      return new Promise(resolve => {
        this.fetchData('group', response => {
          let groups = response.data.map(item => item.group_name);
          resolve(groups);
        });
      });
    },
    async getTeachers() {
      return new Promise(resolve => {
        this.fetchData('teacher', response => {
          let teachers = response.data.map(item =>
              item.last_name + " " + item.first_name + " " + item.middle_name
          );
          resolve(teachers.sort());
        });
      });
    },
    async getCabinets() {
      return new Promise(resolve => {
        this.fetchData('cabinet', response => {
          let cabinets = response.data.map(item => item.cabinet_name);
          resolve(cabinets);
        });
      });
    },
  },
  mounted() {
    if (localStorage.search && localStorage.search !== 'null') {
      this.$store.state.searchQuery = localStorage.search;
    }
  },
  watch: {
    '$store.state.searchQuery'(newName) {
      if (newName !== null) {
        localStorage.search = newName;
      } else {
        localStorage.removeItem('search');
      }
    }
  },
  async created() {
    const [groups, teachers, cabinets] = await Promise.all([
      this.getGroups(),
      this.getTeachers(),
      this.getCabinets()
    ]);

    this.mySearch = [...groups, ...teachers, ...cabinets];
  }
}
</script>

<style>
.v-menu {
  border-radius: 200px;
}
.v-input__control {
  height: 70px;
  margin-bottom: 20px;
}
.v-field__input {
  font-size: clamp(16px, 1.7vw, 22px);
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
