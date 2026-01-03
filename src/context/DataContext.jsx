import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products?limit=200"
      );

      // ✅ electronics categories only
      //  const electronics = res.data.products.filter((item) =>
      //   ["smartphones", "laptops", "mobile-accessories","tablets","mens-watches","womens-watches",].includes(item.category)
      //  );

      //console.log(electronics); // ✅ array
      //setData(electronics);
      setData(res.data.products)
      
    } catch (error) {
      console.log(error);
    }

    
  };

  const getUniqueCategory = (data, property) => {
      let newVal = data?.map((curElem) => curElem[property]);
      return ["ALL",...new Set(newVal)];
    };
  
    const categoryOnlyData = getUniqueCategory(data, "category");

    const brandOnlyData = getUniqueCategory(data, "brand")
  
  return (
    <DataContext.Provider value={{ data, fetchAllProducts , categoryOnlyData, brandOnlyData}}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = ()=> useContext(DataContext);