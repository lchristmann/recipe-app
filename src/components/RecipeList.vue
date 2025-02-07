<script setup>
import RecipeListItem from '@/components/RecipeListItem.vue';
import recipesMain from '@/assets/recipes/main.json'
</script>

<template>

    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <RecipeListItem v-for="recipe in recipesMain" :key="recipe.id" :recipe="recipe"/>

    </ul>

</template>