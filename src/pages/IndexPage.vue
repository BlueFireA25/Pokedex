<template>
  <q-page>
    <example-component></example-component>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { ExampleComponent },
});
</script>
