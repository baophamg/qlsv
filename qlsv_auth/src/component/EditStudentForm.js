import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function EditStudentForm({ student, handleUpdate }) {
    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // dựa vào name của thẻ input
            name: student.name,
            birthday: student.birthday,
            gender: student.gender
        },
        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Vui lòng nhập họ và tên'),
            birthday: Yup.string()
                .required('Vui lòng chọn ngày sinh'),
            gender: Yup.string()
                .required('Vui lòng chọn giới tính')

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
                                <label>Tên</label>
                                <input type="text" className="form-control" placeholder="Tên của bạn" required name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.name && formik.errors.name ?
                                        <div className="text-danger">{formik.errors.name}</div> : null
                                }
                            </div>
                            <div className="form-group">
                                <label>Birthday</label>
                                <input type="date" className="form-control" placeholder="Ngày sinh của bạn" required name="birthday" onChange={formik.handleChange} value={formik.values.birthday} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.birthday && formik.errors.birthday ?
                                        <div className="text-danger">{formik.errors.birthday}</div> : null
                                }
                            </div>
                            <div className="form-group">
                                <label>Chọn Giới tính</label>
                                <select className="form-control" id="gender" name="gender" onChange={formik.handleChange} value={formik.values.gender} onBlur={formik.handleBlur}>
                                    <option value=""></option>
                                    <option value="nam">Nam</option>
                                    <option value="nữ" >Nữ</option>
                                    <option value="khác">Khác</option>
                                </select>
                                {
                                    formik.touched.gender && formik.errors.gender ?
                                        <div className="text-danger">{formik.errors.gender}</div> : null
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
