<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="border" elevated bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-uppercase text-weight-bold">
          <q-icon color="red-10" name="developer_board" size="35px" />
          Pokédex
        </q-toolbar-title>

        <div>Sebastián Ibagué Castro</div>
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-primary border" v-model="leftDrawerOpen">
      <q-list>
        <q-item-label
          class="text-h6 text-center text-uppercase text-white text-weight-bold"
          header
        >
          <q-icon color="red-10" name="developer_board" size="35px" /> Pokédex
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-item-label
        class="text-center text-white text-weight-bold"
        header
        side
        bottom
      >
        © Sebastián Ibagué Castro. All right reserver.
      </q-item-label>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Home',
    caption: 'Pokémon list',
    icon: 'home',
    link: '#',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
