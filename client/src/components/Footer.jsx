import React from 'react'
import { Link } from 'react-router-dom';
import { facebook, instagram, twitter } from '../assests';

const Footer = () => {
  return (
    <div className='bg-tertiary bottom-0 h-40 w-full mt-auto'>
      <div className='flex justify-between items-center mx-10'>
        <Link to='/' style={{ fontFamily: 'Lobster, cursive' }}>
          <h2><span className='text-quaternary'>F</span>rostplace</h2>
        </Link>
        <div className='flex gap-10'>
          <Link>Shop</Link>
          <Link>About</Link>
          <Link>Contact</Link>
        </div>
        <div className='flex gap-3'>
          <img className='w-[30px] h-[30px]' src={facebook} />
          <img className='w-[30px] h-[30px]' src={twitter} />
          <img className='w-[30px] h-[30px]' src={instagram} />
        </div>
      </div>
      <div className='border-[1px] mx-10' />
    </div>
  )
}

export default Footer;