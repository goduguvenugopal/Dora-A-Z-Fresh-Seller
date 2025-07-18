import React, { useContext, useEffect, useRef, useState } from "react";
import cloudinaryFunc from "./coudinary";
import { MdClose } from "react-icons/md";
import { Loading, SmallLoading } from "../assets/Loading";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { dataContext } from "../App";
import {
  milkBasedItems,
  vegetables,
  meats,
  vegFoodBasedNames,
  nonVegFoods,
  indianCoolDrinks,
  indianPickles,
  indianSpices,
  indianSweets,
  Maincategories,
  bakeryItems,
  snacksList,
  indianGroceryItems,
} from "./itemSubCategory";

const UploadProducts = () => {
  const { api, token } = useContext(dataContext);
  const inputFocus = useRef();
  const [imgLoader, setImgLoader] = useState(false);
  const [tags, setTags] = useState("");
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
    itemSubCategory: "",
    offerCost: "",
    offerMessage: "",
    productTags: [],
  };

  const [productData, setProductData] = useState(initialProductData);
  const [addBtnSpinner, setAddBtnSpinner] = useState(false);
  const [itemSubCategory, setItemSubCategory] = useState([]);

  // displaying sub category names with conditions
  useEffect(() => {
    if (productData.itemCategory === "milk") {
      setItemSubCategory(milkBasedItems);
    } else if (productData.itemCategory === "vegetables") {
      setItemSubCategory(vegetables);
    } else if (productData.itemCategory === "food") {
      setItemSubCategory(vegFoodBasedNames);
    } else if (productData.itemCategory === "meat") {
      setItemSubCategory(meats);
    } else if (productData.itemCategory === "non-veg") {
      setItemSubCategory(nonVegFoods);
    } else if (productData.itemCategory === "beverages") {
      setItemSubCategory(indianCoolDrinks);
    } else if (productData.itemCategory === "pickles") {
      setItemSubCategory(indianPickles);
    } else if (productData.itemCategory === "bakery") {
      setItemSubCategory(bakeryItems);
    } else if (productData.itemCategory === "sweets") {
      setItemSubCategory(indianSweets);
    } else if (productData.itemCategory === "spices") {
      setItemSubCategory(indianSpices);
    } else if (productData.itemCategory === "snacks") {
      setItemSubCategory(snacksList);
    } else if (productData.itemCategory === "grocery") {
      setItemSubCategory(indianGroceryItems);
    }
  }, [productData.itemCategory]);

  // Add tags into the productTags array
  const addTagsInArray = () => {
    if (tags.trim()) {
      setProductData((prevData) => ({
        ...prevData,
        productTags: [...prevData.productTags, tags],
      }));
      setTags("");
      inputFocus.current.focus();
    }
  };

  // remove tags from array
  const removeTagsInArray = (item) => {
    const remainTags = productData.productTags.filter(
      (itemIterate) => itemIterate !== item
    );
    setProductData((prevData) => ({
      ...prevData,
      productTags: remainTags,
    }));
    inputFocus.current.focus();
  };

  // sending file to cloudinary function
  const fileHandleFunc = async (file) => {
    try {
      setImgLoader(true);
      const imageUrl = await cloudinaryFunc(file);
      if (imageUrl) {
        setProductData((prevData) => ({
          ...prevData,
          itemImage: [...prevData.itemImage, imageUrl],
        }));
        setImgLoader(false);
      }
    } catch (error) {
      console.log(error);
      setImgLoader(false);
    }
  };

  // remove product images function
  const removeImageFunction = (itemImg) => {
    const remainImages = productData.itemImage.filter(
      (item) => item !== itemImg
    );
    setProductData((prevData) => ({
      ...prevData,
      itemImage: remainImages,
    }));
  };

  // product weight add function
  const addWeightFunction = (event) => {
    const weight = event.target.value;
    if (weight) {
      setProductData((prevData) => ({
        ...prevData,
        itemWeight: [...prevData.itemWeight, weight],
      }));
    }
  };

  // remove weight function
  const removeWeight = (itemWeight) => {
    const remainWeight = productData.itemWeight.filter(
      (item) => item !== itemWeight
    );
    setProductData((prevData) => ({
      ...prevData,
      itemWeight: remainWeight,
    }));
  };

  //product form Handle function
  const formHandleFunc = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // form submit function
  const formSubmitFunc = async (event) => {
    event.preventDefault();
    if (productData.productTags.length === 0) {
      toast.error("Please add product tag names");
    } else {
      try {
        setAddBtnSpinner(true);
        const res = await axios.post(
          `${api}/product/save-product`,
          productData,
          {
            headers: {
              token: token,
            },
          }
        );
        if (res) {
          toast.success("Product added successfully");
          setProductData(initialProductData);
          setAddBtnSpinner(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Product not added try again");
        setAddBtnSpinner(false);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />
      <div className="mt-[6.1rem] p-3 lg:p-5">
        <h5 className="text-[1.4rem] font-semibold text-center">
          Add products
        </h5>
        <hr className="border-1 border-gray-600 my-1" />

        <form
          className="lg:flex lg:justify-between lg:gap-3 pt-5 "
          onSubmit={formSubmitFunc}
        >
          <div className=" lg:w-[40vw]">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Product photo <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {imgLoader ? (
                  <div className="flex items-center gap-3 h-[5rem] font-semibold text-gray-700">
                    <SmallLoading /> Uploading...
                  </div>
                ) : (
                  <svg
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
                  </svg>
                )}

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
            <div className="flex flex-wrap gap-2 mt-4">
              {productData.itemImage.map((item, index) => (
                <div
                  key={index}
                  className="w-[6.5rem] lg:w-[9.5rem]  relative h-fit rounded"
                >
                  <img src={item} className="rounded" alt="item-image" />
                  <MdClose
                    onClick={() => removeImageFunction(item)}
                    className="rounded-full cursor-pointer h-6 w-6 p-1 absolute top-1 hover:bg-indigo-700 right-1 bg-black text-white"
                  />
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
                  Item Name <span className="text-red-500">*</span>
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
                  Item Cost <span className="text-red-500">*</span>
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
              <div className="col-span-full">
                <label
                  htmlFor="itemDescription"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Item Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="itemDescription"
                    onChange={formHandleFunc}
                    value={productData.itemDescription}
                    id="itemDescription"
                    rows={3}
                    placeholder="Write product description"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
                <div className="col-span-full">
                <label
                  htmlFor="offerMessage"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Item offer message
                </label>
                <div className="mt-2">
                  <textarea
                    name="offerMessage"
                    onChange={formHandleFunc}
                    value={productData.offerMessage}
                    id="offerMessage"
                    rows={3}
                    placeholder="Example :- Reduced Prices – ₹70 per Litre & ₹35 per Half Litre!"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-5">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="itemHalfKgCost"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Half Kg Cost
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="itemHalfKgCost"
                      value={productData.itemHalfKgCost}
                      placeholder="Enter product half kg cost "
                      onChange={formHandleFunc}
                      id="itemHalfKgCost"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="itemKgCost"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Kg Cost
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="itemKgCost"
                      placeholder="Enter product kg cost"
                      onChange={formHandleFunc}
                      value={productData.itemKgCost}
                      id="itemKgCost"
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="itemStock"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Stock <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="itemStock"
                      id="itemStock"
                      value={productData.itemStock}
                      onChange={formHandleFunc}
                      placeholder="Enter stock quantity"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="offerCost"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Original Cost
                  </label>
                  <div className="mt-2">
                    <input
                      id="offerCost"
                      name="offerCost"
                      value={productData.offerCost}
                      placeholder="Enter product orginal cost"
                      onChange={formHandleFunc}
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="itemCategory"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Category <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="itemCategory"
                      name="itemCategory"
                      autoComplete="itemCategory"
                      required
                      value={productData.itemCategory}
                      onChange={formHandleFunc}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option disabled value="">
                        Select the Category
                      </option>
                      {Maincategories.map((item, index) => (
                        <option key={index} className="capitalize" value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="itemSubCategory"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Sub Category <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="itemSubCategory"
                      name="itemSubCategory"
                      autoComplete="itemSubCategory"
                      required
                      value={productData.itemSubCategory}
                      onChange={formHandleFunc}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option disabled value="">
                        Select the Sub Category
                      </option>

                      {itemSubCategory.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="minOrderQty"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Minimum Order Quantity
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="minOrderQty "
                      value={productData.minOrderQty}
                      name="minOrderQty"
                      onChange={formHandleFunc}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option disabled value="">
                        Select the minimum order quantity
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="itemWeight"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Product Weight
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      onChange={addWeightFunction}
                      id="itemWeight"
                      value={productData.itemWeight}
                      name="itemWeight"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option disabled value="">
                        Select the product Weight
                      </option>
                      <option value="250">250 grams</option>
                      <option value="500">500 grams</option>
                      <option value="1000">1 kg</option>
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className=" flex flex-wrap gap-2 mt-5">
                    {productData.itemWeight.map((item, index) => (
                      <div
                        className=" flex justify-around items-center gap-3 bg-blue-900 text-white rounded-full px-3 h-8"
                        key={index}
                      >
                        {item}
                        <MdClose
                          className="cursor-pointer"
                          onClick={() => removeWeight(item)}
                          size={19}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="productTags"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Product Tags <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 relative">
                    <input
                      type="text"
                      ref={inputFocus}
                      name="productTags"
                      id="productTags"
                      value={tags}
                      placeholder="Enter product tag names"
                      onChange={(e) => setTags(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <button
                      onClick={addTagsInArray}
                      type="button"
                      className="absolute hover:bg-indigo-800  text-white top-0 right-0 w-[6rem] rounded-tr-md rounded-br-md bg-indigo-600 py-1.5 font-semibold"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-4 w-full flex flex-row flex-wrap gap-2">
                    {productData.productTags.map((item, index) => (
                      <div
                        className=" flex justify-around items-center gap-3 bg-blue-900 text-white rounded-full px-3 h-8"
                        key={index}
                      >
                        {item}
                        <MdClose
                          className="cursor-pointer"
                          onClick={() => removeTagsInArray(item)}
                          size={19}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-x-6">
                {addBtnSpinner ? (
                  <button
                    disabled={true}
                    type="button"
                    className="flex cursor-not-allowed items-center justify-center gap-3 rounded-md bg-blue-600 px-3 py-2 w-full md:w-fit lg:w-full text-sm font-semibold text-white shadow-sm "
                  >
                    <SmallLoading /> Adding products...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 w-full md:w-fit lg:w-full text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Products
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadProducts;
