<template>
  <table class="table">
    <thead>
      <tr>
        <th>Name - {{ props.universities.length }}</th>
        <th>State / Province</th>
        <th>Website</th>
        <th>
          {{ route.name !== 'favourites' ? 'Add to /&nbsp;' : '' }}Remove from - Favourites
        </th>
      </tr>
    </thead>

    <TransitionGroup name="list" is="tbody">
      <tr
        v-for="uni in props.universities"
        :key="uni.name"
      >
        <td data-label="Name">{{ uni.name }}</td>

        <td data-label="State / Province">
          {{ uni["state-province"] ? uni["state-province"] : 'n/a' }}
        </td>

        <td data-label="Website">
          <div v-if="uni.web_pages.length > 0">
            <a
              v-for="webLink in uni.web_pages"
              :key="webLink"
              :href="webLink"
              target="_blank"
            >
              {{ webLink }}
            </a>
          </div>

          <span v-else>n/a</span>
        </td>

        <td data-label="Add / Remove favourites">
          <button
            tye="button"
            :class="[
              'table__cta',
              {
                'table__cta--remove': uniIsFavourite(uni.name)
              }
            ]"
            @click="handleClick(uni)"
          >
            {{ uniIsFavourite(uni.name) ? 'remove' : 'add'}}
          </button>
        </td>
      </tr>
    </TransitionGroup>
  </table>
</template>

<script setup lang="ts">
import { useFavouritesStore } from '@/store/favourites'

import type { University } from '@/types/app'

const route = useRoute()
const favouritesUnisStore = useFavouritesStore()

const props = defineProps({
  universities: {
    type: Object as PropType<University[]>,
    default: null
  },
});

function uniIsFavourite(name: string): boolean {return favouritesUnisStore.unisNames.includes(name)}

function handleClick(univeristy: University): void {
  uniIsFavourite(univeristy.name) ?
    favouritesUnisStore.removeUniversity(univeristy)
    :
    favouritesUnisStore.addUniversity(univeristy)
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;

  tr {
    text-align: left;

    th {
      &:last-child {
        width: 300px;
      }
    }
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;

    a {
      display: block;
    }
  }

  &__not-found {
    span {
      display: block;
      margin: 0 auto;
    }
  }

  &__cta {
    border: 0;
    padding: 4px 12px;
    width: 100px;
    text-transform: capitalize;
    border-radius: 4px;
    background: rgb(201, 186, 143);
    color: white;
    margin: 0 auto;
    display: block;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &--remove {
      background: rgb(156, 102, 102);
    }
  }
}

@media all and (max-width: 1100px) {
  .table {

    thead {
      display: none;
    }

    tr {
      display: block;
      margin-bottom: 20px;
      border-bottom: 5px solid lightblue;
    }

    td {
      display: block;
      font-size: 12px;
      text-align: right;
      border: 0;
      border-bottom: 1px solid #dddddd;

      &::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
      }

      &:last-child {
        border-bottom: 0;
      }
    }

    &__cta {
      display: initial;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>