import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../cont/StoreContext'


const Navbar = ({setshowLogin}) => {

    const [menu,Setmenu] = useState("home");

    const {getTotal} = useContext(StoreContext);


  return (
    <div className='Navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="menu">
            <Link to = '/' onClick={()=>Setmenu("home")}className={menu==='home'?'active':''}>Home</Link> 
            <a href='#explore-menu' onClick={()=>Setmenu("menu")}className={menu==='menu'?'active':''}>Menu</a>
            
            <a href='#footer' onClick={()=>Setmenu("contact")} className={menu==='contact'?'active':''}>Contact us</a>

        </ul>
        <div className="navbar-right">
            
            <img src={assets.search_icon} alt="" />
            <div className="serach-icon">
                <Link to='/cart'><img src={assets.basket_icon} /></Link>
                <div className={getTotal()===0?"":"dot"}></div>
                {localStorage.getItem('token')?<button onClick={()=>{localStorage.removeItem('token');window.location.replace('/')}}>Logout</button>:
                <Link to='/login'><button>Sign In</button></Link>}
            </div>
        </div>
    </div>
  )
}

export default Navbar