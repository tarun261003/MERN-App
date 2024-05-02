import React, { useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../cont/StoreContext'

const Placeorder = () => {

  const {getTotal} = useContext(StoreContext);


  return (
    <form className='placeorder'>
      <div className="placeorderleft">
        <p className="title">Delivery Information</p>
        <div className="multi">
          <input type='text' placeholder='firstname'/>
          <input type='text' placeholder='lastname'/>
        </div>
        <input type="email" placeholder='Email'/>
        <input type="text" placeholder='Street'/>
      
      <div className="multi">
          <input type='text' placeholder='City'/>
          <input type='text' placeholder='State'/>
      </div>
      <div className="multi">
          <input type='text' placeholder='Code'/>
          <input type='text' placeholder='Country'/>
      </div>
      <input type="text" name="" id="" placeholder='Phone'/>
      </div>
      <div className="placeorderright">
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
          <button>Proceed to payment</button>
        </div>
      </div>

    </form>
  )
}

export default Placeorder