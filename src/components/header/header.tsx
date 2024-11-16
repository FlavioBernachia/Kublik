import React, { useState } from 'react';
import { Menu } from './menu';
import Image from 'next/image';

const Header: React.FC = () => {

    const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className='headerGeneral'>
        <div className='logo'> <Image src="/logoKublik.png" width={170} height={250} alt=""></Image></div>
        <div
        className={`menu ${openMenu ? 'active' : ''}`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <span className='line1'></span>
        <span className='line2'></span>
        <span className='line3'></span>
      </div>
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />

    </div>
  );
};

export default Header;
