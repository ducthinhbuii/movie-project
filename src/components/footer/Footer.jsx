import React from 'react'
import './styles.scss'
import { FaFacebook, FaInstagram , FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className='footer'>
      <ul className="more-info">
        <li className="info">Terms of User</li>
        <li className="info">Privacy Policy</li>
        <li className="info">About</li>
        <li className="info">Blog</li>
      </ul>
      <div className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mauris nec facilisis sagittis. Aliquam et nulla efficitur, porta elit nec, hendrerit erat. Nulla egestas neque vestibulum nisl fringilla, at iaculis elit posuere. Nunc iaculis nisl non ipsum tincidunt, eu sagittis metus rutrum. In orci lacus, facilisis consequat mi sit amet, finibus aliquam purus. Sed vulputate maximus nulla, at pretium nibh tempor et. Sed pretium viverra libero, ut pretium enim congue auctor.
      </div>
      <ul className="social-media">
        <li className="item">
          <FaFacebook/>
        </li>
        <li className="item">
          <FaInstagram/>
        </li>
        <li className="item">
          <FaTwitter/> 
        </li>
        <li className="item">
          <FaLinkedin/>
        </li>
      </ul>
    </div>
  )
}
