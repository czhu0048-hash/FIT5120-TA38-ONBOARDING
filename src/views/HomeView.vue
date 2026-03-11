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
          <UtilityCard label1="Today's clothing" lable2="Long sleeve shirt, wide brim hat">

          </UtilityCard>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="homepage_element card d-flex align-items-center justify-content-center">
          <UtilityCard label1="Sunscreen usage" lable2="2 teaspoons, every two hours">
            <img src="../assets/sunscreen.png" class="col-12 offset-4" alt="Fit image"
              style="width: 20%; height: 20%; object-fit: contain;">
          </UtilityCard>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import UtilityCard from '@/components/UtilityCard.vue';
import UVCard from '@/components/UVCard.vue';

// No script needed for now
</script>

<style scoped>
.homepage_element {
  height: 200px;
  border-radius: 10px;
}
</style>