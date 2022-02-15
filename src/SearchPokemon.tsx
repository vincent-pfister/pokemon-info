import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
  useQuery
} from "react-query";
import PokemonList from "./PokemonList";
import { getPokemon } from "./api";

export default function SearchPokemon() {
  const [name, setName] = useState("mew");
  const query = useQuery("pokemons", async () => getPokemon(name));

  return <div>{query.data && <PokemonList pokemons={query.data} />}</div>;
}
