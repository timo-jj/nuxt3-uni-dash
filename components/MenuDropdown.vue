<template>
  <div ref="dropdownTarget" class="menu-dropdown">
    <div @click="handleDropdownClick">
      <input
        v-model="props.activeCountry"
        type="text"
        class="menu-dropdown__input"
      >
    </div>

    <ul v-if="data.listIsOpen" class="menu-dropdown__list">
      <input
        ref="formInput"
        v-model="data.search"
        type="text"
        placeholder="Search country"
        class="menu-dropdown__search"
      >

      <li
        v-for="country in data.countries"
        :key="country.code"
        @click="selectCountry(country.name)"
      >
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import CountryList from '@/models/countryList'

import type { Country } from '@/types/app'

const dropdownTarget = ref<HTMLElement | null>(null)
const formInput = ref<HTMLInputElement | null>(null)

const data = reactive({
  activeCountry: 'Canada' as string,
  countries: CountryList as Country[],
  listIsOpen: false as boolean,
  search: '' as string
})

const props = defineProps({
  activeCountry: {
    type: String as PropType<string>,
    default: ''
  },
})

const emit = defineEmits<{
  (eventName: 'country-select', countryName: string): void;
}>()

function handleDropdownClick(): void {
  data.listIsOpen = !data.listIsOpen

  nextTick(() => {
    formInput.value?.focus()
  })
}

function selectCountry(countryName: string): void {
  emit('country-select', countryName)

  data.listIsOpen = false
  data.search = ''
}

watch(
  () => data.search,
  (val) => {
    if (val) {
      data.countries = data.countries.filter((country: Country) => country.name.toLowerCase().includes(data.search.toLowerCase()))
    } else {
      data.countries = CountryList
    }
  }
)

onClickOutside(dropdownTarget, () => data.listIsOpen = false)
</script>

<style lang="scss" scoped>
.menu-dropdown {
  position: relative;

  &__input,
  &__list {
    border-radius: 4px;
    border: 1px solid lightgrey;
    font-size: 16px;
  }

  &__input {
    padding: 8px 12px;
    line-height: 1;
    pointer-events: none;
  }

  &__list {
    position: absolute;
    background: white;
    margin: 0;
    padding: 12px 0;
    list-style: none;
    max-height: 250px;
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    width: 250px;
    top: 105%;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }

    li {
      padding: 4px 12px;
      transition: all .2s ease-in-out;

      &:hover {
        background: rgb(188, 183, 136);
        color: white;
        cursor: pointer;
      }
    }
  }

  &__search {
    margin: 0 12px 10px;
    width: 200px;
    line-height: 1;
    border: 1px solid lightgrey;
    border-radius: 4px;
    padding: 4px;
    outline: 2px solid rgb(129, 129, 177);
  }
}
</style>