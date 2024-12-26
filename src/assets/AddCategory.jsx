import React, { useContext, useState } from 'react'
import { dataContext } from '../App'
import cloudinaryFunc from './coudinary'


const AddCategory = () => {
  const { api } = useContext(dataContext)
  const [imgLoader, setImgLoader] = useState(false)
  const initialProductData = {
    itemName: "",
    itemDescription: "",
    itemCost: "",
    itemHalfKgCost: "",
    itemKgCost: "",
    itemImage: [],
    itemQty: "1",
    minOrderQty: "",
    itemWeight: [],
    itemStock: "",
    itemCategory: "",
    offerCost: "",
    productTags: [],
  }
  const [productData, setProductData] = useState(initialProductData)
  const [addBtnSpinner, setAddBtnSpinner] = useState(false)
  const [btnToggle, setBtnToggle] = useState(true)


  // sending file to cloudinary function
  const fileHandleFunc = async (file) => {
    try {
      setImgLoader(true)
      const imageUrl = await cloudinaryFunc(file)
      if (imageUrl) {
        setProductData((prevData) => ({
          ...prevData, itemImage: [...prevData.itemImage, imageUrl]
        }))
        setImgLoader(false)

      }
    } catch (error) {
      console.log(error);
      setImgLoader(false)

    }
  }


  // remove product images function 
  const removeImageFunction = (itemImg) => {
    const remainImages = productData.itemImage.filter((item) => item !== itemImg)
    setProductData((prevData) => ({
      ...prevData, itemImage: remainImages
    }))
  }

  //product form Handle function 
  const formHandleFunc = (e) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData, [name]: value
    }))
  }

  return (
    <>

      <div className='mt-[6.1rem] p-3 lg:p-5'>
        <h5 className='text-center text-[1.2rem] font-serif font-semibold'>
          Add new Category
        </h5>
        <hr className='border border-gray-400 mb-5' />

        <div className='flex justify-around pb-3'>
          <h5 onClick={() => setBtnToggle(true)} className={`cursor-pointer font-semibold select-none ${btnToggle ? "border-b-[3px] w-16 text-center border-b-blue-700 py-1" : "py-1 border-b-[3px] w-16 text-center border-b-white"}`}>
            Add
          </h5>
          <h5 onClick={() => setBtnToggle(false)} className={`cursor-pointer font-semibold select-none ${!btnToggle ? "border-b-[3px] w-16 text-center border-b-green-600 py-1" : "py-1 border-b-[3px] w-16 text-center border-b-white"}`}>Update</h5>
        </div>
        <hr className='border border-gray-200 mb-5' />

        {/* conditional rendering sections  */}
        {btnToggle ? <>


          {/* form section  */}
          <form className='lg:flex lg:justify-between lg:gap-3 pt-5 '  >
            <div className=" lg:w-[40vw]">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Product photo <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {imgLoader ?
                    <div className='flex items-center gap-3 h-[5rem] font-semibold text-gray-700'><SmallLoading /> Uploading...</div>
                    : <svg
                      className="mx-auto size-20 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>}

                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="itemImage"
                      className="relative cursor-pointer text-indigo-500 hover:bg-indigo-600 hover:border-white select-none hover:text-white border-2 border-indigo-500 p-1 rounded-md bg-white font-semibold "
                    >
                      <span>Upload a Product photo</span>
                      <input
                        id="itemImage"
                        name="itemImage"
                        type="file"
                        required
                        onChange={fileHandleFunc}
                        className="sr-only"
                      />
                    </label>

                  </div>

                </div>
              </div>
              <div className='flex flex-wrap gap-2 mt-4'>
                {productData.itemImage.map((item, index) => (
                  <div key={index} className='w-[6.5rem] lg:w-[9.5rem]  relative h-fit rounded'>
                    <img src={item} className='rounded' alt="item-image" />
                    <MdClose onClick={() => removeImageFunction(item)} className='rounded-full cursor-pointer h-6 w-6 p-1 absolute top-1 hover:bg-indigo-700 right-1 bg-black text-white' />
                  </div>
                ))}
              </div>
            </div>


            <div className="space-y-12 lg:w-[50vw]">

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="itemName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Name <span className='text-red-500'>*</span>
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1  outline-gray-500 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">

                      <input
                        type="text"
                        name="itemName"
                        id="itemName"
                        required
                        value={productData.itemName}
                        onChange={formHandleFunc}
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        placeholder="Enter Product name"
                      />
                    </div>

                  </div>

                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="itemCost"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Cost <span className='text-red-500'>*</span>
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1  outline-gray-500 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">

                      <input
                        type="text"
                        name="itemCost"
                        onChange={formHandleFunc}
                        value={productData.itemCost}
                        required
                        id="itemCost"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        placeholder="Enter Product Cost"
                      />
                    </div>

                  </div>

                </div>
                <div className="sm:col-span-4 mt-6 flex items-center justify-center gap-x-6">
                  {addBtnSpinner ? <button
                    disabled={true}
                    type='button'
                    className="flex cursor-not-allowed items-center justify-center gap-3 rounded-md bg-blue-600 px-3 py-2 w-full md:w-fit lg:w-full text-sm font-semibold text-white shadow-sm "
                  >
                    <SmallLoading /> Adding products...
                  </button> :
                    <button
                      type='submit'
                      className="rounded-md bg-indigo-600 px-3 py-2 w-full md:w-fit lg:w-full text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Products
                    </button>
                  }

                </div>
              </div>
            </div>
          </form>

        </> : <>



        </>}


      </div>
    </>
  )
}

export default AddCategory