import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footercontent">
            <div className="footleft">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis facilis porro itaque, suscipit deserunt debitis optio expedita distinctio blanditiis ab ad quam quos dolores totam qui error doloremque at molestiae?</p>
                <div className="footicons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footcenter">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footright"> 
            <h2>Get In Touch</h2>
            <ul>
                <li>6942069420</li>
                <li>Niga.com</li>
                </ul>
            </div>
        </div>
    <hr/>
    <p className="footercopy">Copyright 2024 recived</p>
    </div>
  )
}

export default Footer