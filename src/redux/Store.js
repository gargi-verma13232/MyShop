import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Cartslice";
import WishlistReducer from "./Wishlistslice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    wishlist: WishlistReducer,
  },
});

export default store;