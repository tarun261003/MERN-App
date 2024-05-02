import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../cont/StoreContext'

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartItems, addtoCart, removefromCart } = useContext(StoreContext);

  return (
    <div className='fooditem'>
      <div className="imgcon">
        <img className='foodimg' src={image} alt={name} />
        {
          !cartItems[id] ?
            <img className='add' onClick={()=>addtoCart(id)} src={assets.add_icon_white} alt="Add to Cart" />
            
            :<div className="itemcounter">
              <img onClick={()=>removefromCart(id)} src={assets.remove_icon_red} alt="Remove from Cart" />
              <p>{cartItems[id]}</p>
              <img onClick={() =>addtoCart(id)} src={assets.add_icon_green} alt="Add to Cart" />
            </div>
        }
      </div>
      <div className="foodinfo">
        <div className="rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className='fooddes'>{description}</p>
        <p className='fooprice'>${price}</p>
      </div>
    </div>
  )
}

export default Fooditem
