<template>
  <div class="wrapper">
    <div class="archive">
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
.archive{
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
.my-search {
  width: 100%;
}
.archive-search {
  width: 100%;
}

@media (max-width: 1267px) {
  .archive{
    flex-direction: column;
  }
}
</style>
