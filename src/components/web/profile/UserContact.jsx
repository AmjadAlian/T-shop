import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx';

export default function UserContact() {
    let { userData, loading } = useContext(UserContext);

    if (loading) {
        return <h2>... loading</h2>
    }
    console.log(userData)
    return (
        <>
            <div className="contact">
                <div className="user-data">
                    <div className="">
                        <div className="">

                            <div className="">
                                <div className="card bg-secondar border0 shadow">
                                    <div className="card-header bg-white">
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
