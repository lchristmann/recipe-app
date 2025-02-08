<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import RecipeListItem from '@/components/RecipeListItem.vue';
import mains from '@/assets/recipes/main.json';
import sides from '@/assets/recipes/side.json';
import suppers from '@/assets/recipes/supper.json';
import desserts from '@/assets/recipes/dessert.json';

const route = useRoute();

const recipes = computed(() => {
    switch (route.params.overview) {
        case "main":
            return mains;
        case "side":
            return sides;
        case "supper":
            return suppers;
        case "dessert":
            return desserts;
    }
})
</script>


<template>

    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <RecipeListItem v-for="(recipe, index) in recipes" :key="index" :recipe="recipe" :type="route.params.overview"/>

    </ul>

</template>