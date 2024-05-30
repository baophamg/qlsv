import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function EditRegisterForm({ register, handleUpdate }) {
    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // dựa vào name của thẻ input
            score: register.score,
        },
        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            score: Yup.number()
                .required('Vui lòng nhập điểm')
                .min(0, 'Vui lòng nhập số lớn hơn hoặc bằng 0')
                .max(10, 'Vui lòng nhập số nhỏ hơn hoặc bằng 10')
        }),
        // khi dữ liệu hợp lệ sẽ chạy code của onSubmit
        onSubmit: async values => {
            handleUpdate(values);
        }
    });
    return (
        <>
            <form action="#" method="POST" onSubmit={formik.handleSubmit}>

                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                <label>Tên sinh viên: </label>
                                <span>{register.student_name}</span>
                            </div>
                            <div className="form-group">
                                <label>Tên môn học: </label>
                                <span>{register.subject_name}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="score">Điểm</label>
                                <input type="text" name="score" id="score" onChange={formik.handleChange} value={formik.values.score} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.score && formik.errors.score ?
                                        <div className="text-danger">{formik.errors.score}</div> : null
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success" type="submit">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    );
}
