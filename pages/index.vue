<template>
  <main class="search">
    <section class="search__performance">
      <div>
        <span>status code:&nbsp;</span>
        <span>{{ state.statusCode }}</span>
      </div>
      <div>
        <span>chrono:&nbsp;</span>
        <span>{{ responseTime }}&nbsp;ms</span>
      </div>
    </section>

    <h1>Search</h1>

    <NuxtLink to="/favourites">Go Favourites</NuxtLink>

    <section class="search__header">
      <MenuDropdown
        :active-country="state.activeCountry"
        @country-select="updateCountry"
      />

      <input
        v-model="state.search"
        type="text"
        placeholder="Search university name"
        class="search__input"
      >

      <button type="button" @click="clearFilters">
        clear all filters
      </button>
    </section>

    <Spinner v-if="state.isLoading"/>

    <div v-else>
      <Table
        v-if="universities.length > 0"
        :universities="universities"
      />

      <span v-else class="search__no-result">
        No result found :(
      </span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

import type { University } from '@/types/app'

const state = reactive({
  activeCountry: 'Canada' as string,
  universityList: [] as University[],
  search: null as string | null,
  isLoading: false as boolean,
  statusCode: null as number | null,
  sendTime: null as number | null,
  getTime: null as number | null
})

const responseTime = computed<string | number>(() => state.getTime && state.sendTime ? state.getTime - state.sendTime : 'n/a')
const universities = computed<University[]>(() => [...new Map(state.universityList.map((uni: University) => [uni.name, uni])).values()])

async function updateCountry(country: string): Promise<void> {
  state.activeCountry = country
  state.search = null

  await fetchUniversitiesByCountry()
}

async function fetchUniversitiesByCountry(): Promise<void> {
  initTime()

  await useFetch(`http://universities.hipolabs.com/search?country=${state.activeCountry}`, {
    onRequest() {
      state.sendTime = new Date().getTime()
      state.isLoading = true
    },
    onResponse({response}) {
      setEndTime()
      state.universityList = response._data
      state.statusCode = response.status
      state.isLoading = false
    },
    onRequestError({ error }) {
      setEndTime()
      throw error
    },
    onResponseError({ response }) {
      setEndTime()
      state.statusCode = response.status
    },
  })
}

async function searchUniversity(): Promise<void> {
  initTime()

  await useFetch(`http://universities.hipolabs.com/search?name=${state.search}&country=${state.activeCountry}`, {
    onRequest() {
      state.sendTime = new Date().getTime()
      state.isLoading = true
    },
    onResponse({response}) {
      setEndTime()
      state.universityList = response._data
      state.statusCode = response.status
      state.isLoading = false
    },
    onRequestError({ error }) {
      setEndTime()
      throw error
    },
    onResponseError({ response }) {
      setEndTime()
      state.statusCode = response.status
    },
  })
}

function initTime(): void {
  state.sendTime = null
  state.getTime = null
}

function setEndTime(): void {
  state.getTime = new Date().getTime()
}

async function clearFilters(): Promise<void>{
  if (state.activeCountry !== 'Canada' || state.search) {
    state.activeCountry = 'Canada'
    state.search = null

    await fetchUniversitiesByCountry()
  }
}

const debouncedUniSearch = useDebounceFn(async () => {
  await searchUniversity()
}, 500, { maxWait: 1500 })

watch(
  () => state.search,
  async (val) => {
    if (val) {
      debouncedUniSearch()
    } else {
      await fetchUniversitiesByCountry()
    }
  }
);

onBeforeMount(async () => {
  await fetchUniversitiesByCountry()
})
</script>

<style lang="scss" scoped>
.search {
  padding: 40px;
  position: relative;

  a {
    display: inline-block;
    margin-bottom:  20px;
  }

  &__performance {
    position: absolute;
    background: rgba(black, 0.8);
    top: 0;
    right: 0;
    padding: 20px;
    border-radius: 4px;
    width: 180px;

    div {

      span {
        &:first-child {
          color: white;
        }
        &:last-child {
          color: yellowgreen;
        }
      }
    }
  }

  &__header {
    display: flex;
    flex-flow: row wrap;

    margin-bottom: 40px;

    button {
      margin-left: auto;
      text-transform: uppercase;
      border: 0;
      border-radius: 4px;
      background: rgb(112, 112, 155);
      color: white;
      cursor: pointer;
      padding: 0 8px;
      height: 40px;
    }
  }

  &__input {
    padding: 8px 12px;
    line-height: 1;
    border-radius: 4px;
    border: 1px solid lightgrey;
    font-size: 16px;
    margin-left: 20px;
    width: 300px;
  }

  &__no-result {
    text-align: center;
    display: block;
    font-size: 20px;
    margin-top: 80px;
  }
}

@media all and (max-width: 1100px) {
  .search {
    padding: 20px;
  }
}

@media all and (max-width: 700px) {
  .search {
    padding: 10px;

    &__header {


      button {
        margin-left: 0;
      }
    }

    &__input {
      margin: 10px 0;
      width: 100%;
    }
  }
}
</style>