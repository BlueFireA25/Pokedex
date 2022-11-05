import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export interface Pokemon {
  name: string;
  types: Types[];
  sprites: Sprites;
}

interface Types {
  slot: string;
  type: Type;
}

interface Type {
  name: string;
  url: string;
}

interface Sprites {
  versions: Versions;
}

interface Versions {
  'generation-viii': GenerationVIII;
}

interface GenerationVIII {
  icons: Icons;
}

interface Icons {
  front_default: string;
}

function defaultState(): Pokemon[] {
  return [];
}

export const usePokemonStore = defineStore('pokemon', {
  state: () => defaultState(),
  actions: {
    async fetchPokemons() {
      this.$state.splice(0);

      await api
        .get('pokemon?limit=151&offset=0')
        .then((response) => {
          for (const result of response.data.results) {
            const id = result.url.replace(
              'https://pokeapi.co/api/v2/pokemon/',
              ''
            );
            api.get(`pokemon/${id}`).then((response) => {
              this.$state.push(response.data);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async fetchPokemon(id: string): Promise<Pokemon> {
      return api.get(`pokemon/${id}`).then((pokemonRequest) => {
        return pokemonRequest.data as Pokemon;
      });
    },
  },
});
