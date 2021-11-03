<template>
  <div class="goods_list_item" @click="itemClick">
    <img :src="goodsitem.show.img" alt="" @load="imageLoad" />
    <div class="goods_context">
      <p>{{ goodsitem.title }}</p>
      <div class="goods_text">
        <span class="price">￥{{ goodsitem.price }}</span>
        <span class="collect"> 收藏：{{ goodsitem.cfav }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/network/EventBus.js";
export default {
  name: "GoodsListItem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsitem.iid);
    },
  },
};
</script>

<style>
.goods_list_item {
  width: 48%;
  overflow: hidden;
  border-radius: 5px;
  font-size: 14px;
  padding-bottom: 10px;
}

.goods_context {
  padding: 5px;
}

.goods_context p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.goods_list_item img {
  padding-bottom: 5px;
  width: 100%;
  height: 300px;
}

.goods_text {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
}

.price {
  font-size: 16px;
  color: #f46;
}

.collect {
  text-align: center;
  border-radius: 8px;
  padding: 0 5px;
  color: #f46;
  background-color: #ffecef;
}
</style>