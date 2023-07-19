<template>
  <section class="mb-32">
    <Container>
      <UIButtonBack/>
      <header class="flex flex-col items-center space-y-4 mb-12">
        <h2 class="text-center text-3xl font-bold">{{ episode.name }}</h2>
        <p>{{ episode.air_date }}</p>
      </header>
      <div class="grid gap-6 lg:grid-cols-4">
        <NuxtLink
            v-for="(url, index) in episode.characters"
            :key="index"
            :to="`/character/${url.split('/').pop()}`"
            class="zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20">
          <img
              :src="`${url.replace('/character', '/character/avatar')}.jpeg`"
              class="w-full align-middle transition duration-300 ease-linear" />
        </NuxtLink>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
  import {AxiosResponse} from "axios";
  import { IEpisode } from "~/types/Episode";

  const nuxtApp = useNuxtApp()
  const episode = ref({})
  const route = useRoute()

  onMounted(async () => {
    try {
      const {data}: AxiosResponse<{ data: IEpisode }> = await nuxtApp.$axios.get(`/api/episode/${route.params.id}`);
      episode.value = data;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<style scoped lang="scss">
.zoom:hover img {
  transform: scale(1.1);
}
</style>
