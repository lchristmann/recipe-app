<script setup>
import { ref, computed, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import RecipeListItem from '@/components/RecipeListItem.vue';
import { makeKebabCase } from '@/utils/stringUtils';

const route = useRoute();

// Refs for search/filter state
const filterLabel = ref(route.query.label || ''); // Initialize with query params if available
const searchKeyword = ref(route.query.search || ''); // Initialize with query params if available

const recipes = ref([]);

watchEffect(async () => {
    const category = route.params.category;

    try {
        const module = await import(`@/assets/recipes/${category}.json`);
        recipes.value = module.default;
    } catch (error) {
        console.error(`Error loading recipes for ${category}:`, error);
        recipes.value = [];
    }
});

// Watch for changes in the query parameters (label and search)
watch(() => route.query, () => {
    filterLabel.value = route.query.label || '';
    searchKeyword.value = route.query.search || '';
});

// Filter recipes based on the search keyword and/or label
const filteredRecipes = computed(() => {
    return recipes.value.filter(recipe => {
        const matchesLabel = filterLabel.value ? recipe.labels.some(label => makeKebabCase(label) === filterLabel.value) : true;
        const matchesKeyword = searchKeyword.value ? makeKebabCase(recipe.title).includes(searchKeyword.value) : true;
        return matchesLabel && matchesKeyword;
    });
});
</script>


<template>

    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <RecipeListItem v-for="(recipe, index) in filteredRecipes" :key="index" :index="index" :recipe="recipe" :type="route.params.category" />

    </ul>

</template>