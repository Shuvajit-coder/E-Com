import { useState } from 'react'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { useEffect } from 'react'
import axios from 'axios'
import Footer from './components/Footer'
import Single from './pages/Single'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const[openDropdown, setOpenDropdown] = useState(false)
  const[location, setLocation]= useState() 
  const{cartItem, setCartItem} = useCart()

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition( async pos => {
      const {latitude, longitude} = pos.coords
     // console.log(latitude, longitude);
      
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try{
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropdown(false)
        //console.log(exactLocation);
        
      }catch(error){
         console.log(error);
         
      }
    })
  }
  useEffect(()=>{
    getLocation()
  },[])

  

  

  return (
    <BrowserRouter>
     <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
       <Routes>
         <Route path='/' element={<Home/>}></Route>
         <Route path='/products' element={<Products/>}></Route>
         <Route path='/products/:id' element={<Single/>}></Route>
         <Route path='/category/:category' element={<CategoryProduct/>}></Route> 
         <Route path='/about' element={<About/>}></Route>
         <Route path='/contact' element={<Contact/>}></Route>
         
         <Route path='/cart' element={<ProtectedRoute><Cart location={location} getLocation={getLocation}/></ProtectedRoute>}></Route>
       </Routes>
       <Footer/>
    </BrowserRouter>
  )
}

export default App
