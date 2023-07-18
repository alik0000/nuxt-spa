<template>
  <div class="app">
    <header class="bg-white py-2 shadow-lg dark:bg-neutral-600 dark:text-neutral-200">
      <Container>
        <Navbar/>
      </Container>
    </header>
    <main>
      <Container>
        <slot/>
      </Container>
    </main>
  </div>
</template>
