import React, { useContext } from "react";
import { DataContext, getData } from "../context/DataContext";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const { data, fetchAllProducts } = getData();
  console.log(data);
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllProducts();
  }, [])

 const SamplePrevArrow = (props) => {
   const {className, style, onClick} =props;
   return(
     <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
       < ChevronLeft className="arrows" style={{...style, display: "block", borderRadius:"50px", background:'#f53347', color:"white", position:"absolute", padding:"2px", left:"50px"}} onMouseOver="this.style.backgroundColor='#555"/>
     </div>
   )
 }

 const SampleNextArrow = (props) => {
   const {className, style, onClick} =props;
   return(
    <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
       < ChevronRight className="arrows" style={{...style, display: "block", borderRadius:"50px", background:'#f53347', color:"white", position:"absolute", padding:"2px", right:"50px"}} onMouseOver="this.style.backgroundColor='#555"/>
     </div>
   )
 }

  var settings = {
    dots: false,
    autoplay:true,
    autoplaySpeed:5000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover:false,
    nextArrow:<SampleNextArrow to="next"/>,
    prevArrow:<SamplePrevArrow to="prev"/>,
  };

  return (
    <div>
      <Slider {...settings}>
        {
          data?.slice(0,10)?.map((item,index)=>{
            return <div key={index} className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10">
              <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4">
                <div className="space-y-6 ">
                  <h3 className="text-red-500 font-semibold font-sans text-sm">Your Everyday Shopping Destination</h3>
                  <h1 className="text-white text-4xl font-bold uppercase line-clamp-3 md:w-[500px]">{item.title}</h1>
                  <p className="md:w-[500px] line-clamp-3 text-gray-400">{item.description}</p>
                  <button onClick={()=>navigate('/products')} className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 cursor-pointer py-2 rounded-md mt-2">Shop Now</button>
                </div>
                <div>
                  <img src={item.thumbnail} alt={item.title} className="rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400 bg-white"/>
                </div>
              </div>
            </div>
          })
        }
     </Slider>
     <Category/>
    </div>
  );
};

export default Carousel;
