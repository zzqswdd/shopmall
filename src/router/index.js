import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home.vue')
const Category = () => import('@/views/categroy/CateGroy.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const Profile = () => import('@/views/profile/ProFile.vue')
const Detail = () => import('@/views/detail/Detail.vue')

Vue.use(VueRouter)

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/categroy',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router