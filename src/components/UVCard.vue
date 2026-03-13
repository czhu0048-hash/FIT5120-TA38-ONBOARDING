<template>
    <div class="column">
        <div class="col-5 offset-1">
            <h5>{{ location }}</h5>
        </div>
        <div class="col-8 offset-1">
            <h1>{{ uvLabel }}</h1>
        </div>

        <div class="col-10 offset-1">
            <div class="progress">
                <div class="progress-bar bg-danger" :style="{ width: currentUV + '%' }"></div>
            </div>
        </div>

        <div class="col-10 offset-1 mt-4">
            {{ uvDescription }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    currentUV: {
        type: Number,
        default: 0
    },

    uvLabel: {
        type: String,
        default: ''
    },

    uvDescription: {
        type: String,
        default: ''
    },

    location: {
        type: String,
        default: 'Melbourne Vic, Australia'
    }
});
</script>