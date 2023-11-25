import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { registerSchema } from '../../auth/validate.js';
import { toast } from 'react-toastify';

import axios from 'axios';
export default function Register() {
    const initialValues = {
        userName: '',
        email: '',
        password: '',
        image: ''
    };
    const handelFieldChange = (event) => {
        console.log(event);
        formik.setFieldValue('image', event.target.files[0]);
    }
    const onSubmit = async users => {
        const formData = new FormData();
        formData.append('userName', users.userName);
        formData.append('email', users.email);
        formData.append('password', users.password);
        formData.append('image', users.image);
        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`, formData);
        if (data.message == 'success') {
            formik.resetForm();
            toast.success(' Account Created Successfully , Verify Your Email!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        console.log(data);

    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema,

    });
    const inputs = [
        {
            title: 'user name',
            id: 'username',
            type: 'text',
            name: 'userName',
            value: formik.values.userName
        },
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
            title: 'image',
            id: 'image',
            type: 'file',
            name: 'image',
            onChange: handelFieldChange,

        },

    ];
    const renderInput = inputs.map((ele, index) =>
        <Input type={ele.type}  key={index} name={ele.name} id={ele.id} value={ele.value} placeholder = {ele.name} onChange={ele.onChange || formik.handleChange} errors={formik.errors} onBlur={formik.handleBlur} touched={formik.touched} />
    );
    return (
        <>
            <div className=" signUp">
                
                <div className="  signUp-form m-auto mt-5">
                <h2 className='text-center mb-4'>Sign Up</h2>
                    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                        {renderInput}
                        <button type='submit ' className="btn form-control" disabled={!formik.isValid}>Sign Up</button>
                    </form>
                </div>

            </div>
        </>
    )
}
