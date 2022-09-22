import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView";
import MenuView from "@/views/MenuView";
import AdminView from "@/views/AdminView";
import SearchView from "@/views/SearchView";
import EventView from "@/views/EventView";
import GlobalSettingsView from "@/views/GlobalSettingsView";
import AthleteSetupView from "@/views/AthleteSetupView";
import AthleteView from "@/views/AthleteView";
import AthleteEventsView from "@/views/AthleteEventsView";
import AthleteEventSplitView from "@/views/AthleteEventSplitView";

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
    path: '/global-settings',
    name: 'globalSettingsRoute',
    component: GlobalSettingsView
  },
  {
    path: '/search',
    name: 'searchRoute',
    component: SearchView
  },
  {
    path: '/event',
    name: 'eventRoute',
    component: EventView
  },
  {
    path: '/athlete-setup',
    name: 'athleteSetupRoute',
    component: AthleteSetupView
  },
  {
    path: '/athlete',
    name: 'athleteRoute',
    component: AthleteView
  },
  {
    path: '/athlete-events',
    name: 'athleteEventsRoute',
    component: AthleteEventsView
  },
  {
    path: '/splits',
    name: 'athleteEventSplitRoute',
    component: AthleteEventSplitView
  },
]

const router = new VueRouter({
  routes
})

export default router
