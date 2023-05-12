import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    searchQuery:'',
    searchDates: '',
    transfers: '',
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    startFunc: '',
  }),
  getters: {
    // mounted() {
    //   if (localStorage.search) {
    //     this.state.searchQuery = localStorage.search;
    //   }
    // },
    // watch: {
    //   $store.state.searchQuery(newName) {
    //     localStorage.search = newName;
    //   }
    // }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
