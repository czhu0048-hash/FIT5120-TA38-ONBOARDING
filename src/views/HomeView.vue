<template>
  <div class="container-fluid mt-3">
    <div class="row g-3 justify-content-start">

      <div class="col-12 col-md-6 h-md-100">
        <div class="h-auto card">
          <UVCard :location="locationString" :uv-label="uvLable()" :current-u-v="uvPercentage()"
            :uv-description="uvDescription()" />
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
          <UtilityCard label1="Location selection">
            <select class="col-10 offset-1" v-model="selectedCity" @change="getWeatherDataSelectedLocation">
              <option value="Mel">Melbourne</option>
              <option value="Syd">Sydney</option>
              <option value="Bris">Brisbane</option>
            </select>
          </UtilityCard>
        </div>
      </div>

      <!-- <div class="homepage_element col-12 col-md-6"></div> -->
      <div class="homepage_element_sm col-2 offset-5 offset-md-2 accent-yellow" @click="getWeatherDataCurrentLocation"
        style="color: black; text-align: center;">
        <label>Refresh Location</label>
      </div>

      <div class="col-12"></div>
      <!-- Timeline -->
      <div class="col-12">
        <div class="homepage_element_lg card align-items-center justify-content-center">
          <WeatherTrendCard :hourly-weather-data="currentHourlyData"></WeatherTrendCard>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import UtilityCard from '@/components/UtilityCard.vue';
import UVCard from '@/components/UVCard.vue';
import { ref, computed } from 'vue';
import axios from 'axios';
import WeatherTrendCard from '@/components/WeatherTrendCard.vue';
// import env
const currentUV = ref(8);
const currentWeatherData = ref({});
const currentHourlyData = ref([]);
const selectedCity = ref("");
const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
// const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

const locationString = computed(() => {
  const tz = currentWeatherData.value?.timezone;
  if (tz) return tz.replace('_', ' ');
  return 'Melbourne, VIC';
});

const cityCoordinates = {
  Mel: { lat: -37.8136, lon: 144.9631 },
  Syd: { lat: -33.8688, lon: 151.2093 },
  Bris: { lat: -27.4698, lon: 153.0251 },
};

const selectedLalon = computed(() => cityCoordinates[selectedCity.value] ?? null);

const setCurrentUV = () => {
  var uvi = currentWeatherData.value?.current?.uvi;
  if (uvi != null) currentUV.value = uvi;
};

const setCurrentHourlyData = () => {
  currentHourlyData.value = currentWeatherData.value?.hourly;
}

const uvPercentage = () => {
  return currentUV.value * 10
}

const uvLable = () => {
  var uv = currentUV.value;
  if (uv < 3) {
    return `Low`
  } else if (uv < 6) {
    return `Moderate`
  } else {
    return `High`
  }
}

const uvDescription = () => {
  var uv = currentUV.value;
  if (uv < 3) {
    return `No protection needed`
  } else if (uv < 6) {
    return `Maybe wear sunglasses`
  } else {
    return `Wear sunglasses and apply sunscreens`
  }
}

// Called when refesh button is clicked
const getWeatherDataCurrentLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      await fetchWeatherData(url);
      setCurrentUV(); // After location is updated, also update current UV.
      setCurrentHourlyData(); // Update hourly data
    });
  }
}

// Called when new location selected
const getWeatherDataSelectedLocation = async () => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedLalon.value.lat}&lon=${selectedLalon.value.lon}&appid=${apiKey}`;
  await fetchWeatherData(url);
  setCurrentUV(); // After location is updated, also update current UV.
  setCurrentHourlyData(); // Update hourly data

}

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
</script>

<style scoped>
.homepage_element {
  height: 200px;
  border-radius: 10px;
}

.homepage_element_lg {
  height: 400px;
  border-radius: 10px;
}

.homepage_element_sm {
  height: 25px;
  border-radius: 5px;
}

.homepage_element_sm:hover {
  background-color: #e74c23;
}

.homepage_element_large {
  height: 600px;
  border-radius: 10px;
}
</style>