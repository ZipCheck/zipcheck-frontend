<template>
  <div class="bg-background-light text-text-main">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
</script>