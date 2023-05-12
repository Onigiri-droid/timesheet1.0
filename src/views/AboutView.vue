<template>
  <div class="wrapper">
    <div class="archiv-search">
      <my-search class="my-search"></my-search>
      <archive-search class="archive-search"></archive-search>
    </div>
    <archive-ticket></archive-ticket>
  </div>
</template>

<script>
import mySearch from "@/components/UI/MySearch";
import archiveSearch from "@/components/UI/ArchiveSearch";
import archiveTicket from "@/components/UI/ArchiveTicket";

export default {
  name: 'AboutView',

  components: {
    mySearch,
    archiveSearch,
    archiveTicket,
  },

  data: () => ({
  }),
}
</script>

<style scoped>
.archiv-search {
  display: flex;
  gap: 40px;
}
.my-search {
  width: 100%;
}
.archive-search {
  width: 100%;
}
</style>
