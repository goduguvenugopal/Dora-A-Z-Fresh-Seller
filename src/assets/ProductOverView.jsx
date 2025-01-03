import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import { dataContext } from "../App"
import { CustomLoading } from './Loading'


const ProductOverView = () => {
  const { api } = useContext(dataContext)
  const { id } = useParams()
  const [btnToggle, setBtnToggle] = useState(true)
  const [product, setProduct] = useState({})
  const [spin, setSpin] = useState(false)
  const [imgUrl, setImgUrl] = useState("")

  useEffect(() => {
    // fetching single product 
    const getProduct = async () => {
      setSpin(true)
      try {
        const res = await axios.get(`${api}/product/get-single-product/${id}`)
        if (res) {
          console.log(res.data.retrievedSingleProduct);
          setProduct(res.data.retrievedSingleProduct)
          setSpin(false)

        }
      } catch (error) {
        console.error(error);
        setSpin(false)

      }
    }

    getProduct()
  }, [id])

  // set default image 
  useEffect(() => {
    if (product?.itemImage?.length) {
      setImgUrl(product.itemImage[0]);
    }
  }, [product]);

  return (
    <div className='mt-[6.1rem] p-3 lg:p-5 pb-9'>
      <h5 className='text-center text-[1.2rem] font-seri  font-semibold'>
        Product Over View & Update
      </h5>
      <hr className='border  border-gray-200 mb-3 mt-1' />
      <div className='flex justify-around pb-3'>
        <Link to="." onClick={() => setBtnToggle(true)} className={` hover:border-blue-700 cursor-pointer  font-semibold select-none ${btnToggle ? "bg-blue-500 text-white  font-semibold rounded-full  text-center border border-blue-500 px-3  py-1" : "py-1  text-black  font-semibold rounded-full border border-gray-400 px-3 text-center  "}`}>
          Product
        </Link>
        <Link to="updateproduct" onClick={() => setBtnToggle(false)} className={`hover:border-blue-700 cursor-pointer  font-semibold select-none ${!btnToggle ? " w-20 text-center bg-blue-500 text-white  font-semibold rounded-full   border border-blue-500  py-1" : "py-1   w-20 text-center  text-black  font-semibold rounded-full border border-gray-400 "}`}>Update</Link>
      </div>

      <hr className='border border-dashed border-gray-400 mb-5' />
      {btnToggle ? <>

        {spin ?
          <CustomLoading customHeight="h-[50vh]" />
          :
          <div className='lg:flex lg:items-start lg:justify-between'>
            <div className=' lg:w-2/4'>
              <img src={imgUrl} alt={product.itemName} className='rounded-md w-full' />
              <div className='flex w-full gap-2 flex-wrap mt-5'>
                {product?.itemImage?.map((item) => (
                  <img onClick={() => setImgUrl(item)} key={item} src={item} alt="product-img" className='w-[100px] rounded cursor-pointer border-2 hover:border-blue-600' />
                ))}
              </div>
            </div>

            <div className='mt-3 lg:mt-0 lg:w-[45%]'>
              <h5 className='text-2xl'>Product Details</h5>
              <hr className='border  border-gray-200 mb-2 mt-2' />
              <h5 className='text-gray-700 text-[1.1rem]'>Item Name : <span className='text-black font-semibold capitalize'>{product.itemName}</span></h5>
              <h5 className='text-gray-700 mt-2 text-[1.1rem]'>Item Cost : <span className='text-black font-semibold text-2xl'>₹{product.itemCost}</span></h5>

              <hr className='border  border-gray-200 mb-2 mt-1' />


              <h5 className='text-gray-700 text-[1.1rem]'>Item description : <span className='text-black font-semibold'>{product.itemDescription}</span></h5>
              <h5 className='text-gray-700 mt-2 text-[1.1rem]'>Item Half Kg Cost : <span className='text-black font-semibold'>₹{product.itemHalfKgCost}</span></h5>
              <h5 className='text-gray-700 mt-2 text-[1.1rem]'>Item Kg Cost : <span className='text-black font-semibold'>₹{product.itemKgCost}</span></h5>
              <h5 className='text-gray-700 mt-2 text-[1.1rem]'>Item Offer Cost : <span className='text-black font-semibold'>₹{product.offerCost}</span></h5>
              <h5 className='text-gray-700 mt-2 text-[1.1rem]'>Item Minimum Order Qty : <span className='text-black font-semibold'>{product.minOrderQty}</span></h5>
              <h5 className='text-gray-700 mt-2 text-[1.1rem]'>Item Stock : <span className='text-black font-semibold'>{product.itemStock}</span></h5>
              <h5 className='text-gray-700 mt-2 text-[1.1rem]'>Item Category : <span className='text-black font-semibold'>{product.itemCategory}</span></h5>
              <h5 className='text-gray-700 mt-2 text-[1.1rem]'>Item SubCategory : <span className='text-black font-semibold'>{product.itemSubCategory}</span></h5>
              <div className='flex items-start gap-1 mt-2'>

                <h5 className='text-gray-700  text-[1.1rem] '>Item Weight Available :
                </h5>
                {product?.itemWeight?.map((item) => (
                  <span key={item} className='text-black font-semibold mr-2'>{item} grams </span>
                ))}
              </div>
              <div className='flex items-start gap-1 mt-2'>

                <h5 className='text-gray-700  text-[1.1rem] '>Product Tags :
                </h5>
                {product?.productTags?.map((item) => (
                  <span key={item} className='text-black font-semibold mr-2'>{item}</span>
                ))}
              </div>
            </div>
          </div>
        }
      </>
        :
        <Outlet context={{ id , product}} />
      }

    </div>
  )
}

export default ProductOverView