<template>
  <section class="mb-32">
    <Container>
      <header class="flex flex-col items-center space-y-4 mb-12">
        <h2 class="text-center text-3xl font-bold">{{ episode.name }}</h2>
        <p>{{ episode.air_date }}</p>
      </header>
      <div class="grid gap-6 lg:grid-cols-4">
        <div
            v-for="(num, index) in 10"
            :key="index"
            class="zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20">
          <img
              src="https://mdbcdn.b-cdn.net/img/new/standard/nature/051.jpg"
              class="w-full align-middle transition duration-300 ease-linear" />
          <div
              class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
            <div class="flex h-full items-end justify-start">
              <div class="m-6 text-white">
                <NuxtLink to="/" class="mb-3 text-lg font-bold before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:rounded-lg before:bg-transparent before:z-10 before:transition before:duration-300 before:ease-in-out before:hover:bg-[hsla(0,0%,99%,0.15)]">I miss the sun {{ num }}</NuxtLink>
                <p>
                  <small
                  >Published <u>13.01.2022</u> by Anna Maria Doe</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import {AxiosResponse} from "axios";
import { IEpisode } from "~/types/Episode";
import Container from "~/components/Container.vue";

const nuxtApp = useNuxtApp()
let episode = reactive({});
const route = useRoute()

onMounted(async () => {
  try {
    const {data}: AxiosResponse<{ data: IEpisode }> = await nuxtApp.$axios.get(`/api/episode/${route.params.id}`);
    episode = data;
  } catch (error) {
    console.error(error);
  }

  console.log(episode)
});
</script>

<style scoped lang="scss">
.zoom:hover img {
  transform: scale(1.1);
}
</style>
