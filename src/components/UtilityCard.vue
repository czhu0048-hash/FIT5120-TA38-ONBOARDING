/**
* A simple layout designed for multiple purpose
*/
<template>
    <div class="colmn">
        <div class="col-12 offset-1" style="stroke: black;">
            <strong>{{ label1 }}</strong>
        </div>

        <div class="mt-4">
            <slot></slot>
        </div>

        <div class="col-10 offset-1 mt-4" style="color: grey;">
            {{ lable2 }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    label1: {
        type: String,
        default: ''
    },
    lable2: {
        type: String,
        default: ''
    }
});
</script>