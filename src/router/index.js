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
        path: '/knowledge',
        component: Layout,
        name: 'Knowledge',
        children: [
            {
                path: '/:id',
                name: 'KnowledgeChat',
                component: () => import('@/views/knowledge/index.vue'),
                props: true
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
    console.log("路由")
    if (to.path === from.path) {
        console.log(to.path, from.path)
        console.log("重复跳转")
        return false;
    } else {
        next();
    }
});
export default router
