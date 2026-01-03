import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { DataProvider } from './context/DataContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <CartProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
    <ScrollToTop
  smooth
  top={300}
  style={{
    backgroundColor: "#ef4444",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    right: "20px",
    bottom: "90px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
    zIndex: 50,

   
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
  component={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={2.5}
      width={20}
      height={20}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 15l7-7 7 7"
      />
    </svg>
  }
/>

    <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"

    />
    </ClerkProvider>
    </CartProvider>
    </DataProvider>
  </StrictMode>,
)
