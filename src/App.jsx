import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import Navbar from './assets/Navbar.jsx';
import Login from './assets/Login.jsx';
import { Routes, Route } from 'react-router-dom';
import Orders from "./assets/Orders.jsx"
import UploadProducts from "./assets/UploadProducts.jsx"
import Admin from "./assets/Admin.jsx"
import Products from "./assets/Products.jsx"
import AddCategory from './assets/AddCategory.jsx';
import UploadCarousel from './assets/UploadCarousel.jsx';
import Subscription from './assets/Subscription.jsx';
import axios from 'axios';
 

export const dataContext = createContext()

function App() {
  const api = import.meta.env.VITE_API;
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
 

 
  useEffect(() => {
    // retrieving token from localstorage 
    const token = localStorage.getItem("token")
    if (token) {
      setToken(JSON.parse(token))
      
    }
  }, [])

  
  useEffect(() => {
    // fetching user details 
    const fetchUser = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${api}/user/get-single-user`, {
          headers: {
            token: token
          }
        })
        if (response) {
          setUser(response.data.singleUser)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
    }

    if (token) {
      fetchUser()
    }

  }, [token])
  return (
    <>
      <dataContext.Provider value={{ token, setToken, api, user, setUser, loading, setLoading }}>
        {user.role === "admin" && token && (<Navbar />)}
        <Routes>


          {user.role === "admin" && token ? (<>
            <Route path="/" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/uploadproducts" element={<UploadProducts />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path='/carousel' element={<UploadCarousel />} />
            <Route path='/subscription' element={<Subscription />} />
          </>) : <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>}

        </Routes>
      </dataContext.Provider>
    </>
  )
}

export default App
