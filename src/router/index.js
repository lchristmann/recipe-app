import { createRouter, createWebHashHistory } from 'vue-router'
import Overview from '@/views/Overview.vue'

const recipeTypes = ['main', 'side', 'supper', 'dessert']

const routes = [
    { path: '/', name: 'home', redirect: '/main' },
    { 
        path: '/:overview(main|side|supper|dessert)',
        name: 'overview.show',
        component: Overview,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: '!border-orange-700 !text-gray-900'
})

export default router