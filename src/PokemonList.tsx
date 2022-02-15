import { Pokemon } from "@favware/graphql-pokemon";
import "./PokemonList.css";

export default function PokemonList({ pokemons }: { pokemons: Pokemon[] }) {
  if (!pokemons) {
    return "";
  }
  return pokemons.map((pokemon: Pokemon) => (
    <div className="pokemon-pre" key={pokemon.num}>
      <div>
        <img src={pokemon.sprite} alt={pokemon.species} />
      </div>
      <div>
        <h2>{pokemon.species}</h2>
        <p>{pokemon.types}</p>
      </div>
    </div>
  ));
}
