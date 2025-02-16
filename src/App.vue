<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>

  <Navbar></Navbar>

  <main class="xl:py-10">
    <div class="mx-auto max-w-7xl p-8">

      <router-view></router-view>

    </div>
  </main>
  
  <Footer></Footer>

</template>