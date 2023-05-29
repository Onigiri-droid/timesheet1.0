<template>
  <header>
    <div class="wrapper header-nav">
    <router-link to="/">
      <v-img class="logo" src="@/assets/img/logo.svg"></v-img>
    </router-link>
  <nav class="nav">
    <router-link to="/about">
      <v-btn class="btn" icon>
        <div class="nav-icon icon-create"></div>
      </v-btn>
    </router-link>
    <v-btn @click="darkMode" class="btn" icon>
      <div class="nav-icon icon-them"></div>
      </v-btn>
  </nav>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    darkMode() {
      const wasDarkmode = localStorage.getItem('darkmode') ==='true'
      localStorage.setItem('darkmode', !wasDarkmode)
      document.body.classList.toggle('dark', !wasDarkmode)
    }
  },
  created() {
    document.body.classList.toggle('dark', localStorage.getItem('darkmode') ==='true')
  }
}
</script>

<style scoped>
.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
}
.logo {
  width: 65px;
  height: 60px;
}
.nav {
  display: flex;
  gap: 40px;
}
.nav-icon {
  width: 40px;
  height: 40px;
}
.icon-them {
  background-image: url("@/assets/img/light.svg");
  transition: all .5s ease-in-out;
}
.dark .icon-them {
  background-image: url("@/assets/img/dark.svg");
}
.icon-create {
  background-image: url("@/assets/img/layers.svg");
}
.dark .icon-create {
  background-image: url("@/assets/img/layers_dark.svg");
}
.v-theme--light {
  border-radius: 50px;
}
.v-btn--variant-elevated {
    box-shadow: none;
}
</style>
