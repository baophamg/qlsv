import React from 'react';
import { Helmet } from "react-helmet";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Create() {
    const navigate = useNavigate();
    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // dựa vào name của thẻ input
            name: '',
            number_of_credit: '',
            gender: ''
        },
        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Vui lòng nhập môn học'),
            number_of_credit: Yup.string()
                .required('Vui lòng nhập số tín chỉ'),

        }),
        // khi dữ liệu hợp lệ sẽ chạy code của onSubmit
        onSubmit: async values => {
            try {
                // JSON.stringify là hàm chuyển object thành chuỗi dạng json
                const response = await axios.post('http://api_qlsvk99.com/api/v1/subjects', JSON.stringify(values));
                const name = response.data.name;
                toast.success(`Đã thêm môn học ${name} thành công`);
                // tải lại toàn bộ trang - không mượt
                // window.location.href = '/';//về trang chủ (trang danh sách môn học)
                // điều hướng chỉ tải lại 1 phần trang web
                navigate('/subject');


            } catch (error) {
                toast.error(error.message);
            }

        }
    });
    return (
        <>
            <div>
                <Helmet>
                    <title>Thêm môn học | {process.env.REACT_APP_NAME} </title>
                </Helmet>
                <h1>Thêm môn học</h1>
                <form action="list.html" method="POST" onSubmit={formik.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input type="text" className="form-control" placeholder="Tên môn học" name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.name && formik.errors.name ?
                                            <div className="text-danger">{formik.errors.name}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Số tín chỉ</label>
                                    <input type="number" className="form-control" placeholder="Nhập số tín chỉ" name="number_of_credit" onChange={formik.handleChange} value={formik.values.number_of_credit} onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.number_of_credit && formik.errors.number_of_credit ?
                                            <div className="text-danger">{formik.errors.number_of_credit}</div> : null
                                    }
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-success" type="submit">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}
