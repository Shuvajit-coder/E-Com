import React, { useState } from "react";
import { getData } from "../context/DataContext";
import { X, SlidersHorizontal } from "lucide-react";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = getData();
  const [open, setOpen] = useState(false);

  /* ✅ IMPORTANT:
     Use JSX variable instead of inline component
     to prevent input losing focus
  */
  const filterContent = (
    <>
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full px-3 py-2
          border border-gray-300
          rounded-lg
          focus:outline-none
          focus:ring-2 focus:ring-red-400
        "
      />

      {/* Category */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-3">Category</h2>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
          {categoryOnlyData?.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={category === item}
                value={item}
                onChange={handleCategoryChange}
                className="accent-red-500"
              />
              <span className="uppercase">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Brand</h2>
        <select
          value={brand}
          onChange={handleBrandChange}
          className="
            w-full px-3 py-2
            border border-gray-300
            rounded-md
            bg-white
            focus:outline-none
            focus:ring-2 focus:ring-red-400
          "
        >
          <option value="ALL">All Brands</option>
          {brandOnlyData?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Price</h2>
        <p className="text-sm text-gray-600 mb-1">
          ${priceRange[0]} – ${priceRange[1]}
        </p>
        <input
          type="range"
          min={0}
          max={5000}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-red-500 cursor-pointer"
        />
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setSearch("");
          setCategory("ALL");
          setBrand("ALL");
          setPriceRange([0, 5000]);
        }}
        className="
          mt-6 w-full
          bg-red-500 hover:bg-red-600
          text-white py-2
          rounded-md font-medium
          transition
        "
      >
        Reset Filters
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block bg-white p-5 rounded-md shadow-md w-64 sticky top-24">
        {filterContent}
      </aside>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden
          fixed bottom-4 right-4
          z-40
          bg-red-500 text-white
          p-3 rounded-full
          shadow-lg
        "
      >
        <SlidersHorizontal size={22} />
      </button>

      {/* Mobile Bottom Sheet */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div
            className="
              fixed bottom-0 left-0 right-0
              bg-white
              rounded-t-xl
              p-5
              max-h-[85vh]
              overflow-y-auto
            "
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {filterContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSection;
