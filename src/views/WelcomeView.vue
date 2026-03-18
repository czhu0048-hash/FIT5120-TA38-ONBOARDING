<template>
  <div class="home-page">
    <header class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Stay Protected Under the Sun</h1>
        <p class="hero-subtitle">
          Monitor real-time UV levels and temperature in your location. <br />
          Get personalized sun protection advice to keep your skin healthy and safe.
        </p>
        <button class="hero-btn" @click="toDashboard">Check UV Now →</button>
      </div>
    </header>

    <section class="help-section">
      <h2 class="section-title">How we can help</h2>
      <div class="cards-container">
        <div class="info-card">
          <div class="icon-circle sun">
            <img src="../assets/sun.png" alt="sun Icon" />
          </div>
          <h3>Real-time UV Index</h3>
          <p>Get accurate, up-to-date UV index readings for your current location throughout the day.</p>
        </div>

        <div class="info-card">
          <div class="icon-circle uv">
            <img src="../assets/UV.png" alt="UV Icon" />
          </div>
          <h3>UV Forecasting</h3>
          <p>Track current UV conditions to plan your outdoor activities safely.</p>
        </div>

        <div class="info-card">
          <div class="icon-circle tips">
            <img src="../assets/shield.png" alt="shield Icon" />
          </div>
          <h3>Protection Tips</h3>
          <p>Learn essential sun protection strategies and best practices for different UV levels.</p>
        </div>
      </div>
    </section>

    <section class="awareness-section">
      <div class="awareness-card">
        <h2>Why UV Awareness Matters?</h2>
        <div class="awareness-text">
          <p>Ultraviolet (UV) radiation from the sun is the primary cause of skin damage, premature aging, and skin
            cancer. Understanding UV levels helps you make informed decisions about sun exposure.</p>
          <p>UV radiation varies throughout the day and year, affected by factors like time of day, season, latitude,
            altitude, and cloud cover. Even on cloudy days, up to 80% of UV rays can penetrate through clouds.</p>
          <p>By monitoring UV levels and taking appropriate precautions, you can enjoy outdoor activities while
            minimizing health risks.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
// A simple function that make the homepage route to dashboard
const toDashboard = () => {
  router.push("/dashboard")
}
</script>

<style scoped>
/* main wrapper, makes everything stretch to full screen */
.home-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: clamp(14px, 1.1vw, 18px);
  font-family: 'Inter', sans-serif;
}

/* big banner at the top with the background image */
.hero-section {
  width: 100%;
  height: 50vh;
  min-height: 400px;
  background: url('../assets/WelBackGround.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 80%;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.hero-btn {
  background: #FF6900;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

/* the 3 cards below the hero */
.help-section {
  width: 90%;
  max-width: 1200px;
  padding: 4rem 0;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.info-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  flex: 1;
  min-width: 300px;
  max-width: 380px;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

/* circle background behind each icon */
.icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* keep the icon from overflowing the circle */
.icon-circle img {
  max-width: 65%;
  max-height: 65%;
  object-fit: contain;
}

/* emoji fallback size just in case */
.icon-circle span {
  font-size: 24px;
  line-height: 1;
}

.sun {
  background: #fff7ed;
}

.uv {
  background: #eff6ff;
}

.tips {
  background: #f0fdf4;
}

/* the white info box at the bottom */
.awareness-section {
  width: 90%;
  max-width: 1200px;
  margin-bottom: 5rem;
}

.awareness-card {
  background: white;
  padding: clamp(1.5rem, 5vw, 3.5rem);
  border-radius: 24px;
}

.awareness-card h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.awareness-text p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: #444;
}
</style>