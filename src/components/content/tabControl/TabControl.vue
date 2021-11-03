<template>
  <div class="tab_control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab_control_item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab_control {
  display: flex;
  text-align: center;
  background-color: #fff;
}

.tab_control_item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}

.tab_control_item span {
  padding: 5px;
}

.active {
  color: #ff5777;
}

.active span {
  border-bottom: 2px solid #ff5777;
}
</style>