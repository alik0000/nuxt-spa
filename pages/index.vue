<template>
  <div>
    <h2>main page</h2>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="({id, name, species, image, episode}, index) in characters" :key="id" class="flex justify-between items-center gap-x-6 py-5">
        <div class="flex gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="image" :alt="name">
          <div class="min-w-0 flex-auto">
            <NuxtLink :to="`/character/${id}`" class="text-sm font-semibold leading-6 text-gray-900">{{ name }}</NuxtLink>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ species }}</p>
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
                <li
                    v-if="episode.length > 5"
                    class="transition-colors duration-300 hover:bg-gray-200"
                >
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {AxiosResponse} from "axios";
import {ICharacter} from "~/types/Character";

const isOptionsExpanded = reactive([...Array(5).fill(false)])
const nuxtApp = useNuxtApp()
const characters = ref<ICharacter[]>([]);

const btnToggle = (target: number, visible: boolean) => {
  console.log(isOptionsExpanded)
  console.log(target)
  console.log(visible)
  isOptionsExpanded[target] = visible
}

const indexOfEpisode = (url: string) => {
  return url.match(/\d+(?=\D*$)/g)?.join('')
}

onMounted(async () => {
  try {
    const { data }: AxiosResponse<{ results: ICharacter[] }> = await nuxtApp.$axios.get('/api/character');
    characters.value = data.results;
  } catch (error) {
    console.error(error);
  }

  console.log('characters: ', characters.value)
});
</script>
