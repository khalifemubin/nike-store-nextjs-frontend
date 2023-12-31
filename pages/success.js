import React, { useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { removeFromCart } from '@/store/cartSlice';
import { useDispatch, useSelector } from "react-redux";

const Success = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if (cartItems.length > 0) {
            cartItems.forEach((data, _) => dispatch(removeFromCart({ id: data.id })));
        }
    }, [cartItems])

    return (
        <div className="min-h-[650px] flex items-center">
            <Wrapper>
                <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                    <div className="text-2xl font-bold">
                        Thanks for shopping with us!
                    </div>
                    <div className="text-lg font-bold mt-2">
                        Your order has been placed successfully.
                    </div>
                    <div className="text-base mt-5">
                        For any product related query, drop an email to
                    </div>
                    <div className="underline">shoeshopcontact@shop.com</div>

                    <Link href="/" className="font-bold mt-5">
                        Continue Shopping
                    </Link>
                </div>
            </Wrapper>
        </div>
    );
};

export default Success;