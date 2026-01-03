import React, { useState, useEffect } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductsCard from "../components/ProductsCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";

const Product = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [brand, SetBrand] = useState("ALL");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (e) => {
    SetBrand(e.target.value);
    setPage(1);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "ALL" || item.category === category) &&
      (brand === "ALL" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 mb-10">
      {data?.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Filter (Sidebar on desktop, drawer on mobile handled internally) */}
          <FilterSection
            search={search}
            setSearch={setSearch}
            brand={brand}
            SetBrand={SetBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            category={category}
            setCategory={setCategory}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
          />

          {/* Products */}
          {filteredData?.length > 0 ? (
            <div className="flex flex-col items-center w-full">
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  gap-5
                  mt-4
                "
              >
                {filteredData
                  ?.slice(page * 8 - 8, page * 8)
                  .map((product, index) => (
                    <ProductsCard key={index} product={product} />
                  ))}
              </div>

              <Pagination
                pageHandler={pageHandler}
                page={page}
                dynamicPage={dynamicPage}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center w-full mt-10">
              <Lottie
                animationData={notfound}
                className="w-[250px] sm:w-[400px]"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[200px]">
          <video muted autoPlay loop className="w-28">
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Product;
