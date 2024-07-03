import { Pokemon } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData(id: string): Promise<Pokemon> {
  const res = await fetch(`http://localhost:3000/api/pokemons/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async ({ params }: Pokemon) => {
  const pokemon = await getData(params.id);

  console.log(pokemon);
  return (
    <>
      <header>
        <div className="text-5xl">{pokemon.korean_name}</div>
        <div>No. {pokemon.id}</div>
      </header>
      <div
        key={pokemon.id}
        className="flex justify-center items-center flex-col"
      >
        <Image
          src={pokemon.sprites.front_default}
          alt="이미지"
          width={150}
          height={150}
        />
        <div className="text-xl">이름: {pokemon.korean_name}</div>
        <section className="flex gap-5 mt-1 ">
          <div>키 : {pokemon.height / 10} m</div>
          <div>몸무게 : {pokemon.weight / 10} kg</div>
        </section>
        <section className="flex gap-5 mt-1 ">
          <div>
            타입 :
            {pokemon.types.map((data, index) => {
              return <span key={index}>{data.type.korean_name}</span>;
            })}
          </div>
          <div className="space-x-1">
            특성 :
            {pokemon.abilities.map((data, index) => {
              return <span key={index}>{data.ability.korean_name}</span>;
            })}
          </div>
        </section>
        <div className="w-2/4 mt-6 space-x-2">
          기술 :
          {pokemon.moves.map((data, index) => {
            return <span key={index}>{data.move.korean_name}</span>;
          })}
        </div>
        <Link
          href={"/"}
          className="w-28 h-8 rounded-md bg-blue-600 mt-6 flex justify-center items-center"
        >
          뒤로가기
        </Link>
      </div>
    </>
  );
};

export default page;
