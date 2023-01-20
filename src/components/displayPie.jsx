import React, { useState, useEffect } from "react";
import {PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function DisplayPie() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("https://fakestoreapi.com/products/categories"),
      fetch("https://fakestoreapi.com/products"),
    ])
      .then(([resCategory, resProducts]) =>
        Promise.all([resCategory.json(), resProducts.json()])
      )
      .then(([dataCategory, dataProduts]) => {
        setCategory(dataCategory);
        setProducts(dataProduts);
      });
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  const pieData = [
    {
      name: category[0],
      value: products.filter((item) => item.category === category[0]).length,
    },
    {
      name: category[1],
      value: products.filter((item) => item.category === category[1]).length,
    },
    {
      name: category[2],
      value: products.filter((item) => item.category === category[2]).length,
    },
    {
      name: category[3],
      value: products.filter((item) => item.category === category[3]).length,
    },
  ];

 

  return (
  

    <div className="flex justify-center m-24">
    <PieChart width={400} height={400}>
    <Pie
      dataKey="value"
      isAnimationActive={true}
      data={pieData}
      cx={200}
      cy={200}
      outerRadius={100}
      fill="#8884d8"
      label
    />
    <Tooltip />
  </PieChart>
  </div>
  );
}

export default DisplayPie;
