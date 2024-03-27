import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from "@/views/login/index.vue";
import Layout from "@/layout/index.vue";

Vue.use(Router)
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/chat',
        children: [{
            path: 'chat',
            name: 'PrimaryChat',
            component: () => import('@/views/chat/index.vue')
        }]
    },

    {
        path: '/knowledge/:id',
        component: Layout,
        name: 'Knowledge',
        children: [
            {
                path: '',
                component: () => import('@/views/knowledge/index.vue')
            }
        ]
    },
    {
        path: '/login',
        component: UserLogin
    }
]


const createRouter = () => new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})
const router = createRouter()

router.beforeEach((to, from, next) => {
    if (from.path === '/knowledge' && to.path === '/knowledge') next()
    else if (to.path === from.path) {
        return false;
    } else {
        next();
    }
});
export default router
