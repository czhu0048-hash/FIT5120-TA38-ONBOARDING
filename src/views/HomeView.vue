<template>
  <div class="container-fluid mt-3">
    <div class="row g-3 justify-content-start">

      <div class="col-12 col-md-6">
        <div class="homepage_element accent-yellow">
          <UVCard>Current UV</UVCard>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="homepage_element card d-flex align-items-center justify-content-center">
          Clothing
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="homepage_element card d-flex align-items-center justify-content-center">
          Sunscreen
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import UVCard from '@/components/UVCard.vue';

// No script needed for now
</script>

<style scoped>
.homepage_element {
  height: 200px;
  border-radius: 10px;
}
</style>