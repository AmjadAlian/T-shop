import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { logInSchema } from '../../auth/validate.js';
import { UserContext } from '../context/UserContext.jsx';
export default function Login() {
    const navigate = useNavigate();
    let { setUserToken, userToken } = useContext(UserContext);
    if (userToken) {
        navigate(-1);
    }
    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = async users => {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, users);
        
        if (data.message == 'success') {
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token);
            toast.success(' Log In Successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/')
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: logInSchema,
    });
    const inputs = [
        {
            title: 'email',
            id: "email",
            type: 'email',
            name: 'email',
            value: formik.values.email
        },
        {
            title: 'password',
            id: 'password',
            type: 'password',
            name: 'password',
            value: formik.values.password,
        },


    ];
    const renderInput = inputs.map((ele, index) =>
        <Input type={ele.type} key={index} name={ele.name} id={ele.id} value={ele.value} placeholder={ele.name} onChange={formik.handleChange} errors={formik.errors} onBlur={formik.handleBlur} touched={formik.touched} />
    );
    return (
        <>
            <div className=" signUp vh-100 d-flex justify-content-center align-items-center">
                <div className="  signUp-form">
                    <h2 className='text-center mb-4'>Sign In</h2>
                    <form onSubmit={formik.handleSubmit}>
                        {renderInput}
                        <div className="reset-password mb-4 ">
                        <Link to={'/sendcode'}>Reset Password ?</Link>
                        </div>
                        <button type='submit' className="btn form-control" disabled={!formik.isValid}>Sign In</button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}
