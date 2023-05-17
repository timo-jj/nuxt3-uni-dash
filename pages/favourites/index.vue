<template>
  <main class="favourites">
    <h1>Favourites</h1>

    <NuxtLink to="/">Back to Search</NuxtLink>

    <Table
      v-if="favouritesUnisStore.state.favouritesUnis.length > 0"
      :universities="favouritesUnisStore.state.favouritesUnis"
    />

    <span v-else class="favourites__empty">
      Favourites list is empty.
    </span>
  </main>
</template>

<script setup lang="ts">
import { useFavouritesStore } from '@/store/favourites'

const favouritesUnisStore = useFavouritesStore()
</script>

<style lang="scss" scoped>
.favourites {
  padding: 40px;

  a {
    display: inline-block;
    margin-bottom:  20px;
  }

  &__empty {
    text-align: center;
    display: block;
    font-size: 20px;
    margin-top: 80px;
  }
}

@media all and (max-width: 1100px) {
  .favourites {
    padding: 20px;
  }
}

@media all and (max-width: 700px) {
  .favourites {
    padding: 10px;
  }
}
</style>