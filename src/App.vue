<template>
  <div class="bg-background text-on-surface min-h-screen flex flex-col">
    <TopNavBar />
    <main class="flex-grow w-full max-w-container-max mx-auto px-gutter py-xl flex justify-center items-start">
      <ManagePage />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import TopNavBar from './components/TopNavBar.vue'
import FooterBar from './components/FooterBar.vue'
import ManagePage from './views/ManagePage.vue'
</script>
