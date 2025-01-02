import React, { useContext, useEffect, useState } from 'react'
import { dataContext } from "../App"
import axios from 'axios'
import { CustomLoading, Loading } from './Loading'


const Products = () => {
  const { api } = useContext(dataContext)
  const [products, setProducts] = useState([])
  const [spin, setSpin] = useState(false)


  // fecth all products function 
  const fetchAllProducts = async () => {
    try {
      setSpin(true)

      const res = await axios.get(`${api}/product/get-all-products`)
      if (res) {
        console.log(res.data.retrievdProducts.reverse());

        setProducts(res.data.retrievdProducts.reverse())
        setSpin(false)

      }
    } catch (error) {
      console.error(error);
      setSpin(false)


    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])


  return (
    <>
      <div className='mt-[6.1rem] p-3 lg:p-5'>
        <h5 className='text-center text-2xl font-semibold mb-3 '>All Products : {products.length}</h5>
        <hr className='border border-gray-400 mb-5' />

        {/* mapping products  */}
        <div>
          {spin ?
            <CustomLoading customHeight="h-[55vh]" />
            :
            <>
              {products.length > 0 ? <>
                {products.map((item) => (
                  <div key={item._id} className=' flex border relative items-start gap-3 mb-3 shadow-md rounded shadow-gray-300 p-2'>
                    <div className='flex gap-2 w-[150px] overflow-auto rounded'>
                      {item.itemImage.map((itemImg) => (
                        <img className='w-full rounded' key={itemImg} src={itemImg} alt={item.itemName} />
                      ))
                      }
                    </div>
                    <div>
                      <h5>Name :  <span className='font-semibold capitalize'>{item.itemName}</span></h5>
                      <h6>Cost : <span className='font-semibold capitalize'>{item.itemCost}</span></h6>
                      <h6>Stock : <span className='font-semibold capitalize'>{item.itemStock}</span></h6>

                    </div>

                  </div>

                ))}
              </> :
                <div className='flex justify-center items-center w-full h-[50vh]'>
                  <h5 className='text-[1.2rem] font-semibold'>
                    No Products
                  </h5>
                </div>
              }
            </>

          }

        </div>
      </div>
    </>
  )
}


export default Products