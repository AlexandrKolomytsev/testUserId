import Vue from 'vue'
import Router from 'vue-router'
import Main from "./views/Main";
import LoginPage from "./views/LoginPage";

Vue.use(Router)
let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: LoginPage,
            meta: {
                guest: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!(localStorage.getItem('isAuth') === 'true') && to.path === '/'){
        next({ path: '/login'})
    } else {
        next()
    }
    if (localStorage.getItem('isAuth') === 'true'){
        next({ path: '/'})
    } else {
        next()
    }
})

export default router
