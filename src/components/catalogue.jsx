import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Catalogue() {
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

  const LongText = ({ content, limit }) => {
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false);

    if (content.length <= limit) {
      return <div>{content}</div>;
    }
    if (showAll) {
      return (
        <div>
          {content}
          <button
            onClick={showLess}
            className="underline text-blue-700 font-semibold hover:text-blue-500"
          >
            Read less
          </button>
        </div>
      );
    }
    const toShow = content.substring(0, limit) + " ...";
    return (
      <div>
        {toShow}
        <button
          onClick={showMore}
          className="underline text-blue-700 font-semibold hover:text-blue-500"
        >
          Read more
        </button>
      </div>
    );
  };

  console.log(category, products);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full">
      <div className="bg-cyan-500 h-16 flex justify-end  ">
        <h1 className=" font-serif italic text-cyan-900 mr-12 md:mr-40 lg:mr-56 mt-2 text-lg md:text-2xl lg:text-2xl font-semibold md:font-bold lg:font-bold hover:text-cyan-100">
          Product details
        </h1>

        <input
          type="text"
          placeholder=" Enter Category"
          className="border-2 m-2 rounded-lg p-2 w-1/4 mr-8 "
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {products
          .filter((item) => {
            if (searchTerm === "") {
              return item;
            } else if (
              item.category.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return item;
            }
          })

          .map((item) => {
            return (
              <div>
                <div className="flex items-stretch">
                  <div className="flex flex-col rounded-xl border-2 border-slate-500 p-4 m-3  ">
                    <div className="flex justify-center p-2 md:p-5 lg:p-5 drop-shadow-md hover:drop-shadow-xl ">
                      <img
                        src={item.image}
                        className="w-fit h-44 md:h-56 lg:h-56  "
                        alt="productImage"
                      />
                    </div>

                    <h5 className="p-3 ">{item.title}</h5>

                    <p className="p-3 ">
                      <LongText content={item.description} limit={150} />
                    </p>

                    <button type="button" className="btn btn-primary">
                      Category: {item.category}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="flex justify-end fixed bottom-0 right-0">
          <Link to="/pieChart" className="btn btn-warning m-4 w-32">
            ANALYSE
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
