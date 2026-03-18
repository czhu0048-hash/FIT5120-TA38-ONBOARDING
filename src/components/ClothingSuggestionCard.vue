<template>
    <UtilityCard label1="Today's clothing suggestions" :lable2="clothingSuggestion">
        <img v-if="uvi < 3" src="../assets/clothes.png" alt=""
            style="display: block; margin: 0 auto; max-width: 25%; max-height: 25%;">
        <img v-else-if="uvi < 6" src="../assets/long-sleeves-t-shirt.png" alt=""
            style="display: block; margin: 0 auto; max-width: 25%; max-height: 25%;">
        <img v-else src="../assets/long-sleeves-t-shirt.png" alt=""
            style="display: block; margin: 0 auto; max-width: 25%; max-height: 25%;">

    </UtilityCard>
</template>

<script setup lang="ts">
import UtilityCard from './UtilityCard.vue';
defineProps({
    clothingSuggestion: {
        type: String,
        default: ''
    },
    uvi: {
        type: Number,
        default: 0
    }
});
</script>
