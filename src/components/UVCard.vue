/**
* Display UV and alerts.
*/
<template>
    <div class="column">
        <div class="col-5 offset-1">
            <label style="color: grey;">{{ location }}</label>
        </div>
        <div class="col-8 offset-1">
            <div class="row">
                <i class="col-auto mt-3 pi pi-sun" color="000" style="font-size: 2rem"></i>
                <h5 class="col-auto mt-3">Current UV index:</h5>
                <h1 class="col-auto">{{ (currentUV / 10).toString() }}</h1>
                <div class="col-auto accent-brightyellow mb-2 mt-2" style="border-radius: 10%;
                text-align: center; align-items: center;">
                    <label class="col-auto mt-2">{{ uvLabel }}</label>
                </div>
            </div>
        </div>

        <div class="col-10 offset-1">
            <div class="progress">
                <div class="accent-brightyellow" :style="{ width: currentUV + '%' }"></div>
            </div>
        </div>

        <div class="col-10 offset-1 mt-4 alert alert-warning">
            <i class="pi pi-exclamation-circle" color="000"></i>
            <label style="margin-left: 3%;">{{ uvDescription }}</label>
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