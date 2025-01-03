import React, { useState } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'

const ProductOverView = () => {
  const { id } = useParams()
  const [btnToggle, setBtnToggle] = useState(true)



  return (
    <div className='mt-[6.1rem] p-3 lg:p-5 pb-9'>

      <h5 className='text-center text-[1.2rem] font-seri font-semibold'>
        Product Over View & Update
      </h5>
      <hr className='border  border-gray-200 mb-3 mt-1' />
      <div className='flex justify-around pb-3'>
        <Link to="." onClick={() => setBtnToggle(true)} className={` hover:border-blue-700 cursor-pointer font-semibold select-none ${btnToggle ? "bg-blue-500 text-white font-semibold rounded-full  text-center border border-blue-500 px-3  py-1" : "py-1  text-black font-semibold rounded-full border border-gray-400 px-3 text-center  "}`}>
          Product
        </Link>
        <Link to="updateproduct" onClick={() => setBtnToggle(false)} className={`hover:border-blue-700 cursor-pointer font-semibold select-none ${!btnToggle ? " w-20 text-center bg-blue-500 text-white font-semibold rounded-full   border border-blue-500  py-1" : "py-1   w-20 text-center  text-black font-semibold rounded-full border border-gray-400 "}`}>Update</Link>
      </div>

      <hr className='border border-dashed border-gray-400 mb-5' />
      {btnToggle ? <>

        <div>
          hello i am product
        </div>
      </>
        :

        <Outlet context={{ id }} />
      }

    </div>
  )
}

export default ProductOverView