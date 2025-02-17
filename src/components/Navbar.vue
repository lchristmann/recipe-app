<script setup>
import { CATEGORIES } from '@/config/constants';
import { useRoute } from 'vue-router';
import SearchAndFilter from './SearchAndFilter.vue';

const route = useRoute();
</script>

<template>

    <nav class="border-b border-gray-200 bg-white">
        <div class="mx-auto max-w-7xl px-8">
            <div class="flex flex-col-reverse h-32 sm:h-16 sm:flex-row sm:justify-between">

                <div class="flex h-16">
                    <div class="-my-px flex mx-auto space-x-8">
                        <router-link v-for="category in CATEGORIES" :key="category"
                            :to="{ name: 'overview.show', params: { category: category }, query: route.query }"
                            :class="{ '!border-orange-700 !text-gray-900': route.path.startsWith(`/${category}`) }"
                            class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 capitalize">{{
                            category }}</router-link>
                    </div>
                </div>

                <div class="flex h-16 mt-8 sm:mt-auto flex-1 items-center justify-center lg:ml-6 lg:justify-end">
                    <SearchAndFilter/>
                </div>

            </div>
        </div>
    </nav>

</template>