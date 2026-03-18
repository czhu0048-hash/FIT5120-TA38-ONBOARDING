/**
* Awareness card is a base component for both UV trend and cancer cases
*/
<template>
    <div class="awareness-wrapper">

        <!-- Descriptive text section -->
        <section class="description-section">
            <h2 class="section-title">{{ label }}</h2>
            <p class="section-body">
                {{ description }}
            </p>
        </section>

        <!-- Chart section -->
        <section class="chart-section">
            <div v-if="loading" class="status-msg">Loading data…</div>
            <div v-else-if="error" class="status-msg error">{{ error }}</div>
            <slot v-else></slot>
        </section>

    </div>
</template>

<script setup>

defineProps({
    label: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    error: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: true
    },
});



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