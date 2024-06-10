import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './styles.scss'
import { ContentWrapper } from '../contentWrapper/ContentWrapper'
import { HiOutlineSearch, HiOutlineX, HiOutlineViewList} from "react-icons/hi";

export const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchMenu, setSearchMenu] = useState(false)
  const [query, setQuery] = useState(false)
  const [show, setShow] = useState("top")
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()
  const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
            setShow("hide");
        } else {
            setShow("show");
        }
    } else {
        setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY])


  const handleSearch = (e) => {
    console.log(query)
    if(e.key === 'Enter' && query.length > 0 ){
        navigate(`/search/${query}`)
        setTimeout(() => {
          setSearchMenu(false)
        }, 1000);
    }
}

  const openMobileMenu = () => {
    setMobileMenu(true)
    setSearchMenu(false)
  }

  const closeMobileMenu = () => {
    setMobileMenu(false)
  }

  const openSearchMenu = () => {
    setSearchMenu(true)
    setMobileMenu(false)
  }

  const closeSearchMenu = () => {
    setSearchMenu(false)
  }

  const navigationHandler = (address) => {
    navigate(`/explore/${address}`)
    setMobileMenu(false)
  }

  return (
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3984267604.
    <header className={`header ${mobileMenu ? 'active-sidebar' : 'hide-sidebar'} ${show}`}>
        <ContentWrapper>
            <div className="logo-main" onClick={() => {
              navigate('/')
            }}>
              <img src="https://raw.githubusercontent.com/ShariqAnsari88/movix/d68e3a79331705bc5cf7da9bc120c484116601e1/src/assets/movix-logo.svg"
               alt="Logo" />
            </div>
            <ul className="menu-item">
              <li className="item hideOnMobile" onClick={() => {navigationHandler("movie")}}>Movies</li>
              <li className="item hideOnMobile" onClick={() => {navigationHandler("tv")}}>TV Shows</li>
              <li className="item item-search"
                onClick = {openSearchMenu}>
                <HiOutlineSearch/>
              </li>
              {mobileMenu ?
                <li className="item item-search"
                  onClick={closeMobileMenu}>
                  <HiOutlineX/>
                </li>
               :
                <li className="item item-search activeOnMobile"
                  onClick={openMobileMenu}>
                  <HiOutlineViewList />
                </li>
               }
            </ul>
        </ContentWrapper>
        {mobileMenu && 
        <ul className="menu-side-bar">
          <li onClick={() => {navigationHandler("movie")}} className="item">Movies</li>
          <li onClick={() => {navigationHandler("tv")}} className="item">TV Shows</li>
        </ul>}
        {searchMenu && 
        <div className="search-bar">
          <ContentWrapper>
            <div className="searchInput">
              <input type="search" placeholder='Search for a movie or TV show...'
                onChange = {(e) => setQuery(e.target.value)}
                onKeyUp={handleSearch}/>
              <li className="item item-search"
                  >
                  <HiOutlineX className='close-icon' onClick={closeSearchMenu}/>
              </li>
            </div>
          </ContentWrapper>
        </div>}
    </header>
  )
}
