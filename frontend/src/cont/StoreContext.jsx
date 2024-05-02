import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});

  const getdef = () =>{
    let cart={};
    for (let index=0;index<40+1;index++){
      cart[index] = 0;
    }
    return cart;
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      fetch('https://foodone-seven.vercel.app/getcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'token':`${localStorage.getItem('token')}`,
          'Contet-Type':'application/json'
        },
        body:'',
      }).then((response)=>response.json())
      .then((data)=>setcartItems(data))
    }
  })

  const addtoCart = (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(localStorage.getItem('token')){
      fetch('https://foodone-seven.vercel.app/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'token':`${localStorage.getItem('token')}`,
          'Content-type':'application/json',
        },
        body:JSON.stringify({
          "itemid":itemId
        }),
      }).then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  };

  const removefromCart = (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('token')){
      fetch('https://foodone-seven.vercel.app/removefrom',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'token':`${localStorage.getItem('token')}`,
          'Content-type':'application/json',
        },
        body:JSON.stringify({
          "itemid":itemId
        }),
      }).then((response)=>response.json())
      .then((data)=>console.log(data))

    }
  };
//cart data fr




  const getTotal = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = food_list.find((product) => product._id === item);
        total += iteminfo.price * cartItems[item];
      }
      
    }
    return total;
  };

  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addtoCart,
    removefromCart,
    getTotal
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
