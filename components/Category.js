"use client";

import React, { useEffect, useState } from "react";

function Category(props) {
  /*
    props:
        title: string
        notes: list[string]
        confidence: int [1, 3]

    */

  const [bgColor, setBgColor] = useState("bg-gray-300");
  const [bgHover, setBgHover] = useState("hover:bg-gray-200");
  const [bgRing, setBgRing] = useState("focus:bg-gray-500");

  const assignBg = (confidence) => {
    switch (confidence) {
      case 1:
        setBgColor("bg-red-300");
        setBgHover("hover:bg-red-400");
        setBgRing("focus:ring-red-500");
        break;
      case 2:
        setBgColor("bg-yellow-200");
        setBgHover("hover:bg-yellow-300");
        setBgRing("focus:ring-yellow-500");
        break;
      case 3:
        setBgColor("bg-green-300");
        setBgHover("hover:bg-green-400");
        setBgRing("focus:ring-green-500");
        break;
    }
  };

  useEffect(() => {
    assignBg(props.confidence);
  }, []);

  return (
    <button
      className={`w-48 h-36 m-6 ${bgColor} ${bgHover} focus:ring ${bgRing} flex justify-center rounded-md`}
    >
      <h1 className="text-white text- m-2 font-bold">{props.title}</h1>
    </button>
  );
}

export default Category;
