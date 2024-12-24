import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaBars, FaDownload } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [offcanvas, setOffcanvas] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const handleDocumentClick = () => {
      setToggle(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {

      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {

      const currentScrollPos = window.scrollY

      if (prevScrollPos > currentScrollPos || currentScrollPos < 10) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
      setPrevScrollPos(currentScrollPos);

    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)

    }
  }, [prevScrollPos])

  const handleIconClick = (e) => {
    e.stopPropagation();
    setToggle(!toggle);
  };

  return (
    <>
      <div className={`bg-red-500 w-[100vw] h-[5.2rem] flex justify-around fixed top-0 left-0 items-center transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <FaBars size={25} title='open menu' className="text-white cursor-pointer" onClick={() => setOffcanvas(true)} />
        <div className="w-[7.5rem] md:w-[7.9rem]">
          <img className="md:w-full rounded-full" src="dora-logo.jpeg" alt="dora-logo" />
        </div>
        <div className="flex flex-wrap items-center gap-2 relative">
          <CgProfile
            onClick={handleIconClick}
            size={25}
            title="Profile"
            className="text-white cursor-pointer rounded-full"
          />
          {toggle && (
            <div onClick={(e)=>e.stopPropagation()} className="absolute right-0 top-[2rem] w-[6rem] bg-blue-500 rounded p-2">
              <h5 className="text-white hover:text-black cursor-pointer">Venu gopal</h5>
 
              <h5 className="text-white hover:text-black cursor-pointer">Log Out</h5>
            </div>
          )}
        </div>
      </div>

      {/* offcanvas  */}
      {offcanvas && <>
        <div className='fixed top-0 left-0  h-screen w-screen p-5'>
          <div className='bg-gray-700 relative flex flex-col gap-3 text-white p-5 md:text-center h-full w-full rounded-lg'>
            <Link onClick={() => setOffcanvas(false)} to="/" className='text-[1.1rem]'>Orders</Link>
            <Link onClick={() => setOffcanvas(false)} to="/products" className='text-[1.1rem]'>Products</Link>
            <Link onClick={() => setOffcanvas(false)} to="/uploadproducts" className='text-[1.1rem]'>Upload Products</Link>
            <Link onClick={() => setOffcanvas(false)} to="/carousel" className='text-[1.1rem]'>Add Carousel</Link>
            <Link onClick={() => setOffcanvas(false)} to="/addcategory" className='text-[1.1rem]'>Add New Category</Link>
            <Link onClick={() => setOffcanvas(false)} to="/subscription" className='text-[1.1rem]'>Subscriptions</Link>
            <Link onClick={() => setOffcanvas(false)} to="/admin" className='text-[1.1rem]'>Admin</Link>
            <a href='Dora A-Z Fresh Seller.apk' download="Dora A-Z Fresh Seller.apk" className='text-[1.1rem] absolute left-5 bottom-5 h-10 bg-blue-600 flex justify-center items-center gap-2 rounded-full w-fit hover:bg-blue-800 px-5'><FaDownload/>  Download App</a>

            <MdClose size={25} className='absolute right-5 cursor-pointer' onClick={() => setOffcanvas(false)} />
          </div>
        </div>
      </>}

    </>
  );
};

export default Navbar;
