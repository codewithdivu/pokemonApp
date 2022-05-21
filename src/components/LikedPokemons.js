import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import PokemonCard from "./PokemonCard";

export const LikedPokemons = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemonDex, setPokemonDex] = useState();

  useEffect(() => {
    if (localStorage.getItem("pokemonData")) {
      let localData = JSON.parse(localStorage.getItem("pokemonData"));
      localData = localData.filter((i) => i?.isLiked === true);
      setPokemonData(localData);
    }
  }, []);

  const getJoke = async () => {
    const res = await fetch(`https://api.chucknorris.io/jokes/random`);
    const chukJoke = await res.json();
    setJoke(chukJoke.value);
  };

  const handleToggleLikeDislike = (pid, isLiked) => {
    let likedPokemon = [...pokemonData];
    likedPokemon = likedPokemon.map((p, index) =>
      index === pid ? { ...p, isLiked: isLiked ? false : true } : p
    );
    setPokemonData(likedPokemon);
    setPokemonDex({
      ...likedPokemon.find((t, index) => index === pid),
      index: pid,
    });
  };

  return (
    <div className="container home">
      <h1 className="text-center text-white pb-2">Pokemon Collections</h1>
      <div className="row">
        <div className="col-7 col-md-7 add-card">
          <PokemonCard
            jokeFunction={getJoke}
            pokemons={pokemonData}
            loading={loading}
            infoPokemon={(poke) => setPokemonDex(poke)}
            handleToggleLikeDislike={handleToggleLikeDislike}
          />
        </div>
      </div>
      <div className="col-4 col-md-4 mx-auto poke-details  text-white">
        {/* <Pokemon
          handleToggleLikeDislike={handleToggleLikeDislike}
          data={pokemonDex}
          chukJoke={joke}
        /> */}
      </div>
    </div>
  );
};
