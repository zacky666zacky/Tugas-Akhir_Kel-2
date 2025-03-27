import React from "react";

const foods = [
  {
    id: 1,
    nama: "Nasi goreng",
    harga: 10000,
  },
  {
    id: 2,
    nama: "Mie goreng",
    harga: 12000,
  },
  {
    id: 3,
    nama: "Soto",
    harga: 15000,
  },
  {
    id: 4,
    nama: "Martabak",
    harga: 5000,
  },
];

// fungsi reduce
const total_bayar = foods.reduce((total, food) => total + food.harga, 0);

const Map = () => {
  return (
    <>
      <h1>Daftar Makanan</h1>
      <ul>
        {foods.map((food) => {
          return (
            <li key={food.id}>
              {food.id}. {food.nama} - Harga : {food.harga}
            </li>
          );
        })}
      </ul>
      <h2>Map Fillters Harga yang lebih dari 11.000</h2>
      <ul>
        {foods
          .filter((food) => food.harga > 11000)
          .map((food) => {
            return (
              <li key={food.id}>
                {food.id}. {food.nama} - Harga : {food.harga}
              </li>
            );
          })}
      </ul>

      <h3>Total harga = {total_bayar}</h3>
    </>
  );
};

export default Map;
