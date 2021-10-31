import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routers = [
  {
    url: '',
    redirect: '/home'
  },
  {
    url: '/home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    url: '/cart',
    component: () => import('@/views/cart/Cart.vue')
  },
  {
    url: '/categroy',
    component: () => import('@/views/categroy/CateGroy.vue')
  },
  {
    url: '/profile',
    component: () => import('@/views/profile/ProFile.vue')
  }
]

const router = new VueRouter({
  routers
})

export default router