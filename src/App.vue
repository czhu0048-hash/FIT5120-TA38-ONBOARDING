<script setup></script>

<template>
  <div class="d-flex min-vh-100">
    <!-- Sidebar Navigation -->
    <nav class="d-flex col-2 flex-column p-3 bg-sidebar">
      <span class="primary fs-5 mb-4">SunSafe</span>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <router-link to="/" class="nav_item_custom text-black">Home</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/awarenessOne" class="nav_item_custom text-black">Awareness</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/foryou" class="nav_item_custom text-black">For You</router-link>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="col-8 col-md-10 offset-1 offset-md-0 bg-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.nav_item_custom {
  text-decoration: none;
}
</style>
