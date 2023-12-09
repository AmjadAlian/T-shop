import React, { useContext } from 'react'
import './profile.css'
import { UserContext } from '../context/UserContext.jsx'
import { Link } from 'react-router-dom';
export default function Profile() {

    let { userData } = useContext(UserContext);
    console.log(userData);
    return (
        <><div>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
            <div className="main-content">
                {/* Top navbar */}
                <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
                    <div className="container-fluid">
                        {/* Brand */}
                        <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">User profile</a>
                        {/* Form */}
                        <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                            <div className="form-group mb-0">
                                <div className="input-group input-group-alternative">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-search" /></span>
                                    </div>
                                    <input className="form-control" placeholder="Search" type="text" />
                                </div>
                            </div>
                        </form>
                        {/* User */}
                        <ul className="navbar-nav align-items-center d-none d-md-flex">
                            <li className="nav-item dropdown">
                                <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="media align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img alt="Image placeholder" src={userData?.image.secure_url} />
                                        </span>
                                        <div className="media-body ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm ps-2 font-weight-bold">{userData?.userName}</span>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                                    <div className=" dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </div>
                                    <a href="../examples/profile.html" className="dropdown-item">
                                        <i className="ni ni-single-02" />
                                        <span>My profile</span>
                                    </a>
                                    <a href="../examples/profile.html" className="dropdown-item">
                                        <i className="ni ni-settings-gear-65" />
                                        <span>Settings</span>
                                    </a>
                                    <a href="../examples/profile.html" className="dropdown-item">
                                        <i className="ni ni-calendar-grid-58" />
                                        <span>Activity</span>
                                    </a>
                                    <a href="../examples/profile.html" className="dropdown-item">
                                        <i className="ni ni-support-16" />
                                        <span>Support</span>
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a href="#!" className="dropdown-item">
                                        <i className="ni ni-user-run" />
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* Header */}
                <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: 600, backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    {/* Mask */}
                    <span className="mask bg-gradient-default opacity-8" />
                    {/* Header container */}
                    <div className="container-fluid d-flex align-items-center">
                        <div className="row">
                            <div className="col-lg-7 col-md-10 position-relative">
                                <h1 className="display-2 text-white ">Hello {userData?.userName}</h1>
                                <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                                <a href="#!" className="btn btn-info">Edit profile</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page content */}
                <div className="container-fluid mt--7">
                    <div className="row">
                        <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                            <div className="card card-profile shadow">
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 order-lg-2">
                                        <div className="card-profile-image">
                                            <a href="#">
                                                <img src={userData?.image.secure_url} className="rounded-circle" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                        <a href="#" className="btn btn-sm btn-info mr-4">Connect</a>
                                        <a href="#" className="btn btn-sm btn-default float-right">Message</a>
                                    </div>
                                </div>
                                <div className="card-body pt-0 pt-md-4">
                                    <div className="row">
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                <div>
                                                    <span className="heading">22</span>
                                                    <span className="description">Friends</span>
                                                </div>
                                                <div>
                                                    <span className="heading">10</span>
                                                    <span className="description">Photos</span>
                                                </div>
                                                <div>
                                                    <span className="heading">89</span>
                                                    <span className="description">Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3>
                                            {userData?.userName}<span className="font-weight-light">, 27</span>
                                        </h3>
                                        <div className="h5 font-weight-300">
                                            <i className="ni location_pin mr-2" />
                                        </div>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />Solution Manager - Creative Tim Officer
                                        </div>
                                        <div>
                                            <i className="ni education_hat mr-2" />University of Computer Science
                                        </div>
                                        <hr className="my-4" />
                                        <a href="#">Show more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 order-xl-1">
                            <div className="card bg-secondary shadow">
                                <div className="card-header bg-white border-0">
                                    <div className="row align-items-center">
                                        <div className="col-8 text-start">
                                            <h3 className="mb-0">My account</h3>
                                        </div>
                                        <div className="col-4 text-right text-end">
                                            <a href="#!" className="btn btn-sm btn-primary ">Settings</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">User information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6 mb-3">

                                                    <div className='text-start'>
                                                        <label className="form-control-label ">Username</label>
                                                        <div className=" form-control form-control-alternative text-start pb-3" >
                                                            <p>{userData?.userName}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="text-start">
                                                        <div>
                                                            <label className="form-control-label ">Email address</label>
                                                        </div>
                                                        <div className="form-control form-control-alternative text-start" >
                                                            <p> {userData?.email} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className=" text-start focused">
                                                        <label className="form-control-label" htmlFor="input-first-name">First name</label>
                                                        <div className="form-control form-control-alternative text-start "  > <p>{userData?.userName}</p></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className=" focused text-start">
                                                        <label className="form-control-label" htmlFor="input-last-name">Last name</label>
                                                        <div className="form-control form-control-alternative text-start" >
                                                            <p>
                                                                Unknown
                                                            </p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">Contact information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-md-12 mb-3">
                                                    <div className="text-start focused">
                                                        <label className="form-control-label" htmlFor="input-address ">Address</label>
                                                        <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" defaultValue="Your Address," type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="text-start focused">
                                                        <label className="form-control-label" htmlFor="input-city">City</label>
                                                        <input type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" defaultValue="Tulkarm" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="text-start focused">
                                                        <label className="form-control-label" htmlFor="input-country">Country</label>
                                                        <input type="text" id="input-country" className="form-control form-control-alternative" placeholder="Country" defaultValue="Palestine" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="text-start">
                                                        <label className="form-control-label" htmlFor="input-country">Postal code</label>
                                                        <input type="number" id="input-postal-code" className="form-control form-control-alternative" placeholder="Postal code" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Description */}
                                        <h6 className="heading-small text-muted mb-4">About me</h6>
                                        <div className="pl-lg-4">
                                            <div className="text-start focused">
                                                <label>About Me</label>
                                                <textarea rows={4} className="form-control form-control-alternative" placeholder="A few words about you ..." defaultValue={"A beautiful Dashboard for Bootstrap 5.3. It is Free and Open Source."} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}
