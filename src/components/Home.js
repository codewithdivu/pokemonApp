import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pokemon from "./Pokemon";
import axios from "axios";
import DropDown from "./DropDown/main";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonRegions, setPokemonRegions] = useState([]);
  const [selectedPokemonType, setSelectedPokemonType] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  //setting an url from pokemon api
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=9");
  const [pokemonDex, setPokemonDex] = useState();
  const [joke, setJoke] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    pokemon("https://pokeapi.co/api/v2/pokemon?limit=9");
    getJoke();
  }, []);

  const pokemon = async (url) => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      if (res.data) {
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  //listing out the pokemon function

  const getPokemon = async (res) => {
    const allPokemonData = await res.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    });
    const rr = await Promise.all(allPokemonData);
    let pokemonTypesData = rr
      .map((item) => item.types)
      .flat()
      .map((type) => ({ label: type.type.name, value: type.type.name }));
    pokemonTypesData = [
      ...new Set(pokemonTypesData.map((item) => item.value)),
    ].map((item) => ({ label: item, value: item }));

    setPokemonTypes([{ label: "All", value: "" }, ...pokemonTypesData]);

    const allLocationData = rr.map(async (i) => {
      const res = await axios.get(i.location_area_encounters);
      return {
        ...i,
        locations: [...res.data].map(({ location_area }) => location_area),
      };
    });

    const pp = await Promise.all(allLocationData);

    let formattedData = pp?.map((a) => a.locations).flat();
    formattedData = [...new Set(formattedData.map((item) => item.name))].map(
      (item) => ({ label: item.split("-").join(" "), value: item })
    );
    setPokemonData([...pp]);
    setPokemonRegions([{ label: "All", value: "" }, ...formattedData]);
  };

  const getJoke = async () => {
    const res = await fetch(`https://api.chucknorris.io/jokes/random`);
    const chukJoke = await res.json();
    setJoke(chukJoke.value);
  };

  const handleOnChangeSelectedPokemonType = ({ target }) =>
    setSelectedPokemonType(target.value);

  const handleToggleLikeDislike = (pid, isLiked) => {
    let likedPokemon = [...pokemonData];
    likedPokemon = likedPokemon.map((p, index) =>
      index === pid ? { ...p, isLiked: isLiked ? false : true } : p
    );
    setPokemonData(likedPokemon);
    localStorage.setItem("pokemonData", JSON.stringify(likedPokemon));
    setPokemonDex({
      ...likedPokemon.find((t, index) => index === pid),
      index: pid,
    });
  };

  let filteredPokemonData = selectedPokemonType
    ? pokemonData.filter((p) =>
        p.types.map((t) => t.type.name).some((pk) => pk === selectedPokemonType)
      )
    : pokemonData;

  filteredPokemonData = selectedRegion
    ? filteredPokemonData.filter((p) =>
        p?.locations.some((l) => l.name === selectedRegion)
      )
    : filteredPokemonData;

  return (
    <>
      <div className="container home">
        <h1 className="text-center text-white pb-2">Pokemon Collections</h1>
        <button className="btn btn-primary" onClick={() => navigate("/liked")}>
          Go to Liked Pokemon Page
        </button>
        <div className="row d-flex justify-content-around m-5">
          <DropDown
            options={pokemonTypes}
            value={selectedPokemonType}
            onChange={handleOnChangeSelectedPokemonType}
          />
          <DropDown
            options={pokemonRegions}
            value={selectedRegion}
            onChange={({ target }) => setSelectedRegion(target.value)}
          />
        </div>
        <div className="row ">
          <div className="col-7 col-md-7 add-card">
            <PokemonCard
              jokeFunction={getJoke}
              pokemons={filteredPokemonData}
              loading={loading}
              infoPokemon={(poke) => setPokemonDex(poke)}
              handleToggleLikeDislike={handleToggleLikeDislike}
            />
            <div className="btn-group">
              {prevUrl && (
                <button
                  onClick={() => {
                    pokemon(prevUrl);
                  }}
                >
                  Prev
                </button>
              )}

              {nextUrl && (
                <button
                  onClick={() => {
                    pokemon(nextUrl);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
          <div className="col-4 col-md-4 mx-auto poke-details  text-white">
            <Pokemon data={pokemonDex} chukJoke={joke} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
