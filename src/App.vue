<template>
  <v-app>
    <header-app></header-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import headerApp from "@/components/HeaderApp";

export default {
  name: 'App',
  components: {
    headerApp
  },
}
</script>

<style>

</style>
