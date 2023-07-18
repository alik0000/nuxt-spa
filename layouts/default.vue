<template>
  <div class="flex flex-col">
    <header class="bg-white py-2 shadow-lg dark:bg-neutral-600 dark:text-neutral-200">
      <Container>
        <Navbar/>
      </Container>
    </header>
    <main class="flex-auto">
      <Container>
        <slot/>
      </Container>
    </main>
  </div>
</template>
