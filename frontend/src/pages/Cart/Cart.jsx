import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../cont/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cartItems, removefromCart, getTotal } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cartitems">
        <div className="cartitemstitle">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cartitemstitle cartitem">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removefromCart(item._id)} className="Cross">X</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cartbottom">
        <div className="carttota">
          <h2>Cart total</h2>
          <div>
            <div className="carttotal">
              <p>Subtotal</p>
              <p>${getTotal()}</p>

            </div>
            <hr/>
            <div className="carttotal">
            <p>Delivery Fee</p>
            <p>${getTotal()===0?0:2}</p>

            </div>
            <hr/>
            <div className="carttotal">
            <b>Total</b>
            <b>${getTotal()===0?0:getTotal()+2}</b>

            </div>
            
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
        </div>
        <div className="promo">
          <div>
            <p>If you code Enter here</p>
            <div className="input">
              <input type='text' placeholder="promo code"/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
