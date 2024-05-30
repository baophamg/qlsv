
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosAuthInstance } from '../../helper/util';
export default function Detail() {
    // làm sao lấy được slug, ví dụ dan-3.html
    // từ slug mói tìm được id
    const { slug } = useParams();
    const parts = slug.split('.');
    const partOne = parts[0];

    const smallParts = partOne.split('-');
    // id là phần tử cuối cùng
    const id = smallParts[smallParts.length - 1];

    const [student, setStudent] = useState(null);
    //call api đẩy lấy dữ liệu đỗ vào biến student
    const getStudent = async () => {
        //cập nhật student
        try {
            console.log(new Date());
            const response = await axiosAuthInstance().get(`/students/${id}`);
            setStudent(response.data);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getStudent();
        // eslint-disable-next-line
    }, [])



    return (
        <>
            <Helmet>
                <title>
                    Thông tin sinh viên {student?.name || ''} | {process.env.REACT_APP_NAME}
                </title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Mã SV:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {/* kiểm tra xem có student hok?. Nếu có thì lấy cái thuộc tính id ra */}
                            {student?.id}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Tên:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {student?.name}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Ngày sinh:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {student?.birthday}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Giới tính:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {student?.gender}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
