import React, { useRef } from "react";
import { getData } from "../context/DataContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const scrollRef = useRef(null);
  const { data } = getData();
  const navigate = useNavigate();

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property]);
    return [...new Set(newVal)];
  };

  const categoryOnlyData = getUniqueCategory(data, "category");

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="bg-[#101829] relative py-4">
      {/* Left Arrow (md+) */}
      <button
        onClick={scrollLeft}
        className="
          hidden md:flex
          absolute left-2 top-1/2 -translate-y-1/2
          z-10
          bg-[#1c2541]
          text-white
          p-2 rounded-full
          hover:bg-[#ff4d6d]
          transition
        "
      >
        <ChevronLeft size={20} />
      </button>

      {/* Categories */}
      <div
        ref={scrollRef}
        className="
          max-w-7xl mx-auto
          px-3 sm:px-6 md:px-12
          flex gap-3
          flex-wrap md:flex-nowrap
          md:overflow-x-scroll
          md:whitespace-nowrap
          justify-center md:justify-start
          scroll-smooth
          hide-scrollbar
        "
      >
        {categoryOnlyData.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(`/category/${item}`)}
            className="
              shrink-0
              text-white
              capitalize
              px-5 py-2
              rounded-full
              bg-[#1c2541]
              hover:bg-[#ff4d6d]
              active:scale-95
              transition
              text-sm sm:text-base
            "
          >
            {item.replaceAll("-", " ")}
          </button>
        ))}
      </div>

      {/* Right Arrow (md+) */}
      <button
        onClick={scrollRight}
        className="
          hidden md:flex
          absolute right-2 top-1/2 -translate-y-1/2
          z-10
          bg-[#1c2541]
          text-white
          p-2 rounded-full
          hover:bg-[#ff4d6d]
          transition
        "
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Category;
