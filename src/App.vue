<script setup>
import Navbar from '@/components/Navbar.vue'
import RecipeList from '@/components/RecipeList.vue'
</script>

<template>

  <Navbar></Navbar>

  <main class="xl:py-10">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      <RecipeList></RecipeList>

    </div>
  </main>
  
  <Footer></Footer>

</template>