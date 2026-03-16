<!-- 
This view is abandoned, cause we no longer need two awareness views.
-->
<template>
  <!-- Knowledge 1 -->
  <div class="row g-3 justify-content-start">
    <div class="col-12 col-md-5 mt-5" style="margin-left: 2%;">
      <div class="awareness_element card align-items-center" @click="toAwarenessOne">
        <img src="../assets/bookmark.png" class="col-12 offset-10" alt="Fit image"
          style="width: 20%; height: 20%; object-fit: contain;">
        <div style="height: 25%;"></div>
        <label style="font-size: x-large;">UV trends and myth</label>
      </div>
    </div>

    <!-- Space 1 -->
    <div class="col-12 col-md-5 offset-1 mt-5">
    </div>

    <!-- Space 2 -->
    <div class="col-12 col-md-5 offset-1 mt-5">
    </div>

    <!-- Knowledge 2 -->
    <div class="col-12 col-md-5">
      <div class="awareness_element card align-items-center">
        <img src="../assets/bookmark.png" class="col-12 offset-10" alt="Fit image"
          style="width: 20%; height: 20%; object-fit: contain;">
        <div style="height: 25%;"></div>
        <label style="font-size: x-large;">Skin tone and UV absorption </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toAwarenessOne = () => {
  router.push("/awarenessOne")
}
</script>

<style scoped>
.awareness_element {
  height: 300px;
  border-radius: 10px;
  background-color: antiquewhite;
  transition: background-color 0.3s ease;
}

.awareness_element:hover {
  background-color: chocolate;
}
</style>