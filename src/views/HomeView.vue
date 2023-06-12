<template>
  <div class="wrapper">
    <my-search></my-search>
    <button-week></button-week>
    <button-day></button-day>
    <my-ticket></my-ticket>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import mySearch from "@/components/UI/MySearch";
import myTicket from "@/components/UI/MyTicket";
import ButtonWeek from "@/components/UI/ButtonWeek";
import ButtonDay from "@/components/UI/ButtonDay";

export default defineComponent({
  name: 'HomeView',
  setup() {
    const setTitle = (title) => {
      document.title = title;
    }
    setTitle("Расписание");
  },
  components: {
    mySearch,
    myTicket,
    ButtonWeek,
    ButtonDay
  },
});
</script>
