<template>
  <Container>
    <UIButtonBack/>
    <section v-if="character" class="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32">
      <div id="profile" class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
        <div class="p-4 md:p-12 text-center lg:text-left">
          <h1 class="text-3xl font-bold pt-8 lg:pt-0">{{ character.name }}</h1>
          <div class="mx-auto lg:mx-0 pt-3 border-b-2 border-green-500 opacity-25"></div>
          <p class="pt-4 text-base font-bold flex items-center justify-center gap-2 lg:justify-start">
            <IconsSpecies/>
            {{ character.species }}
          </p>
          <p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center gap-2 lg:justify-start">
            <IconsLocation/>
            {{ character.location?.name}}
          </p>
        </div>
      </div>

      <div class="w-full lg:w-2/5">
        <img :src="character.image" class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block">
      </div>

    </section>
  </Container>
</template>

<script setup lang="ts">
  import {AxiosResponse} from "axios";
  import { ICharacter } from "~/types/Character";
  import UIButtonBack from "~/components/UIButtonBack.vue";

  const nuxtApp = useNuxtApp()
  const character = ref({});
  const route = useRoute()

  onMounted(async () => {
    try {
      const {data}: AxiosResponse<{ data: ICharacter }> = await nuxtApp.$axios.get(`/api/character/${route.params.id}`);
      character.value = data;
    } catch (error) {
      console.error(error);
    }
  });
</script>
