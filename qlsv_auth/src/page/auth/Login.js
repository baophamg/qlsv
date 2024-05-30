import React from 'react';
import { useFormik } from 'formik';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { axiosNonAuthInstance } from '../../helper/util';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // dựa vào name của thẻ input
            email: '',
            password: '',
        },
        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .required('Vui lòng mật khẩu'),
        }),
        // khi dữ liệu hợp lệ sẽ chạy code của onSubmit
        onSubmit: async values => {
            try {
                // JSON.stringify là hàm chuyển object thành chuỗi dạng json
                const response = await axiosNonAuthInstance().post('/login', JSON.stringify(values));
                const action = {
                    type: 'LOGIN_SUCCESS',//thuộc tính type là phải có (quy định của redux),
                    // dữ liệu truyền đi, người ta hay dùng từ payload
                    payload: {
                        access_token: response.data.access_token,
                        loggedUser: response.data.user
                    }

                };
                dispatch(action);
                navigate('/');

            } catch (error) {
                toast.error('Sai email hoặc mật khẩu');
            }

        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                    {
                        formik.touched.email && formik.errors.email ?
                            <div className="text-danger">{formik.errors.email}</div> : null
                    }

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                    {
                        formik.touched.password && formik.errors.password ?
                            <div className="text-danger">{formik.errors.password}</div> : null
                    }
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    );
}
