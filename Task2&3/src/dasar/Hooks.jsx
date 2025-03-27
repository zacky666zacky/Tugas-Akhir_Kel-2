import React from "react";
import { useEffect, useState } from "react";

const Hooks = () => {
  // constructor
  const [nilai, setNilai] = useState(0);

  //  lifecycle component
  useEffect(
    () => {
      // didmount & didupdate
      document.title = `Nilai ubah: ${nilai}`;
      console.log("didmount & didupdate");
      return () => {
        // willunmount
        console.log("willunmount");
        document.title = `Inixindo`;
      };
    },
    // willupdate
    [nilai]
  );

  return (
    <>
      <div>LifecycleComp</div>
      <p>Nilai saat ini adalah : {nilai}</p>
      <button onClick={() => setNilai(nilai + 1)}>Update Nilai</button>
    </>
  );
};

export default Hooks;
