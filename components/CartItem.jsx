import Image from 'next/image';
import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeFromCart } from '@/store/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ data }) => {
    const p = data.attributes;
    const dispatch = useDispatch();

    const updateCartItem = (event, key) => {
        let payload = {
            key,
            val: key === "quantity" ? parseInt(event.target.value) : event.target.value,
            id: data.id
        }

        dispatch(updateCart(payload));
    }

    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            {/* IMAGE START */}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <Image
                    // src="/product-1.webp"
                    src={p.thumbnail.data.attributes.url}
                    // alt="Cart Item"
                    alt={p.name}
                    width={120}
                    height={120}
                />
            </div>
            {/* IMAGE END */}

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* PRODUCT TITLE */}
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                        {/* Product Title */}
                        {p.name}
                    </div>
                    {/* PRODUCT TITLE */}

                    {/* PRODUCT SUBTITLE */}
                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                        {/* Product Sub-title */}
                        {p.subtitle}
                    </div>
                    {/* PRODUCT SUBTITLE */}

                    {/* PRODUCT PRICE */}
                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        MRP : &#8377;{/*2400*/}{p.price}
                    </div>
                    {/* PRODUCT PRICE */}
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                    {/* Product Sub-title */}
                    {p.subtitle}
                </div>
                {/* PRODUCT SUBTITLE */}


                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                        {/* Size Selection */}
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:</div>
                            <select className="hover:text-black" onChange={(e) => updateCartItem(e, "selectedSize")}>
                                {p.size.data.map((item, i) => (
                                    <option key={i} disabled={!item.enabled ? true : false} value={item.size} selected={data.selectedSize === item.size}>{item.size}</option>
                                ))}
                                {/* <option value="1">UK 6</option>
                                <option value="2">UK 6.5</option>
                                <option value="3">UK 7</option>
                                <option value="4">UK 7.5</option>
                                <option value="5">UK 8</option>
                                <option value="6">UK 8.5</option>
                                <option value="7">UK 9</option>
                                <option value="8">UK 9.5</option>
                                <option value="9">UK 10</option>
                                <option value="10">UK 10.5</option>
                                <option value="11">UK 11</option> */}
                            </select>
                        </div>
                        {/* Size Selection */}

                        {/* Quantity Selection */}
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            <select className="hover:text-black" onChange={(e) => updateCartItem(e, "quantity")}>
                                {
                                    // Array.from(
                                    //     Array(10).keys(),
                                    //     (_, x) => x + 1
                                    // )
                                    Array.from(
                                        { length: 10 },
                                        (_, i) => i + 1
                                    )
                                        .map((q, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={q}
                                                    selected={data.quantity === q}
                                                >
                                                    {q}
                                                </option>
                                            );
                                        })
                                }
                            </select>
                        </div>
                        {/* Quantity Selection */}

                    </div>
                    {/* Delete Icon */}
                    <RiDeleteBin6Line
                        onClick={() => dispatch(removeFromCart({ id: data.id }))}
                        className="text-red-600 cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
                    {/* Delete Icon */}
                </div>
            </div>
        </div>
    )
}

export default CartItem