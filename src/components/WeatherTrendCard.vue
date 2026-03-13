<template>
    <div class="container">
        <!-- <h1>Daily UV Index Trend</h1> -->
        <div ref="chartRef"></div>
    </div>
</template>

<script setup>
import ApexCharts from 'apexcharts';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    hourlyWeatherData: {
        type: Array,
        required: true
    }
});

const chartRef = ref(null);
let chart = null;

const buildSeries = (data) => {
    const first24 = (data || []).slice(0, 24);
    return {
        uviData: first24.map(entry => entry.uvi),
        hourLabels: first24.map((_, i) => `${i}:00`)
    };
};

onMounted(() => {
    const { uviData, hourLabels } = buildSeries(props.hourlyWeatherData);
    chart = new ApexCharts(chartRef.value, {
        chart: { type: 'line', width: '100%', height: '100%' },
        series: [{ name: 'UV Index', data: uviData }],
        xaxis: { categories: hourLabels },
        title: {
            text: "UV level in next 24 hours",
            align: 'center',
            style: { fontSize: '18px', color: '#263238' }
        }
    });
    chart.render();
});

// Update accordingly to hourlyWeatherData
watch(() => props.hourlyWeatherData, (newData) => {
    if (!chart) return;
    const { uviData, hourLabels } = buildSeries(newData);
    chart.updateOptions({ xaxis: { categories: hourLabels } });
    chart.updateSeries([{ name: 'UV Index', data: uviData }]);
});
</script>