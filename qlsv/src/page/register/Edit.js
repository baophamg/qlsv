import { Helmet } from 'react-helmet';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import EditRegisterForm from '../../component/EditRegisterForm';
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

    const [register, setRegister] = useState(null);
    const getRegister = async () => {
        //cập nhật register
        try {
            const response = await axios.get(`http://api_qlsvk99.com/api/v1/registers/${id}`);
            setRegister(response.data);
            setIsLoaded(true);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getRegister();
        // eslint-disable-next-line
    }, []);

    const handleUpdate = async (values) => {
        try {
            const response = await axios.put(`http://api_qlsvk99.com/api/v1/registers/${id}`, JSON.stringify(values));
            const student_name = response.data.student_name;
            const subject_name = response.data.subject_name;
            const score = response.data.score;
            toast.success(`Sinh viên ${student_name} thi môn ${subject_name} được ${score} điểm`);
            //Trở về trang danh sách đăng ký môn học
            navigate('/register');

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
                <h1>Chỉnh sửa đăng ký môn học</h1>
                {
                    isLoaded ? <EditRegisterForm register={register} handleUpdate={handleUpdate} /> : <Loading />
                }

            </div>

        </>
    );
}
