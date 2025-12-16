<template>
  <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-8 flex flex-col gap-8">
      <ListingDetailHeader />
      <ResidentReviews />
    </div>
    <div class="lg:col-span-4">
      <AiReport />
    </div>
  </main>
</template>

<script setup>
import ListingDetailHeader from '@/components/listing-detail/ListingDetailHeader.vue';
import ResidentReviews from '@/components/listing-detail/ResidentReviews.vue';
import AiReport from '@/components/listing-detail/AiReport.vue';
</script>
