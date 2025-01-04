import React, { useContext } from 'react'
import {dataContext} from "../App"
import { FaSearch } from 'react-icons/fa'
import { CustomLoading } from './Loading'




const Orders = () => {
  const {orders , setOrders , orderSpin } = useContext(dataContext)



  return (
    <div className='mt-[6.1rem] p-3 lg:p-5'>
    <h5 className='text-center text-2xl font-semibold mb-3 '>All Orders : {orders.length}</h5>
    <hr className='border border-gray-400 mb-5' />
    <div className='mb-2 lg:w-full '>
      <div className='lg:flex lg:justify-center '>
        <div className='relative   lg:w-[50%]  '>
          <input type="text" placeholder='Search for Orders' className='w-full border-2 rounded-full h-[2.5rem] pl-4 border-indigo-500 outline-2 placeholder:text-gray-600 outline-indigo-700 ' />
          <FaSearch size={20} className='absolute top-[0.6rem] text-gray-500 right-6' />
        </div>
      </div>
      <div className='flex justify-end w-full mt-5'>
        <select
          name="options"
          id="options"
          className="border-2 outline-none border-blue-500 rounded p-1"
          defaultValue=""
        >
          <option
            value=""
            disabled
            className="text-gray-400 "
          >
            Filter
          </option>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="outofdelivery">Out of Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>

        </select>

      </div>
    </div>
    {/* mapping products  */}
    <div className='pt-2 mt-4 '>
      {orderSpin ?
        <CustomLoading customHeight="h-[55vh]" />
        :
        <>
          {orders.length > 0 ?
            <div className='lg:flex lg:flex-wrap lg:justify-center lg:gap-4 '>
              {orders.map((item) => (
                <div key={item._id} className='lg:w-[35%] flex border hover:shadow-gray-400 relative items-start gap-3 mb-3 shadow-md rounded shadow-gray-300 p-2'>
                  <div className='flex gap-2 w-[150px] overflow-auto rounded h-[130px]'>
                  </div>
                  <div>
                    <h6 className='text-gray-600'>Name :  <span className='font-semibold capitalize text-black'>{item.itemName}</span></h6>
                    <h6 className='text-gray-600'>Cost : <span className='font-semibold capitalize text-black'>{item.itemCost}</span></h6>
                    <h6 className='text-gray-600'>Stock : <span className='font-semibold capitalize text-black'>{item.itemStock}</span></h6>
                    <h6 className='text-gray-600'>Category : <span className='font-semibold capitalize text-black'>{item.itemCategory}</span></h6>

                  </div>

                </div>

              ))}
            </div> :
            <div className='flex justify-center items-center w-full h-[50vh]'>
              <h5 className='text-[1.2rem] font-semibold'>
                No Orders
              </h5>
            </div>
          }
        </>

      }

    </div>
  </div>
  )
}

export default Orders