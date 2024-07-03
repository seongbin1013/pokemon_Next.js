"use client";

import { Pokemon } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("/api/pokemons");
        setPokemon(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();
  }, []);

  console.log(pokemon);
  return (
    <>
      <h1 className="text-4xl text-center my-10 ">포캣몬 도감</h1>
      <div className="grid grid-cols-6 gap-3 place-items-center ">
        {pokemon?.map((data: Pokemon) => {
          return (
            <div key={data.id} className="border-solid border-2 rounded-lg	p-10">
              <Link href={`/pokemonDetail/${data.id}`}>
                <Image
                  src={data.sprites.front_default}
                  alt="이미지"
                  width={100}
                  height={100}
                />
                <p>{data.korean_name}</p>
                <div>도감번호 : {data.id}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PokemonList;
