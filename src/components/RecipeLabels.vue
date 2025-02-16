<script setup>
defineProps({
  labels: Array
});
</script>

<template>

    <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="(label, index) in labels" :key="index"
            class="inline-flex items-center rounded-lg bg-orange-100 gap-1 px-3 py-1 text-sm font-medium text-orange-700">
            {{ label }}
        </span>
    </div>

</template>