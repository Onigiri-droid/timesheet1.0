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
  column-gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.my-search {
  width: 100%;
  max-width: 565px;
}
.archive-search {
  width: 100%;
  max-width: 565px;
}

@media (max-width: 1267px) {
  .my-search {
    max-width: none;
    height: 70px;
  }
  .archive-search {
    max-width: none;
  }
}
</style>
