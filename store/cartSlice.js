import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            // state.cartItems = action.payload;
            const item = state.cartItems.find((p) => p.id === action.payload.id);

            if (item) {
                //item laready present in the cart
                item.quantity++;
                item.attributes.price = item.singleQuantityPrice * item.quantity;
            } else {
                //item not present
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1
                })
            }
        },
        updateCart: (state, action) => {
            state.cartItems = state.cartItems.map((p) => {
                if (p.id === action.payload.id) {
                    if (action.payload.key === "quantity") {
                        p.attributes.price = p.singleQuantityPrice * action.payload.val;
                    }

                    return {
                        ...p,
                        [action.payload.key]: action.payload.val
                    }
                }
                return p
            })
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((p) => p.id !== action.payload.id);
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer