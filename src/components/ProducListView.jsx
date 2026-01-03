import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProducListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="mt-3 rounded-md">
      <div
        className="
          bg-gray-100
          flex flex-col sm:flex-row
          gap-4 sm:gap-7
          p-3
          rounded-md
        "
      >
        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="
            w-full
            sm:w-48 md:w-56
            h-48 sm:h-48 md:h-56
            object-cover
            rounded-md
            cursor-pointer
            mx-auto sm:mx-0
          "
          onClick={() => navigate(`/products/${product.id}`)}
        />

        {/* Product Details */}
        <div className="flex flex-col space-y-2 w-full">
          <h1 className="font-bold text-base sm:text-lg md:text-xl line-clamp-3 hover:text-red-400">
            {product.description}
          </h1>

          <p className="font-semibold flex items-end gap-1 text-base sm:text-lg">
            <span>$</span>
            <span className="text-2xl sm:text-3xl md:text-4xl">
              {product.price}
            </span>
            <span className="text-sm sm:text-base">
              ({product.discountPercentage}% off)
            </span>
          </p>

          <p className="text-xs sm:text-sm text-gray-600">
            Fastest delivery available!
            <br />
            Order now and receive your product by{" "}
            <strong>Tomorrow, 4 Jan</strong>.
          </p>

          <button
            onClick={() => addToCart(product)}
            className="
              bg-red-500
              hover:bg-red-600
              text-white
              px-4 py-2
              rounded-md
              mt-2
              w-full sm:w-fit
            "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProducListView;
