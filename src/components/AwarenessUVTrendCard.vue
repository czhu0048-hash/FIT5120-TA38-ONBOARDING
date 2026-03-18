/**
* A component that is used to track peak UV index in Australia across years.
*/
<template>
    <awareness-card label="Peak UV Index Trends Over the Years" description="This chart covers peak UV index from 2016 to 2024 in Australia. As we can see, peak UV index in
                Australia remains high in recent years. This suggests more attention on sunsafety for youngsters."
        :loading=loading :error=error>
        <apexchart type="area" :options="chartOptions" :series="series" width="100%" />
    </awareness-card>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';
import AwarenessCard from './AwarenessCard.vue';

const apexchart = VueApexCharts;

const weatherTrendData = ref([]);
const loading = ref(true);
const error = ref('');

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
        name: 'Peak UV Index',
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
        title: { text: 'Peak UV Index' },
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