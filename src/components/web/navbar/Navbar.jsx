import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx';
import './navbar.css'
export default function Navbar() {
  const navigate = useNavigate();
  let { userToken, setUserToken, userData, setUserData, cartQuantity } = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate('/');
  }

  return (
    <>
      <nav className="navbar  navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <a className="navbar-brand" href="#">T Shop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="products">Products</Link>
              </li>
              {userToken ? <li className="nav-item ">
                <Link className="nav-link  cart position-relative" aria-current="page" to="/cart"><span className=''>{cartQuantity}</span>Cart</Link>
              </li> : null}
            </ul>
            <ul className="navbar-nav ">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData != null ? userData.userName : 'Guest'}
                </a>
                <ul className="dropdown-menu">
                  {userToken == null ? <>
                    <li><Link className="dropdown-item" to="/register">register</Link></li>
                    <li className="dropdown-divider"> </li>
                    <li><Link className="dropdown-item" to="/login">login</Link></li>
                  </> : <>
                    <li><Link className="dropdown-item" to="/profile">profile</Link></li>
                    <li className="dropdown-divider"> </li>
                    <li><Link className="dropdown-item" onClick={logout}>logout</Link></li></>}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
