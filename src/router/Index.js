import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Signup from '../components/Signup.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/signup', component: Signup },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  console.log("Going to:", to.path);
  console.log("isLoggedIn:", isLoggedIn);

  if (to.path === "/dashboard" && !isLoggedIn) {
    console.log("Blocked");
    return "/login";
  }

  if (
    isLoggedIn &&
    (to.path === "/" ||
      to.path === "/login" ||
      to.path === "/signup")
  ) {
    console.log("Already logged in");
    return "/dashboard";
  }

  console.log("Allowed");
  return true;
});

export default router