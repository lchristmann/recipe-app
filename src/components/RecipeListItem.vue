<script setup>
import { computed } from 'vue';
import { makeKebabCase } from '@/utils/stringUtils';
import { useRoute } from 'vue-router';

const props = defineProps(['recipe', 'type', 'index']);

const route = useRoute();

const kebabCaseRecipeTitle = computed(() => makeKebabCase(props.recipe.title));
</script>

<template>

    <router-link :to="{ name: 'recipe.show', params: { title: kebabCaseRecipeTitle }, query: route.query }">
        <div
            class="aspect-3/1 px-4 py-5 sm:p-6 relative isolate flex flex-col justify-end overflow-hidden rounded-xl shadow-sm cursor-pointer hover:opacity-75">
            <img v-if="props.recipe.hasImage" :src="props.recipe.imageUrl" alt="Bild von {{ props.recipe.title }}"
                class="absolute inset-0 h-full w-full object-cover" :loading="props.index > 4 ? 'lazy' : 'eager'">
            <div v-else class="absolute inset-0 bg-gradient-to-r from-gray-900 via-orange-50 to-gray-700 opacity-80">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>
            <h3 class="z-10 text-3xl font-bold text-white tracking-tight">{{ props.recipe.title }}</h3>
        </div>
    </router-link>

</template>