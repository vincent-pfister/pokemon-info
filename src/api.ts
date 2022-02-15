import type { Query } from "@favware/graphql-pokemon";

interface Pokemon {
  num: number;
  species: string;
  types: readonly string[];
  sprite: string;
}

export async function getPokemon(name: string = "mew"): Promise<Pokemon[]> {
  const recieved = await fetch("https://graphqlpokemon.favware.tech/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
      query($pokemon: String!) {
        getFuzzyPokemon(pokemon: $pokemon take: 10) {
          num
          species
          types
          sprite
        }
      }
    `,
      variables: { pokemon: name }
    })
  })
    .then(
      (res) => res.json() as Promise<GraphQLPokemonResponse<"getFuzzyPokemon">>
    )
    .then((json) => json.data.getFuzzyPokemon);
  console.log("recieved:", recieved);
  const pokemons: Pokemon[] = recieved.map((data) => {
    return {
      num: data.num,
      species: data.species,
      types: data.types,
      sprite: data.sprite
    };
  });

  return pokemons;
}

interface GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> {
  data: Record<K, Omit<Query[K], "__typename">>;
}
