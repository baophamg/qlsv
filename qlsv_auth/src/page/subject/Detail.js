
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosAuthInstance } from '../../helper/util';
export function Detail() {
    // làm sao lấy được slug, ví dụ dan-3.html
    // từ slug mói tìm được id
    const { slug } = useParams();
    const parts = slug.split('.');
    const partOne = parts[0];

    const smallParts = partOne.split('-');
    // id là phần tử cuối cùng
    const id = smallParts[smallParts.length - 1];

    const [subject, setSubject] = useState(null);
    //call api đẩy lấy dữ liệu đỗ vào biến subject
    const getSubject = async () => {
        //cập nhật subject
        try {
            console.log(new Date());
            const response = await axiosAuthInstance().get(`/subjects/${id}`);
            setSubject(response.data);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getSubject();
        // eslint-disable-next-line
    }, [])



    return (
        <>
            <Helmet>
                <title>
                    Thông tin môn học {subject?.name || ''} | {process.env.REACT_APP_NAME}
                </title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Mã Môn học:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {/* kiểm tra xem có subject hok?. Nếu có thì lấy cái thuộc tính id ra */}
                            {subject?.id}
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
                            {subject?.name}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Số tín chỉ:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {subject?.number_of_credit}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
