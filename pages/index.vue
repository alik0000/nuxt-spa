<template>
  <div class="mt-8">
    <h2 class="text-4xl mb-6">Main page</h2>
    <div class="flex items-center h-10 mb-6">
      <input
          v-model="searchInput"
          @input="updateFilteredCharacters"
          class="bg-gray-50 border h-full border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by name..."
      />
      <div class="w-28 h-full">
        <select id="small"
                class="block w-full px-2 m-0 h-full text-sm text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="selectedStatus"
                @change="updateFilteredCharacters"
        >
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
    </div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-if="filteredCharacters.length" v-for="({id, name, species, image, episode}, index) in filteredCharacters" :key="id" class="flex justify-between items-center gap-x-6 py-5">
        <div class="flex gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="image" :alt="name">
          <div class="min-w-0 flex-auto">
            <NuxtLink :to="`/character/${id}`" class="text-sm font-semibold leading-6 text-gray-900">{{ name }}</NuxtLink>
            <p class="truncate text-xs leading-5 text-gray-500">{{ species }}</p>
          </div>
        </div>
        <div class="h-fit">
          <div class="relative text-lg w-32">
            <button
                class="flex items-center justify-between bg-white w-full"
                @click="btnToggle(index, !isOptionsExpanded[index])"
                @blur="btnToggle(index, false)"
            >
              <span>episodes</span>
              <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
                  :class="isOptionsExpanded[index] ? 'rotate-180' : 'rotate-0'"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <transition
                enter-active-class="transform transition duration-500 ease-custom"
                enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                enter-to-class="translate-y-0 scale-y-100 opacity-100"
                leave-active-class="transform transition duration-300 ease-custom"
                leave-class="translate-y-0 scale-y-100 opacity-100"
                leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
            >
              <ul
                  v-show="isOptionsExpanded[index]"
                  class="absolute z-10 left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
              >
                <li
                    v-for="(option, index) in episode.slice(0, 5)"
                    :key="index"
                    class="transition-colors duration-300 hover:bg-gray-200"
                >
                  <NuxtLink :to="`/episode/${indexOfEpisode(option)}`" class="flex justify-between px-3 py-2">
                    episode
                    <span class="flex">{{ indexOfEpisode(option) }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </li>
      <li v-else class="flex justify-between items-center gap-x-6 py-5 border-b">
        <h2 class="text-2xl">not found</h2>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const isOptionsExpanded = reactive([...Array(5).fill(false)])
const btnToggle = (target: number, visible: boolean) => {
  isOptionsExpanded[target] = visible
}
const indexOfEpisode = (url: string) => {
  return url.match(/\d+(?=\D*$)/g)?.join('')
}

const { filteredCharacters, searchInput, selectedStatus, updateFilteredCharacters, fetchCharacters } = useCharacters();
fetchCharacters();
</script>
