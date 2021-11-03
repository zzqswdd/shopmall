<template>
  <div class="back_top">
    <img src="@/assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.back_top {
  position: fixed;
  right: -28px;
  bottom: 55px;
}

.back_top img {
  width: 50%;
  height: 50%;
}
</style>