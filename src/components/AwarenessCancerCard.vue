/**
* A component that is used to track skin cancer cases in Australia and Victoria across years.
*/
<template>
    <awareness-card :label="`Yearly melanoma cases — ${activeRegion}`"
        description="Switch between regions to explore how melanoma case counts have changed over time across Australia."
        :loading="loading" :error="error">
        <!-- Region switcher -->
        <div class="region-tabs">
            <button v-for="region in regions" :key="region" class="region-tab"
                :class="{ active: activeRegion === region }"
                :style="activeRegion === region ? { backgroundColor: regionColors[region], borderColor: regionColors[region] } : {}"
                @click="activeRegion = region">
                {{ region }}
            </button>
        </div>

        <!-- Chart -->
        <apexchart type="area" :options="chartOptions" :series="series" width="100%" />
    </awareness-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import AwarenessCard from './AwarenessCard.vue';
import axios from 'axios';

const apexchart = VueApexCharts;

const cancerData = ref([]);
const loading = ref(true);
const error = ref('');

// Data setup
onMounted(async () => {
    try {
        const response = await axios.get('https://sunsafe-web.onrender.com/api/cancer-stats/');
        cancerData.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

// Region setup
const regions = ['Australia', 'Victoria'];

// Color setup
const regionColors = {
    Australia: '#F97316',
    Victoria: '#6366F1',
};

const activeRegion = ref('Australia');

const filteredData = computed(() =>
    cancerData.value.filter((d) => d.region === activeRegion.value)
);

// Initialize series
const series = computed(() => [
    {
        name: 'Cases',
        data: filteredData.value.map((d) => d.cases),
    },
]);

// Create chart options
const chartOptions = computed(() => ({
    chart: {
        id: 'cancer-cases',
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit',
        animations: { enabled: true, speed: 400 },
    },
    xaxis: {
        categories: filteredData.value.map((d) => d.year),
        title: { text: 'Year' },
    },
    yaxis: {
        title: { text: 'Cancer Cases' },
        min: 0,
    },
    stroke: {
        curve: 'smooth',
        width: 3,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.45,
            opacityTo: 0.05,
        },
    },
    colors: [regionColors[activeRegion.value]],
    dataLabels: { enabled: false },
    markers: { size: 5 },
    tooltip: {
        y: { formatter: (val) => val.toLocaleString() },
    },
    grid: {
        borderColor: '#e5e7eb',
    },
    responsive: [
        {
            breakpoint: 640,
            options: {
                markers: { size: 3 },
                xaxis: { labels: { rotate: -45 } },
            },
        },
    ],
}));
</script>

<!-- Styles for region switcher -->
<style scoped>
.region-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
}

.region-tab {
    padding: 0.35rem 1rem;
    border-radius: 9999px;
    border: 2px solid #d1d5db;
    background: transparent;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.region-tab:hover:not(.active) {
    background-color: #f3f4f6;
}

.region-tab.active {
    color: #ffffff;
}
</style>
