<template>
    <div class="awareness-wrapper">

        <!-- Descriptive text section -->
        <section class="description-section">
            <h2 class="section-title">UV Index Trends Over the Years</h2>
            <p class="section-body">
                This chart covers average UV index from 2016 to 2024 in Australia. As we can see, average UV index in
                Australia remains high in recent years but sunsafety for youngsters does not attract
                enough attention it should have.
            </p>
        </section>

        <!-- Chart section -->
        <section class="chart-section">
            <div v-if="loading" class="status-msg">Loading data…</div>
            <div v-else-if="error" class="status-msg error">{{ error }}</div>
            <apexchart v-else type="area" :options="chartOptions" :series="series" width="100%" />
        </section>

    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';

const apexchart = VueApexCharts;

const weatherTrendData = ref([]);
const error = ref('');
const loading = ref(true);


onMounted(async () => {
    try {
        const response = await axios.get('https://sunsafe-web.onrender.com/api/uv-trends/');
        weatherTrendData.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

const series = computed(() => [
    {
        name: 'Avg UV Index',
        data: weatherTrendData.value.map((d) => parseFloat(d.avg_uv_index.toFixed(2))),
    },
]);

const chartOptions = computed(() => ({
    chart: {
        id: 'uv-trends',
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit',
    },
    xaxis: {
        categories: weatherTrendData.value.map((d) => d.year),
        title: { text: 'Year' },
    },
    yaxis: {
        title: { text: 'Avg UV Index' },
        min: 0,
        decimalsInFloat: 2,
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
    colors: ['#F97316'],
    dataLabels: { enabled: false },
    markers: { size: 5 },
    tooltip: {
        y: { formatter: (val) => val.toFixed(2) },
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

<style scoped>
.awareness-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
    box-sizing: border-box;
}

.description-section {
    margin-bottom: 2rem;
}

.section-title {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 700;
    margin-bottom: 0.75rem;
}

.section-body {
    font-size: clamp(0.9rem, 2vw, 1rem);
    line-height: 1.7;
    color: #4b5563;
    min-height: 3rem;
    /* keeps space visible while empty */
}

.chart-section {
    width: 100%;
}

.status-msg {
    text-align: center;
    padding: 2rem;
    color: #6b7280;
}

.status-msg.error {
    color: #dc2626;
}
</style>