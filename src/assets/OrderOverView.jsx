import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dataContext } from '../App'


const OrderOverView = () => {
    const { orderId } = useParams()
    const { orders } = useContext(dataContext)
    const [orderDetails, setOrderDetails] = useState({})

    console.log(orderDetails);

    useEffect(() => {
        // fetching order details
        const result = orders.find((item) => item._id === orderId)
        setOrderDetails(result)
    }, [orderId, orders])

    return (
        <div className='mt-[6.1rem] p-3 lg:p-5'>
            <h5 className='text-center text-2xl font-semibold mb-3 '>Order Details</h5>
            <hr className='border border-gray-400 mb-5' />

            <div className="mb-6 space-y-4">
                <h3 className="text-lg font-medium">Order Date: <span className="text-gray-700">{orderDetails?.orderDate}</span></h3>
                <p>Status: <strong className="text-blue-600">{orderDetails?.orderStatus}</strong></p>
                <p>Status Date: <span className="text-gray-500">{orderDetails?.orderStatusDate}</span></p>
                <p><strong className="text-xl">Total Amount:</strong> <span className="text-green-600">${orderDetails?.totalAmount}</span></p>
            </div>

            {/* Shipping Address Section */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold">Shipping Address</h3>
                {orderDetails?.shippingAddress?.map((address, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg shadow-md mb-5">
                        <p><strong>Name:</strong> {address.name}</p>
                        <p><strong>Address:</strong> {address.address}</p>
                        <p><strong>City:</strong> {address.city}</p>
                        <p><strong>State:</strong> {address.state}</p>
                        <p><strong>Postal Code:</strong> {address.postalCode}</p>
                        <p><strong>Phone:</strong> {address.phone}</p>
                        <p><strong>Email:</strong> {address.email}</p>
                    </div>
                ))}
            </div>

            {/* Ordered Products Section */}
            <div>
                <h3 className="text-2xl font-semibold">Ordered Products</h3>
                {orderDetails?.orderedProdcuts?.map((product, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg shadow-md mb-5">
                        <h4 className="text-xl font-medium">{product.itemName}</h4>
                        <p><strong>Category:</strong> {product.itemCategory}</p>
                        <p><strong>Cost:</strong> ${product.itemCost}</p>
                        <p><strong>Description:</strong> {product.itemDescription}</p>
                        <p><strong>Quantity:</strong> {product.itemQty}</p>
                        <p><strong>Stock:</strong> {product.itemStock}</p>
                        <p><strong>Weight:</strong> {product.itemWeight.join(', ')}</p>
                        <p><strong>Minimum Order Quantity:</strong> {product.minOrderQty}</p>
                        <p><strong>Order Type:</strong> {product.orderType}</p>
                        <p><strong>Order Dates:</strong> From {product.from} to {product.to}</p>

                        <div className="mt-4">
                            <h5 className="font-medium">Product Images:</h5>
                            <div className="flex gap-3 flex-wrap mt-2">
                                {product?.itemImage?.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`Product Image ${i + 1}`}
                                        className="w-24 h-24 object-cover rounded-md border"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default OrderOverView