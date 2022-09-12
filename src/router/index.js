import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView";
import MenuView from "@/views/MenuView";
import AdminView from "@/views/AdminView";
import SettingsView from "@/views/SettingsView";
import SearchView from "@/views/SearchView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'registerRoute',
    component: RegisterView
  },
  {
    path: '/admin',
    name: 'adminRoute',
    component: AdminView
  },
  {
    path: '/menu',
    name: 'menuRoute',
    component: MenuView
  },
  {
    path: '/settings',
    name: 'settingsRoute',
    component: SettingsView
  },
  {
    path: '/search',
    name: 'searchRoute',
    component: SearchView
  }
]

const router = new VueRouter({
  routes
})

export default router
