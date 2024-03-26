import Vue from 'vue'
import Router from 'vue-router'
import PrimaryChat from "@/views/chat/PrimaryChat.vue";
import UserLogin from "@/views/login/UserLogin.vue";
import KnowledgePlace from "@/views/knowledge/KnowledgePlace.vue";

Vue.use(Router)
export const constantRoutes = [
    {
        path: '/',
        redirect: '/chat'
    },
    {
        path: '/chat',
        name: 'PrimaryChat',
        component: PrimaryChat
    },
    {
        path: '/knowledge/:id',
        name: 'KnowledgePlace',
        component: KnowledgePlace,
        props: true
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
