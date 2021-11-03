<template>
  <div id="home">
    <nav-bar class="home_nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <swiper>
        <swiper-item v-for="item in banners" :key="item.title">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad" />
          </a>
        </swiper-item>
      </swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-if="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NarBar.vue";
import { Swiper, SwiperItem } from "@/components/common/swiper";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";

import RecommendView from "@/views/home/children/RecommendView.vue";
import FeatureView from "@/views/home/children/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/home.js";

import bus from "@/network/EventBus.js";
import { debounce } from "@/common/utils.js";

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currenttype: "pop",
      isShowBackTop: false,
      tabOffsettop: 0,
      isLoad: false,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    async getHomeMultidata() {
      const { data: res } = await getHomeMultidata();
      this.banners = res.banner.list;
      this.recommends = res.recommend.list;
    },
    async getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      const { data: res } = await getHomeGoods(type, page);
      this.goods[type].list.push(...res.list);
      this.goods[type].page = page;

      this.$refs.scroll.finishPullUp();
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currenttype = "pop";
          break;
        case 1:
          this.currenttype = "new";
          break;
        case 2:
          this.currenttype = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 2000);
    },

    contentScroll(position) {
      this.isShowBackTop = position.y < -1000;

      this.isTabFixed = -position.y > this.tabOffsettop;
    },

    loadMore() {
      this.getHomeGoods(this.currenttype);
    },

    imageLoad() {
      if (!this.isLoad) {
        this.isLoad = true;
      }
      this.tabOffsettop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currenttype].list;
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  padding-block-end: 49px;
  height: 100vh;
}
.home_nav {
  color: #fff;
  background-color: #ff8198;
}

.content {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  height: calc(100%);
  overflow: hidden;
}

.tab-control {
  position: absolute;
  width: 100%;
  z-index: 9;
}
</style>