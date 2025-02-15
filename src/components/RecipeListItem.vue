<script setup>
import manifest from '@/assets/imagesManifest.json';
import { normalizeRecipeTitle } from '@/utils/stringUtils';

const props = defineProps(['recipe', 'type']);

const imageFileName = normalizeRecipeTitle(props.recipe.title) + '.webp';
const imageExists = manifest[props.type] && manifest[props.type].includes(imageFileName);
const imageUrl = `/images/${props.type}/${imageFileName}`;
</script>

<template>

    <router-link :to="{ name: 'recipe.show', params: { id: recipe.id, slug: recipe.slug } }">
        <div
            class="aspect-3/1 px-4 mx-4 py-5 sm:p-6 relative isolate flex flex-col justify-end overflow-hidden rounded-md shadow-sm cursor-pointer hover:opacity-75">
            <img v-if="imageExists" :src="imageUrl" alt="Bild von {{ props.recipe.title }}"
                class="absolute inset-0 h-full w-full object-cover" loading="lazy">
            <div v-else class="absolute inset-0 bg-gradient-to-r from-gray-900 via-orange-50 to-gray-700 opacity-80">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>
            <h3 class="z-10 mt-3 text-3xl font-bold text-white tracking-tight">{{ props.recipe.title }}</h3>
        </div>
    </router-link>

</template>