import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ForgotSchema } from '../../auth/validate.js';
export default function ForgotPassword() {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
        code: ''
    };
    const onSubmit = async users => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, users);
        if (data.message == 'success') {
            formik.resetForm();
            toast.success(' Account Updated Successfully , Log In Now!', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/login');
        }
        
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: ForgotSchema,
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
        {
            title: 'code',
            id: 'code',
            type: 'text',
            name: 'code',
            value: formik.values.code
        },
    ];
    const renderInput = inputs.map((ele, index) =>
        <Input type={ele.type} key={index} name={ele.name} id={ele.id} value={ele.value} placeholder={ele.name} onChange={ele.onChange || formik.handleChange} errors={formik.errors} onBlur={formik.handleBlur} touched={formik.touched} />
    );
    return (
        <>
            <div className=" signUp vh-100 d-flex justify-content-center align-items-center">

                <div className="  signUp-form  ">
                    <h2 className='text-center mb-4'>Reset Password</h2>
                    <form onSubmit={formik.handleSubmit}>
                        {renderInput}
                        <button type='submit ' className="btn form-control" disabled={!formik.isValid}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
