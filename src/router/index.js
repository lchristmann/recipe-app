import { createRouter, createWebHashHistory } from 'vue-router'
import Overview from '@/views/Overview.vue'
import RecipeView from '@/views/RecipeView.vue'
import { CATEGORIES } from '@/config/constants'

const routes = [
    { path: '/', name: 'home', redirect: { name: 'overview.show', params: { category: CATEGORIES[0] } } },
    { 
        path: `/:category(${CATEGORIES.join("|")})`,
        name: 'overview.show',
        component: Overview,
    },
    { 
        path: `/:category(${CATEGORIES.join("|")})/:id/:slug`,
        name: 'recipe.show',
        component: RecipeView,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router