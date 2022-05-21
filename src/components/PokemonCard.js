import React from "react";

const PokemonCard = ({ pokemons, loading, infoPokemon, jokeFunction }) => {
  return (
    <>
      {loading ? (
        <h1>loading ....</h1>
      ) : (
        pokemons.map((item, index) => {
          return (
            <div className="text-white" key={index} onClick={jokeFunction}>
              <div
                className="card bg-success p-3"
                key={item.id}
                onClick={() => infoPokemon({ ...item, index })}
              >
                <h5>{item.id}</h5>
                <img
                  src={item.sprites.front_default}
                  className="img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  {item.types.map(({ type }) => (
                    <p className="card-text">{type.name}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default PokemonCard;
