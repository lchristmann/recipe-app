import { createRouter, createWebHashHistory } from 'vue-router'
import Overview from '@/views/Overview.vue'
import RecipeView from '@/views/RecipeView.vue'

const recipeTypes = ['main', 'side', 'supper', 'dessert']

const routes = [
    { path: '/', name: 'home', redirect: '/main' },
    { 
        path: '/:overview(main|side|supper|dessert)',
        name: 'overview.show',
        component: Overview,
    },
    { 
        path: '/:overview(main|side|supper|dessert)/:id/:slug',
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