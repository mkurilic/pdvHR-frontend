import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticatedHomeView from '../views/AuthenticatedHomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ClientsView from '../views/ClientsView.vue'
import AddClient from '../views/AddClient.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
    name: 'authhome',
    component: AuthenticatedHomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientsView
  },
  {
    path: '/clients/add',
    name: 'newClient',
    component: AddClient
  },
  {
    path: '/clients/:id',
    name: 'client-detail',
    component: () => import('../views/ClientDetails.vue')
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: () => import('../views/SuppliersView.vue')
  },
  {
    path: '/suppliers/add',
    name: 'newSupplier',
    component: () => import('../views/AddSupplier.vue')
  },
  {
    path: '/buyers',
    name: 'buyers',
    component: () => import('../views/BuyersView.vue')
  },
  {
    path: '/buyers/add',
    name: 'newBuyer',
    component: () => import('../views/AddBuyer.vue')
  },
  {
    path: '/ura/insert',
    name: 'ura/insert',
    component: () => import('../views/InsertUraView.vue')
  },
  {
    path: '/ura',
    name: 'ura',
    component: () => import('../views/UraView.vue')
  },
  {
    path: '/ira',
    name: 'ira',
    component: () => import('../views/IraView.vue')
  },
  {
    path: '/ura/preview',
    name: 'uraPreview',
    component: () => import('../views/UraPreview.vue')
  },
  {
    path: '/ira/insert',
    name: 'iraInsert',
    component: () => import('../views/InsertIraView.vue')
  },
  {
    path: '/ira/preview',
    name: 'iraPreview',
    component: () => import('../views/IraPreview.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
