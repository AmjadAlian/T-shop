import React, { useContext } from 'react'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import Input from '../../pages/Input.jsx';
import { OrderSchema } from '../../auth/validate.js';

export default function CreateOrder() {
    const navigate = useNavigate();
    let { userToken, cartQuantity, getProductQuantity } = useContext(UserContext);

    const initialValues = {
        couponName: '',
        address: '',
        phone: '',
    };

    const onSubmit = async users => {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`, users, { headers: { authorization: `Tariq__${userToken}` } });
        console.log(data);
        if (data.message == 'success') {
            toast.success(' Order Created Successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            getProductQuantity();
            navigate('/profile/orders');
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: OrderSchema,
    });
    const inputs = [
        {
            title: 'couponName',
            id: "couponName",
            type: 'text',
            name: 'couponName',
            value: formik.values.couponName
        },
        {
            title: 'address',
            id: 'address',
            type: 'address',
            name: 'address',
            value: formik.values.address,
        },
        {
            title: 'phone',
            id: 'phone',
            type: 'number',
            name: 'phone',
            value: formik.values.phone,
        },
    ];
    const renderInput = inputs.map((ele, index) =>
        <Input type={ele.type} key={index} name={ele.name} id={ele.id} value={ele.value} placeholder={ele.name} onChange={formik.handleChange} errors={formik.errors} onBlur={formik.handleBlur} touched={formik.touched} />
    );
    return (
        <>
            <div className=" signUp vh-100 d-flex justify-content-center align-items-center">
                <div className="  signUp-form">
                    <h2 className='text-center mb-4'>Create Order</h2>
                    <form onSubmit={formik.handleSubmit}>
                        {renderInput}
                        <button type='submit' className="btn form-control" disabled={!formik.isValid || cartQuantity == 0}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
