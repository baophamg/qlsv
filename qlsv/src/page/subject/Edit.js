import { Helmet } from 'react-helmet';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import EditSubjectForm from '../../component/EditSubjectForm';
import Loading from '../../component/Loading';

export function Edit() {
    const navigate = useNavigate();
    //trạng thái để biết dữ liệu đã về chưa
    const [isLoaded, setIsLoaded] = useState(false);

    // làm sao lấy được slug, ví dụ dan-3.html
    // từ slug mói tìm được id
    const { slug } = useParams();
    const parts = slug.split('.');
    const partOne = parts[0];

    const smallParts = partOne.split('-');
    // id là phần tử cuối cùng
    const id = smallParts[smallParts.length - 1];

    const [subject, setSubject] = useState(null);
    const getSubject = async () => {
        //cập nhật subject
        try {
            const response = await axios.get(`http://api_qlsvk99.com/api/v1/subjects/${id}`);
            setSubject(response.data);
            setIsLoaded(true);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getSubject();
        // eslint-disable-next-line
    }, []);

    const handleUpdate = async (values) => {
        try {
            const response = await axios.put(`http://api_qlsvk99.com/api/v1/subjects/${id}`, JSON.stringify(values));
            toast.success(`Đã cập nhật môn học ${response.data.name} thành công`);
            //Trở về trang danh sách môn học
            navigate('/subject');

        }
        catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    }
    return (
        <>
            <Helmet>
                <title>
                    ... | {process.env.REACT_APP_NAME}
                </title>
            </Helmet>
            <div>
                <h1>Chỉnh sửa môn học</h1>
                {
                    isLoaded ? <EditSubjectForm subject={subject} handleUpdate={handleUpdate} /> : <Loading />
                }

            </div>

        </>
    );
}
