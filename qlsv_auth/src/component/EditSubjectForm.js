import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function EditSubjectForm({ subject, handleUpdate }) {
    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // dựa vào name của thẻ input
            name: subject.name,
            number_of_credit: subject.number_of_credit,
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
                                <input type="text" className="form-control" placeholder="Tên môn học" required name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.name && formik.errors.name ?
                                        <div className="text-danger">{formik.errors.name}</div> : null
                                }
                            </div>
                            <div className="form-group">
                                <label>Số tín chỉ</label>
                                <input type="number" className="form-control" placeholder="Nhập số tín chỉ" required name="number_of_credit" onChange={formik.handleChange} value={formik.values.number_of_credit} onBlur={formik.handleBlur} />
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
        </>
    );
}
