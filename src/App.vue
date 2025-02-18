<script setup>
import Banner from '@/components/Banner.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>

  <Banner/>

  <Navbar/>

  <main class="xl:py-10">
    <div class="mx-auto max-w-7xl p-8">

      <router-view></router-view>

    </div>
  </main>
  
  <Footer></Footer>

</template>