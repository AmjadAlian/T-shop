import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { sendCodeSchema } from '../../auth/validate.js';
export default function SendCode() {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
    };

    const onSubmit = async users => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, users);
        if (data.message == 'success') {
            toast.success(' Code Sent Successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/forgotpassword')
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: sendCodeSchema,
    });
    const inputs = [
        {
            title: 'email',
            id: "email",
            type: 'email',
            name: 'email',
            value: formik.values.email
        },
    ];
    const renderInput = inputs.map((ele, index) =>
        <Input type={ele.type} key={index} name={ele.name} id={ele.id} value={ele.value} placeholder={ele.name} onChange={formik.handleChange} errors={formik.errors} onBlur={formik.handleBlur} touched={formik.touched} />
    );
    return (
        <>
            <div className=" signUp vh-100 d-flex justify-content-center align-items-center">
                <div className="  signUp-form">
                    <h2 className='text-center mb-4'>Enter Your Email</h2>
                    <form onSubmit={formik.handleSubmit}>
                        {renderInput}
                        <button type='submit' className="btn form-control" disabled={!formik.isValid}>Send</button>
                    </form>

                </div>
            </div>
        </>
    )
}
