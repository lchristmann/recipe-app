<script setup>
import RecipeLabels from '@/components/RecipeLabels.vue';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { recipeTitleToFileName } from '@/utils/stringUtils';

const route = useRoute();
const router = useRouter();
const recipe = ref(null);
const recipeDetails = ref(null);

watchEffect(async () => {
  const category = route.params.category;
  const recipeId = route.params.id;

  try {
    const module = await import(`@/assets/recipes/${category}.json`);
    recipe.value = module.default.find(r => r.id == recipeId) || null;

    // If no recipe was found, redirect to 404
    if (!recipe.value) {
      router.push({ name: 'NotFound' });
      return;
    }

    // Fetch the single recipe JSON file
    try {
      // Use a relative path or the absolute path to the asset
      const recipeModule = await import(`../assets/recipes/${category}/${recipeTitleToFileName(recipe.value.title)}.json`);
      recipeDetails.value = recipeModule.default;
    } catch (error) {
      console.error(`Error loading recipe details:`, error);
      recipeDetails.value = null;
    }

  } catch (error) {
    console.error(`Error loading recipe ${category}/${recipeId}:`, error);
    router.push({ name: 'NotFound' }); // Redirect to 404 on error as well
    recipe.value = null;
    recipeDetails.value = null;
  }
});
</script>

<template>

  <!-- Constrain the width so it doesn't get too wide on large screens -->
  <div v-if="recipe" class="mx-auto max-w-3xl text-gray-700">

    <RecipeLabels v-if="recipe.labels && recipe.labels.length > 0" :labels="recipe.labels" />

    <h1 class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">{{ recipe.title }}</h1>

    <img v-if="recipe.hasImage" :src="recipe.imageUrl" alt="Bild von {{ recipe.title }}"
      class="aspect-2/1 inset-0 mt-4 h-full w-full object-cover rounded-xl">

    <div class="flex justify-between items-center mt-2 mx-1">

      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          🕒
          <span>{{ recipe.time }} min</span>
        </div>
        <div class="flex items-center gap-2">
          💳
          <span>
            <span>{{ "$".repeat(recipe.cost) }}</span><span class="text-gray-400/75">{{ "$".repeat(3 - recipe.cost)
              }}</span>
          </span>
        </div>
      </div>

      <div v-if="recipe.hasImage"
        class="block font-sans text-sm antialiased font-normal leading-normal text-right text-gray-500">
        <em>photo by {{ recipe.photoBy || "lchristmann" }}</em>
      </div>

    </div>

    <div v-if="recipeDetails" class="mt-4">
      <h2 class="text-xl font-semibold text-gray-900">Zutaten</h2>
      <ul class="mt-2 list-disc list-inside text-gray-700">
        <li v-for="(ingredient, index) in recipeDetails.ingredients" :key="index">{{ ingredient }}</li>
      </ul>
    </div>

    <div v-if="recipeDetails" class="mt-4">
      <h2 class="text-xl font-semibold text-gray-900">Zubereitung</h2>
      <ol class="mt-2 list-decimal list-inside text-gray-700">
        <li v-for="(step, index) in recipeDetails.instructions" :key="index">{{ step }}</li>
      </ol>
    </div>

  </div>

</template>