<template>
  <div>
    <nar-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg" alt="" />
        </div>
      </template>

      <template v-slot:center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="index"
            class="title_item"
            :class="{ active: index === currentIndex }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nar-bar>
  </div>
</template>

<script>
import NarBar from "@/components/common/navbar/NarBar.vue";
export default {
  name: "DetailNavBar",
  components: { NarBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.back img {
  margin-top: 12px;
}

.title {
  display: flex;
  font-size: 14px;
}

.title_item {
  flex: 1;
}

.active {
  color: #ff5777;
}
</style>