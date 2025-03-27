import React from "react";

function Job(props) {
  return <h1>Fullstack {props.job}</h1>;
}

const Alamat = ({ alamat }) => {
  return <h1>Bandung {alamat}</h1>;
};

const Stateless = (props) => {
  return (
    <>
      <h1>Hallo, nama saya {props.nama} </h1>
      <Job job="be" />
      <Alamat alamat="bandung" />
    </>
  );
};

export default Stateless;
