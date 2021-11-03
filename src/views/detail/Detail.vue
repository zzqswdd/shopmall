<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import { getDetail } from "@/network/detail.js";
import DetailNavBar from "@/views/detail/clidComps/DetailNavBar.vue";
export default {
  name: "Detail",
  components: { DetailNavBar },

  data() {
    return {
      iid: null,
    };
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const res = await getDetail(this.iid);
      console.log(res);
    },
  },
};
</script>

<style>
</style>