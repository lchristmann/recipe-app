<script setup>
import { ref, watch } from 'vue';
import labels from '@/assets/labelsManifest.json';
import { useRoute, useRouter } from 'vue-router';
import { makeKebabCase } from '@/utils/stringUtils';

const router = useRouter();
const route = useRoute();

// This keeps track of whether we're in search or filter mode
// Default is search and filter is the special mode here
const filterActive = ref(false);

const filterLabel = ref(route.query.label || '');
const searchKeyword = ref(route.query.search || '');

// Function to update the route with query params
const updateQueryParams = () => {
    const query = {};

    if (filterLabel.value) {
        query.label = makeKebabCase(filterLabel.value);
    }

    if (searchKeyword.value) {
        query.search = makeKebabCase(searchKeyword.value);
    }

    router.replace({ query });
};

// Watch for changes and update the route
watch(filterLabel, updateQueryParams);
watch(searchKeyword, updateQueryParams);
</script>


<template>

    <div class="flex w-full max-w-lg lg:max-w-xs">

        <!-- Search Mode -->
        <div v-if="!filterActive" class="-mr-px grid grow grid-cols-1 focus-within:relative">
            <input v-model="searchKeyword" type="text" name="search" placeholder="..."
                class="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-orange-700 sm:pl-9 sm:text-sm/6">

            <svg class="pointer-events-none col-start-1 row-start-1 ml-3 size-4.5 self-center text-gray-400 sm:size-4"
                fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>

        <!-- Filter Mode -->
        <div v-else class="-mr-px grid grow grid-cols-1 focus-within:relative">
            <select v-model="filterLabel"
                class="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-1 focus:-outline-offset-1 focus:outline-orange-700 sm:text-sm/6 appearance-none"
                :class="{ '!text-gray-400': filterLabel === '' }">
                <option value="" disabled>Filter for label...</option>
                <option v-for="label in labels" :key="label" :value="label">
                    {{ label }}
                </option>
            </select>
        </div>

        <!-- Button to toggle Filter Mode -->
        <button type="button" @click="filterActive = !filterActive; filterLabel = searchKeyword = '';"
            class="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50"
            :class="{ 'relative outline-1 -outline-offset-1 outline-orange-700 text-orange-700': filterActive }">
            <svg class="-ml-0.5 size-4 text-gray-400" viewBox="0 0 16 16" :class="{ 'text-orange-700': filterActive }"
                fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd"
                    d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 2.75ZM2 6.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 2 9.75ZM9.22 9.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V8.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                    clip-rule="evenodd" />
            </svg>
            Filter
        </button>
    </div>

</template>