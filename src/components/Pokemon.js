import React from "react";
import users from "./Users";

const Pokemon = ({ data, chukJoke }) => {
  // random user function------------------
  const randomUser = (user) => {
    const randIndex = Math.floor(Math.random() * user.length);
    const username = user[randIndex];
    return username;
  };
  const result = randomUser(users);

  return (
    <div>
      {!data ? (
        ""
      ) : (
        <div>
          <div className="pokeinfo mx-auto text-center">
            <h5 className="poke-title mt-2 text-capitalize">
              <span className="text-danger">{result.name}</span> The{" "}
              <span className="text-primary">{data.name}</span>
            </h5>
            <img
              src={data.sprites.other.dream_world.front_default}
              className="card-img-top img-fluid"
              alt="..."
            />

            <p>{chukJoke}</p>

            <div className="poke-detail">
              <h3 className="text-warning">Basic Info</h3>

              <p>
                height:{data.height} | weight: {data.weight}
              </p>
            </div>

            {data.types.map((poke, index) => {
              return <p key={index}>Types: {poke.type.name}</p>;
            })}

            <div className="skill">
              <h3 className="text-warning">Skills</h3>
              {data.stats.map((poke, index) => {
                return (
                  <div key={index}>
                    <p>
                      {poke.stat.name} : {poke.base_stat}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
