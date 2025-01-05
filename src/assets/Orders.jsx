import React, { useContext } from 'react'
import { dataContext } from "../App"
import { FaSearch } from 'react-icons/fa'
import { CustomLoading } from './Loading'




const Orders = () => {
  const { orders, orderSpin, filterOrders, setFilterOrders } = useContext(dataContext)


  // select filter function 
  const inputSelectHandleFunc = (e) => {
    const inputText = e.target.value
    if (inputText === "all") {
      setFilterOrders(orders)
    } else {
      const remainOrders = orders.filter((item) => item.orderStatus.toLowerCase().includes(inputText.toLowerCase()))
      setFilterOrders(remainOrders)
    }
  }

  return (
    <div className='mt-[6.1rem] p-3 lg:p-5'>
      <h5 className='text-center text-2xl font-semibold mb-3 '>All Orders : {filterOrders.length}</h5>
      <hr className='border border-gray-400 mb-5' />
      <div className='mb-2 lg:w-full '>
        <div className='lg:flex lg:justify-center '>
          <div className='relative   lg:w-[50%]  '>
            <input type="text" placeholder='Search for Orders' className='w-full border-2 rounded-full h-[2.5rem] pl-4 border-indigo-500 outline-2 placeholder:text-gray-600 outline-indigo-700 ' />
            <FaSearch size={20} className='absolute top-[0.6rem] text-gray-500 right-6' />
          </div>
        </div>
        <div className='flex justify-between w-full mt-5'>

          <select
            name="options"
            id="options"
            className="border-2 w-[5rem] outline-none border-blue-500 rounded p-1"
            defaultValue=""
          >
            <option
              value=""
              disabled
              className="text-gray-400 "
            >
              Date
            </option>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="confirmed">Yesterday</option>
            <option value="shipped" >1 Day Before</option>
            <option value="shipped" >2 Days Before</option>
            <option value="shipped" >3 Days Before</option>
            <option value="shipped" >4 Days Before</option>
            <option value="shipped" >5 Days Before</option>
          </select>
          <select
            name="options"
            id="options"
            onChange={inputSelectHandleFunc}
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
            {filterOrders.length > 0 ?
              <div className='lg:flex lg:flex-wrap lg:justify-center lg:gap-4 '>
                {filterOrders.map((item) => (
                  <div key={item._id} className='lg:w-[35%] border bg-orange-300 hover:shadow-gray-400 relative  mb-3 shadow-md rounded shadow-gray-300 p-3'>

                    <div>
                      <h6 className='text-white rounded p-1 px-2 bg-blue-500 w-fit'>Order From :  <span className='font-semibold capitalize text-white'>{item.shippingAddress[0].name}</span></h6>
                      <h6 className='text-gray-600 mt-1'>Total Amount : <span className='font-semibold capitalize text-black'>₹{item.totalAmount}</span></h6>
                      <h6 className='text-gray-600 mt-1'>Order Status : <span className={`font-semibold capitalize ${item.orderStatus === "pending" ? "bg-white text-orange-700 rounded p-1 px-2" : ""} ${item.orderStatus === "cancelled" ? "bg-red-600 text-white rounded p-1 px-2" : ""} ${item.orderStatus === "confirmed" ? "bg-green-600 text-white rounded p-1 px-2" : ""} ${item.orderStatus === "delivered" ? "bg-green-600 text-white rounded p-1 px-2" : ""} ${item.orderStatus === "shipped" ? "bg-green-600 text-white rounded p-1 px-2" : ""} ${item.orderStatus === "outofdelivery" ? "bg-green-600 text-white rounded p-1 px-2" : ""}`}>{item.orderStatus}</span></h6>
                      <h6 className='text-gray-600 mt-1'>Address : <span className='font-semibold capitalize text-black'>{item.shippingAddress[0].city}</span></h6>
                      <h6 className='text-gray-600 mt-1'>Mobile : <span className='font-semibold capitalize text-black'>{item.shippingAddress[0].phone}</span></h6>
                      <h6 className='text-gray-600 mt-1'>Ordered date : <span className='font-semibold capitalize text-black'>{item.orderDate}</span></h6>


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