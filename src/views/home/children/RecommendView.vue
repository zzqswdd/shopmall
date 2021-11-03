<template>
  <div class="recommend_view">
    <div v-for="item in recommends" :key="item.sort" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend_view {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}

.recommend_item {
  flex: 1;
}

.recommend_item img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
</style>