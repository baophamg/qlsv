import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Create() {
    const navigate = useNavigate();
    const [studentOptions, setStudentOptions] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);

    useEffect(() => {
        getAllStudents();
        getAllSubjects();
    }, []);

    const getAllStudents = async () => {
        try {
            const response = await axios.get(`http://api_qlsvk99.com/api/v1/students?list=all`);
            setStudentOptions(response.data.items);
        }
        catch (error) {

            toast.error(error.message);
        }

    }

    const getAllSubjects = async () => {
        try {
            const response = await axios.get(`http://api_qlsvk99.com/api/v1/subjects?list=all`);
            setSubjectOptions(response.data.items);
        }
        catch (error) {

            toast.error(error.message);
        }

    }

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // dựa vào name của thẻ input
            student_id: '',
            subject_id: '',
        },
        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            student_id: Yup.string()
                .required('Vui lòng chọn sinh viên'),
            subject_id: Yup.string()
                .required('Vui lòng chọn môn học'),

        }),
        // khi dữ liệu hợp lệ sẽ chạy code của onSubmit
        onSubmit: async values => {
            try {
                // JSON.stringify là hàm chuyển object thành chuỗi dạng json
                const response = await axios.post('http://api_qlsvk99.com/api/v1/registers', JSON.stringify(values));
                const student_name = response.data.student_name;
                const subject_name = response.data.subject_name;
                toast.success(`Sinh viên ${student_name} đăng ký học môn ${subject_name} thành công`);
                // tải lại toàn bộ trang - không mượt
                // window.location.href = '/';//về trang chủ (trang danh sách đăng ký môn học)
                // điều hướng chỉ tải lại 1 phần trang web
                navigate('/register');


            } catch (error) {
                toast.error(error.message);
            }

        }
    });
    return (
        <>
            <div>
                <Helmet>
                    <title>Thêm đăng ký môn học | {process.env.REACT_APP_NAME} </title>
                </Helmet>
                <h1>Thêm đăng ký môn học</h1>
                <form action="#" method="POST" onSubmit={formik.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="student_id">Tên sinh viên</label>
                                    <select className="form-control" name="student_id" id="student_id" onChange={formik.handleChange} value={formik.values.student_id} onBlur={formik.handleBlur}>
                                        <option value="">Vui lòng chọn sinh viên</option>
                                        {
                                            studentOptions.map((option, index) =>
                                                <option key={index} value={option.id}>{option.id} - {option.name}</option>
                                            )
                                        }


                                    </select>
                                    {
                                        formik.touched.student_id && formik.errors.student_id ?
                                            <div className="text-danger">{formik.errors.student_id}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject_id">Tên môn học</label>
                                    <span id="load" className="text-primary" />
                                    <select className="form-control" name="subject_id" id="subject_id" onChange={formik.handleChange} value={formik.values.subject_id} onBlur={formik.handleBlur}>
                                        <option value="">Vui lòng chọn môn học</option>
                                        {
                                            subjectOptions.map((option, index) =>
                                                <option key={index} value={option.id}>{option.id} - {option.name}</option>
                                            )
                                        }
                                    </select>
                                    {
                                        formik.touched.subject_id && formik.errors.subject_id ?
                                            <div className="text-danger">{formik.errors.subject_id}</div> : null
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
