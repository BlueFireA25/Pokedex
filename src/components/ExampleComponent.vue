<template>
  <div class="q-pa-md">
    <q-table
      class="text-capitalize"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      row-key="id"
      separator="cell"
      table-header-class="bg-amber-13"
      virtual-scroll
    >
      <template v-slot:top-left>
        <q-input
          class="text-grey-1"
          borderless
          color="black"
0          bg-color="amber-13"
          dense
          debounce="300"
          rounded
          outlined
          placeholder="Search Pokémon"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" color="white" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-sprite="props">
        <q-td :props="props">
          <img
            :src="
              props.row.sprites?.versions?.['generation-viii']?.icons
                ?.front_default
            "
            alt="mini-sprite"
          />
        </q-td>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { usePokemonStore, Pokemon } from 'stores/pokemon';

export default defineComponent({
  name: 'ExampleComponent',
  setup() {
    const store = usePokemonStore();
    const pokemon = store.$state;
    const columns = [
      {
        name: 'id',
        required: true,
        label: '#',
        align: 'center',
        field: 'id',
        sortable: true,
        style: 'width: 10px',
      },
      {
        name: 'sprite',
        required: true,
        label: 'Mini-Sprite',
        align: 'center',
        field: (row: Pokemon) =>
          row.sprites.versions['generation-viii'].icons.front_default,
        sortable: true,
        style: 'width: 10px',
      },
      {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'center',
        field: 'name',
        sortable: true,
      },
      {
        name: 'types',
        classes: 'text-uppercase',
        required: true,
        label: 'Types',
        align: 'center',
        field: (row: Pokemon) => {
          let f = '';
          for (let i of row.types) {
            f += `${i.type.name} `;
          }
          return f;
        },
        sortable: true,
      },
    ];
    const rows = ref(pokemon);
    const filter = ref('');
    const loading = ref(true);

    onMounted(async () => {
      setTimeout(() => {
        store.fetchPokemons().finally(() => {
          loading.value = false;
        });
      }, 3000);
    });

    return {
      store,
      pokemon,
      columns,
      rows,
      filter,
      loading,
    };
  },
});
</script>
