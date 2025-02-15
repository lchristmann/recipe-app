<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import RecipeListItem from '@/components/RecipeListItem.vue';
import imagesManifest from '@/assets/imagesManifest.json';

const route = useRoute();
const recipes = ref([]);
const validImages = ref(new Set()); // Store valid image filenames

watchEffect(async () => {
    const category = route.params.category;

    try {
        const module = await import(`@/assets/recipes/${category}.json`);
        recipes.value = module.default;
        validImages.value = new Set(imagesManifest[category])
    } catch (error) {
        console.error(`Error loading recipes for ${category}:`, error);
        recipes.value = [];
        validImages.value = new Set();
    }
});
</script>


<template>

    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <RecipeListItem
            v-for="(recipe, index) in recipes"
            :key="index"
            :recipe="recipe"
            :type="route.params.category"
            :validImages="validImages"
        />

    </ul>

</template>