import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext =  createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    
    const [cartItems,setCartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    }

    
    const removeFromCart = (itemId, removeAll = false) => {
        if (removeAll) {
          setCartItems((prev) => ({ ...prev, [itemId]: 0 })); // Remove all quantities of the item
        } else {
          setCartItems((prev) => {
            const newQuantity = prev[itemId] - 1;
            return { ...prev, [itemId]: newQuantity < 0 ? 0 : newQuantity }; // Decrement but don't go below 0
          });
        }
      }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            totalAmount += cartItems[item] * itemInfo.new_price;
          }
        }
        return totalAmount;
      }

      const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
      }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;