<template>
  <div class="goods_list">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsitem="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem.vue";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods_list {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
}
</style>