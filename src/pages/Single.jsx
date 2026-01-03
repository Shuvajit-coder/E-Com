import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const Single = () => {
  const [single, setSingle] = useState(null);
  const params = useParams();
  const { addToCart } = useCart();

  const getSingle = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${params.id}`
      );
      setSingle(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingle();
    window.scrollTo(0, 0);
  }, []);

  if (!single) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop className="w-28">
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  const originalPrice = Math.round(
    single.price + (single.price * single.discountPercentage) / 100
  );

  return (
    <div className="px-3 sm:px-4 pb-6">
      <Breadcrums title={single.description} />

      <div
        className="
          max-w-6xl mx-auto
          grid grid-cols-1
          md:grid-cols-2
          gap-6 md:gap-10
          md:p-6
        "
      >
        {/* Image */}
        <div className="w-full">
          <img
            src={single.thumbnail}
            alt={single.title}
            className="
              rounded-xl
              w-full
              h-[350px] sm:h-[350px] md:h-auto
              object-cover
            "
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            {single.title}
          </h1>

          <div className="text-sm sm:text-base text-gray-600 uppercase">
            {single.brand} / {single.category}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-red-500">
              ${single.price}
            </span>

            <span className="line-through text-gray-500">${originalPrice}</span>

            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              {single.discountPercentage}% OFF
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {single.description}
          </p>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="
                  w-16
                  text-center
                  outline-none
                  border-none
                  bg-transparent
                  py-1
                "
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => addToCart(single)}
              className="
                flex items-center justify-center gap-2
                px-6 py-3
                text-base sm:text-lg
                bg-red-500 hover:bg-red-600
                text-white
                rounded-md
                transition
                w-full sm:w-fit
              "
            >
              <IoCartOutline className="w-6 h-6" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
