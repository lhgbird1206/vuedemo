import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/home'
import Login from '../views/login/login'

Vue.use(Router);


export const routeMap = [
    {
        path: '/redirect',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '',
        component: Home
    },

];

export default new Router({
    routes: routeMap
})