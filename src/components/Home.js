import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pokemon from "./Pokemon";
import axios from "axios";
import DropDown from "./DropDown/main";

const likeDislikeOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Liked",
    value: true,
  },
  {
    label: "Disliked",
    value: false,
  },
];

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedPokemonType, setSelectedPokemonType] = useState("");
  const [likeDislikeSelectedOption, setLikeDislikeSelectedOption] =
    useState("");
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  let types = [
    ...new Map(pokemonTypes.map((item) => [item["name"], item])).values(),
  ].map(({ name, url }) => ({ label: name, value: name, url }));
  types.push({ label: "All", value: "", url: null });

  //setting an url from pokemon api
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=6");
  const [pokemonDex, setPokemonDex] = useState();
  const [joke, setJoke] = useState("");

  useEffect(() => {
    pokemon(selectedPokemonType);
    getJoke();
  }, [url, selectedPokemonType]);

  useEffect(() => {
    setSelectedPokemonType("");
  }, [nextUrl, prevUrl]);

  const pokemon = async (selectedPokemonType) => {
    setLoading(true);

    const res = await axios.get(url);

    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);

    getPokemon(res.data.results, selectedPokemonType);

    setLoading(false);
  };

  //listing out the pokemon function

  const getPokemon = async (res, type) => {
    res.forEach(async (item) => {
      const result = await axios.get(item.url);

      let pokemonTypesData = [...pokemonData, result.data];
      pokemonTypesData = pokemonTypesData
        .map((p) => p.types.map((pp) => pp.type))
        .flat();
      setPokemonTypes([...pokemonTypes, ...pokemonTypesData]);

      setPokemonData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return type
          ? state.filter((p) =>
              p.types.map((t) => t.type.name).some((i) => i === type)
            )
          : state;
      });
    });
  };

  // Chuknorris joke-----------------

  const getJoke = async () => {
    const res = await fetch(`https://api.chucknorris.io/jokes/random`);
    const chukJoke = await res.json();
    setJoke(chukJoke.value);
  };

  const handleOnChangeSelectedPokemonType = ({ target }) => {
    setSelectedPokemonType(target.value);
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
    <>
      <div className="container home">
        <h1 className="text-center text-white pb-2">Pokemon Collections</h1>
        <div className="row d-flex justify-content-between m-5">
          <DropDown
            options={types}
            value={selectedPokemonType}
            onChange={handleOnChangeSelectedPokemonType}
          />
          <DropDown options={likeDislikeOptions} />
          <DropDown />
        </div>
        <div className="row ">
          <div className="col-7 col-md-7 add-card">
            <PokemonCard
              jokeFunction={getJoke}
              pokemons={pokemonData}
              loading={loading}
              infoPokemon={(poke) => setPokemonDex(poke)}
            />
            <div className="btn-group">
              {
                // function pagination previous button with condition
                prevUrl && (
                  <button
                    onClick={() => {
                      setPokemonData([]);
                      setUrl(prevUrl);
                    }}
                  >
                    Prev
                  </button>
                )
              }

              {
                // function pagination previous button with condition
                nextUrl && (
                  <button
                    onClick={() => {
                      setPokemonData([]);
                      setUrl(nextUrl);
                    }}
                  >
                    Next
                  </button>
                )
              }
            </div>
          </div>
          <div className="col-4 col-md-4 mx-auto poke-details  text-white">
            <Pokemon
              handleToggleLikeDislike={handleToggleLikeDislike}
              data={pokemonDex}
              chukJoke={joke}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
