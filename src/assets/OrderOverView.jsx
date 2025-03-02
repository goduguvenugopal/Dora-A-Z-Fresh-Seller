import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dataContext } from '../App'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { SmallLoading } from './Loading'


const OrderOverView = () => {
    const { orderId } = useParams()
    const { orders, api, setReload } = useContext(dataContext)
    const [orderDetails, setOrderDetails] = useState({})
    const [selectModal, setSelectModal] = useState(false)
    const [statusSpin, setStatusSpin] = useState(false)
    const [delayModal, setDelayModal] = useState(false)
    const [delayMessage, setDelayMessage] = useState("We apologize as your order will be delayed for a few days due to some issues. Please wait for the delivery or cancel the order at your convenience. Thank you for your understanding.")


    useEffect(() => {
        // fetching order details
        const result = orders.find((item) => item._id === orderId)
        setOrderDetails(result)
    }, [orderId, orders])

console.log(orderDetails);


    // status update function 
    const statusUpdateFunc = async (e) => {
        const statusInput = e.target.value
        try {
            setReload(true)
            setStatusSpin(true)
            const res = await axios.put(`${api}/order/update-order-status/${orderId}`, { orderStatus: statusInput })
            if (res) {
                setStatusSpin(false)
                setSelectModal(false)
                setReload(false)
                toast.success("Order Status updated successfully")
            }
        } catch (error) {
            console.error(error);
            setStatusSpin(false)
            setReload(false)
            toast.error("Please try again")
        }

    }

    // send delay message function 
    const sendDelayMessageFunc = async () => {
        try {
            setReload(true)
            setStatusSpin(true)
            const res = await axios.put(`${api}/order/update-order-details/${orderId}`, { delayMessage: delayMessage })
            if (res) {
                setStatusSpin(false)
                setDelayModal(false)
                setReload(false)
                toast.success("Delay Message Sent successfully")
            }
        } catch (error) {
            console.error(error);
            setStatusSpin(false)
            setReload(false)
            toast.error("Please try again")
        }
    }

    return (
        <>
            <ToastContainer theme='dark' position='top-center' />
            <div className='mt-[6.1rem] p-3 lg:p-5'>
                <h5 className='text-center text-2xl font-semibold mb-3 '>Order Details</h5>
                <hr className='border border-gray-400 mb-5' />
                <div className='flex flex-wrap justify-between gap-3'>

                    <div className=" p-3 rounded-lg shadow-md w-full lg:w-[45%]">
                        {/* Shipping Address Section */}
                        <div className="">
                            <h3 className="text-2xl font-semibold">Shipping Address</h3>
                            <hr className='border border-orange-200 my-3' />
                            {orderDetails?.shippingAddress?.map((address, index) => (
                                <div key={index} className="bg-white  flex flex-col gap-2">
                                    <p><strong>Name:</strong> {address.name}</p>
                                    <p><strong>Address:</strong> {address.village},  {address.street}</p>
                                    <p><strong>City:</strong> {address.district}</p>
                                    <p><strong>State:</strong> {address.state}</p>
                                    <p><strong>Postal Code:</strong> {address.postalCode}</p>
                                    <p><strong>Phone:</strong> {address.phone}</p>
                                    <p><strong>Email:</strong> {address.email}</p>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <hr className='border border-orange-200 my-3' />
                            <p className='text-orange-800 font-semibold'><span className='text-black font-bold'>Order Id:</span> {orderDetails?._id}</p>
                            <h6 className=''><span className='font-bold'>Delay Message:</span> {orderDetails?.delayMessage}</h6>
                            <strong className=''>Order Status : <span className={`font-semibold capitalize ${orderDetails?.orderStatus === "pending" ? "border-2 border-red-400 text-orange-700 rounded p-1 px-2" : ""}
                     ${orderDetails?.orderStatus === "cancelled" ? "bg-red-600 text-white rounded p-1 px-2" : ""} 
                     ${orderDetails?.orderStatus === "confirmed" ? "bg-green-600 text-white rounded p-1 px-2" : ""}
                      ${orderDetails?.orderStatus === "delivered" ? "bg-green-600 text-white rounded p-1 px-2" : ""} 
                      ${orderDetails?.orderStatus === "shipped" ? "bg-green-600 text-white rounded p-1 px-2" : ""}
                       ${orderDetails?.orderStatus === "outofdelivery" ? "bg-green-600 text-white rounded p-1 px-2" : ""}`}>{orderDetails?.orderStatus?.replace("outofdelivery", "out Of delivery")}</span></strong>

                            <p>Order Status Updated Date: <span className=" font-semibold text-gray-800 ">{orderDetails?.orderStatusDate}</span></p>
                            <hr className='border border-orange-200 my-3' />

                            <p><strong className="text-xl">Total Amount:</strong> <span className="text-green-700 font-bold text-[1.2rem]">₹{orderDetails?.totalAmount}</span></p>
                            <h3 className="text-lg font-medium">Order Date: <span className="text-gray-700">{orderDetails?.orderDate}</span></h3>
                            <div className='mt-2 flex justify-between flex-wrap gap-2'>
                                <button className='bg-orange-600 hover:bg-orange-500 text-white rounded h-[2.3rem]  px-2 ' onClick={() => setDelayModal(true)}>Send Delay Message</button>
                                <button className='bg-blue-800 hover:bg-blue-600 text-white rounded h-[2.3rem]  px-2' onClick={() => setSelectModal(true)}>Update Order Status</button>
                            </div>
                        </div>
                    </div>



                    {/* Ordered Products Section */}
                    <div className="bg-white p-3 rounded-lg shadow-md  w-full lg:w-2/4">
                        <h3 className="text-2xl font-semibold">Ordered Products : {orderDetails?.orderedProdcuts?.length}</h3>
                        <hr className='border border-orange-200 my-3' />

                        {orderDetails?.orderedProdcuts?.map((product) => (
                            <div key={product.productId} className='flex flex-col gap-2'>
                                <p><strong>Product Name:</strong> {product.products[0].itemName}</p>
                                <p><strong>Category:</strong> {product.products[0].itemCategory}</p>
                                <p><strong>Cost:</strong> Rs. {product.totalAmount}</p>
                                <p><strong>Quantity:</strong> {product.itemQty}</p>
                                <p><strong>Weight:</strong> {product.products[0].itemWeight}ml</p>
                                <h6 className='font-bold'>Order Type: <span className='bg-green-700 py-1 w-fit px-2 font-semibold text-white rounded'>{product.orderType.replace("buyonce", "Buy Once")}</span> </h6>
                                {product.orderType === "subscription" &&
                                    <p><strong>Days:</strong> {product?.products[0]?.days}</p>
                                }
                                    

                                <div className="mt-4">
                                    <h5 className="font-medium">Product Image:</h5>
                                    <div className="flex gap-3 flex-wrap mt-2">
                                      
                                            <img
                                                src={product?.products[0]?.itemImage[0]}
                                                alt="Product Image"
                                                className="w-32 h-32 object-cover rounded-md border"
                                            />
                                        
                                    </div>
                                </div>
                                <hr className='border border-orange-200 my-3' />
                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* update order status modal  */}
            {selectModal &&
                <div onClick={() => setSelectModal(false)} className='bg-gray-700  fixed top-0 left-0 p-3 bg-opacity-50 w-screen h-screen flex justify-center items-center'>
                    <div className='bg-white p-3 rounded w-[80%] lg:w-[30%] text-center'>
                        <h5>Update Order Status</h5>
                        <select
                            onClick={(e) => e.stopPropagation()}
                            name="options"
                            id="options"
                            onChange={statusUpdateFunc}
                            className="border-2 mt-3 outline-none w-full border-blue-500 rounded p-1 h-10 bg-white"
                            defaultValue=""
                        >
                            <option
                                value=""
                                disabled
                                className="text-gray-400 "
                            >
                                Filter
                            </option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="outofdelivery">Out of Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>

                        </select>

                        {statusSpin && (
                            <div className='flex items-center justify-center gap-3 mt-3'>
                                <SmallLoading />
                                Updating...
                            </div>)}
                    </div>
                </div>}


            {/* order delay message modal  */}
            {delayModal &&
                <div onClick={() => setDelayModal(false)} className='bg-gray-700  fixed top-0 left-0 p-3 bg-opacity-50 w-screen h-screen flex justify-center items-center'>
                    <div onClick={(e) => e.stopPropagation()} className='bg-white p-3 rounded w-full lg:w-[50%]'>
                        <h5>Enter Delay Message</h5>

                        <div className="mt-2">
                            <textarea
                                value={delayMessage}
                                onChange={(e) => setDelayMessage(e.target.value)}
                                name="delayMessage"
                                id="delayMessage"
                                rows={3}
                                placeholder='Write Delay Message'
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

                            />
                        </div>
                        <div className='mt-2 flex justify-end'>

                            {statusSpin ?
                                <button className='flex items-center justify-center gap-3 bg-blue-600 h-9 px-2 rounded hover:bg-blue-800 text-white'>
                                    <SmallLoading />
                                    Sending...
                                </button> :
                                <button onClick={sendDelayMessageFunc} className='bg-blue-600 h-9 px-2 rounded hover:bg-blue-800 text-white'>Send Delay Message</button>

                            }
                        </div>
                    </div>
                </div>}

        </>

    )
}

export default OrderOverView