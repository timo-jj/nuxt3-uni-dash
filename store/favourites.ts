import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import type { University } from '@/types/app'

export const useFavouritesStore = defineStore('favouritesUnis', () => {
  /** states */
  const state = reactive({
    favouritesUnis: useLocalStorage('favouritesUnis', [] as University[])
  })

  /** getters */
  const unisNames = computed<string[]>(() => [...new Set(state.favouritesUnis.map((university: University) => university.name))])

  /** actions */
  function addUniversity(university: University): void {
    state.favouritesUnis.push(university)
  }

  function removeUniversity(university: University): void {
    state.favouritesUnis = state.favouritesUnis.filter((uni: University) => uni.name !== university.name)
  }

  return {
    state,
    unisNames,
    addUniversity,
    removeUniversity
  }
})