import { createRouter, createWebHashHistory } from 'vue-router'
import Overview from '@/views/Overview.vue'
import RecipeView from '@/views/RecipeView.vue'
import { CATEGORIES } from '@/config/constants'

const routes = [
    { path: '/', name: 'home', redirect: '/main' },
    { 
        path: `/:overview(${CATEGORIES.join("|")})`,
        name: 'overview.show',
        component: Overview,
    },
    { 
        path: `/:overview(${CATEGORIES.join("|")})/:id/:slug`,
        name: 'recipe.show',
        component: RecipeView,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: '!border-orange-700 !text-gray-900'
})

export default router