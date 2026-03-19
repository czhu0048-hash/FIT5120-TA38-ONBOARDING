<template>
  <div class="for-you-page py-4" style="background-color: #edfcff; min-height: 100vh;">
    <div class="container">

      <!-- Page Header -->
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h2 class="fw-bold">Sunscreen Dosage Guide</h2>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-6">

          <!-- Step 1: Skin Tone Selection -->
          <div class="card mb-4 shadow-sm border-0">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-2">
                <span class="step-badge me-2">1</span>
                <h5 class="card-title fw-semibold mb-0">Select Your Skin Tone</h5>
              </div>
              <p class="text-muted small mb-4">Select skin tone.</p>

              <!-- Skin tone circles -->
              <div class="d-flex justify-content-between px-1">
                <div v-for="(tone, index) in skinTones" :key="index"
                  class="skin-tone-option d-flex flex-column align-items-center" @click="selectedSkinTone = index">
                  <div class="skin-tone-circle" :style="{ backgroundColor: tone.color }"
                    :class="{ selected: selectedSkinTone === index }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: UV Level -->
          <div class="card mb-4 shadow-sm border-0">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-2">
                <span class="step-badge me-2">2</span>
                <h5 class="card-title fw-semibold mb-0">Enter UV Level</h5>
              </div>
              <p class="text-muted small mb-3">Enter UV index.</p>

              <div class="input-group mb-2">
                <input type="number" class="form-control" placeholder="UV Index (0 – 20)" v-model.number="uvLevel"
                  min="0" max="20" />
                <button class="btn btn-outline-secondary" type="button" @click="useCurrentUV">
                  Use Current UV
                </button>
              </div>
            </div>
          </div>

          <!-- Calculate Button -->
          <div class="d-grid mb-4">
            <button class="btn btn-lg fw-bold py-3 calculate-btn" @click="calculate"
              :disabled="selectedSkinTone === null || uvLevel === null || uvLevel < 0">
              Calculate
            </button>
          </div>

          <!-- Result Card -->
          <transition name="slide-up">
            <div v-if="result" class="card shadow border-0 result-card mb-5">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold text-center mb-4">Dosage recommendation and sun protection factor</h5>
                <div class="row g-3 mb-4">
                  <div class="text-center rounded p-3 mb-4 dosage-box">
                    <div class="display-5 fw-bold dosage-value">{{ result.dosage }}</div>
                  </div>
                  <div class="col-6 offset-3">
                    <div class="text-center p-3 rounded info-tile">
                      <div class="fs-4 fw-bold">SPF {{ result.spf }}+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const selectedSkinTone = ref(null);
const uvLevel = ref(null);
const result = ref(null);
const currentWeatherData = ref({});
const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;


const skinTones = [
  { type: '1', color: '#FDDBB4' },
  { type: '2', color: '#F5C28A' },
  { type: '3', color: '#E0A070' },
  { type: '4', color: '#C07840' },
  { type: '5', color: '#8B5A2B' },
  { type: '6', color: '#4A2C17' },
];

const setCurrentUV = () => {
  var uvi = currentWeatherData.value?.current?.uvi;
  if (uvi != null) uvLevel.value = uvi;
};

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    //Returned data from API is stored as JSON file in weatherData
    currentWeatherData.value = response.data;
    console.log(response.data)
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

const useCurrentUV = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      await fetchWeatherData(url);
      setCurrentUV(); // After location is updated, also update current UV.
    });
  }
};

const calculate = () => {
  if (selectedSkinTone.value === null || uvLevel.value === null) return;

  const idx = selectedSkinTone.value;
  const uv = uvLevel.value;

  // SPF recommendation: lighter skin types need higher SPF
  const spfMap = [50, 50, 30, 30, 15, 15];
  const spf = spfMap[idx];

  // Dosage based on UV level (standard 2 mg/cm² guidance simplified to teaspoons)
  let dosage;
  if (uv <= 2) dosage = '0 teaspoon';
  else if (uv <= 5) dosage = '1 teaspoons';
  else if (uv <= 7) dosage = '2 teaspoons';
  else dosage = '2–3 teaspoons';

  // Reapply interval — shorter for high UV and lighter skin types
  let mins = 120;
  if (uv >= 8) mins = 60;
  else if (uv >= 6) mins = 90;
  if (idx <= 1) mins = Math.min(mins, 60);

  const reapplyInterval =
    mins === 60 ? '1 hour' : mins === 90 ? '1½ hours' : '2 hours';

  result.value = { dosage, spf, reapplyInterval };
};
</script>

<style scoped>
/* ── Skin tone picker ───────────────────────────────── */
.skin-tone-option {
  cursor: pointer;
}

.skin-tone-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 3px solid transparent;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.skin-tone-circle:hover {
  transform: scale(1.12);
}

.skin-tone-circle.selected {
  border-color: #e74c23;
  transform: scale(1.18);
}

.skin-tone-label {
  font-size: 0.72rem;
  color: #333;
}

.skin-tone-sublabel {
  font-size: 0.6rem;
}

/* ── Step badge ─────────────────────────────────────── */
.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #e74c23;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

/* ── Selected skin tone info box ──────────────────── */
.selected-info {
  background-color: #ffdbb6;
  font-size: 0.85rem;
}

/* ── Calculate button ────────────────────────────── */
.calculate-btn {
  background-color: #e74c23;
  color: #fff;
  border: none;
  border-radius: 12px;
  letter-spacing: 0.03em;
  transition: background-color 0.2s, transform 0.12s;
}

.calculate-btn:hover:not(:disabled) {
  background-color: #c0392b;
  color: #fff;
  transform: translateY(-2px);
}

.calculate-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* ── Result card ─────────────────────────────────── */
.dosage-box {
  background-color: #ffdbb6;
}

.dosage-value {
  color: #e74c23;
}

.info-tile {
  background-color: #ffda33;
  color: #333;
}

.tip-box {
  background-color: #edfcff;
  border: 1px solid #b6dfe8;
}

/* ── Transitions ─────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
