/**
* Display weather trends.
*/
<template>
    <div class="container">
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
    const first12 = (data || []).slice(0, 12);
    return {
        uviData: first12.map(entry => entry.uvi),
        hourLabels: first12.map((_, i) => `${i}:00`)
    };
};

onMounted(() => {
    const { uviData, hourLabels } = buildSeries(props.hourlyWeatherData);
    chart = new ApexCharts(chartRef.value, {
        chart: {
            type: 'area',
            width: '100%',
            height: '100%',
            foreColor: "#f80",
            toolbar: {
                autoSelected: "pan",
                show: false
            }
        },
        grid: {
            borderColor: "#555",
            clipMarkers: false,
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.55,
                opacityTo: 0
            }
        },
        colors: ["#f80"],
        series: [{ name: 'UV Index', data: uviData }],
        xaxis: { categories: hourLabels },
        title: {
            text: "UV level in next 12 hours",
            align: 'center',
            style: { fontSize: '18px', color: '#263238' }
        },
        markers: {
            size: 5,
            colors: ["#f55"],
            strokeWidth: 3
        },
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