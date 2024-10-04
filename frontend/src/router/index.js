import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginForm.vue';
import Register from '../components/Register.vue';
import TaskList from '../components/TaskList.vue';

const routes = [
  { path: '/', redirect: '/login' }, // Redirigir a /login al acceder a /
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/tasks', component: TaskList, meta: { requiresAuth: true } },
];

// Crea el router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Lógica para proteger las rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
