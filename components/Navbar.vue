<template>
  <nav
      class="relative flex w-full items-center justify-between text-neutral-600 hover:text-neutral-700 focus:text-neutral-700 md:flex-wrap md:justify-start">
    <div class="flex w-full flex-wrap items-center justify-between">
      <NuxtLink to="/" class="w-10 text-neutral-700 h-10 transition duration-150 ease-in-out hover:text-neutral-950">
        <IconsHome class="w-full h-full"/>
      </NuxtLink>
      <div
          class="!visible hidden basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContentY">
        <ul class="flex flex-col lg:flex-row">
          <li class="mb-4 lg:mb-0 lg:pr-2">
            <NuxtLink
                class="block text-neutral-950 transition duration-150 ease-in-out hover:text-neutral-500"
                to="/"
                data-te-ripple-color="light"
            >Characters</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>
