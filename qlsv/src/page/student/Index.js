import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentList from '../../component/StudentList';
import Loading from '../../component/Loading';
import { toast } from 'react-toastify';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Pagination from '../../component/Pagination';
import Search from '../../component/Search';
import { updateParam } from '../../helper/util';

export default function Index() {
    // trạng thái lưu dữ liệu danh sách sinh viên từ api gởi về
    const [items, setItems] = useState([]);
    //trạng thái để biết dữ liệu đã về chưa
    const [isLoaded, setIsLoaded] = useState(false);

    const [pagination, setPagination] = useState({ page: 1, totalPage: 0 });
    const [totalItem, setTotalItem] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    // searchParams.get('page') có giá trị thì trả về searchParams.get('page'), ngược lại trả về số 1
    // true || ... => true
    // false || ... => ...
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    //code trong useEffect sẽ chạy 1 lần đầu tiên
    // khi page thay đổi thì code trong useEffect(() => {...}) sẽ chạy lại
    useEffect(() => {
        getStudents();
        // eslint-disable-next-line
    }, [page, search]);

    const handlePage = (page) => {
        // ví page = 3 => ?page=3
        setPage(page);

        const newParams = {
            page: page,
        }
        updateParam(searchParams, setSearchParams, newParams);
    }

    const handleSearch = (e, search) => {
        console.log(search);
        e.preventDefault();//ngăn mặc định, không cho submit lên server 
        // ví search = Tý => &search=Tý
        setSearch(search);
        setPage(1);//reset page, để call lại đúng tham số api
        // cập nhật param trên đường dẫn của trang web
        // setSearchParams({ search: search });

        // forof
        // lấy tất cả các param ra, rồi cập nhật cho mỗi thằng search, 
        // sau đó dùng hàm setSearchParams() để cập nhật lên đường dẫn web
        const newParams = {
            page: 1,
            search: search
        }
        updateParam(searchParams, setSearchParams, newParams);

    }

    // luật bên trong hàm là await thì hàm phải dùng async
    // mỗi khi page thay đổi thì getStudents() phải chạy lại
    const getStudents = async () => {
        //call api để lấy dữ liệu về , sau khi dữ liệu lấy bỏ vào biến items
        try {
            console.log(new Date());
            const response = await axios.get(`http://api_qlsvk99.com/api/v1/students?page=${page}&search=${search}`);
            setItems(response.data.items);
            setPagination(response.data.pagination);
            setIsLoaded(true);
            setTotalItem(response.data.totalItem);
        }
        catch (error) {
            console.log(error);
            setIsLoaded(true);
            toast.error(error.message);
        }
    }

    const handleConfirmDialog = async (currentId) => {
        try {
            const response = await axios.delete(`http://api_qlsvk99.com/api/v1/students/${currentId}`);
            getStudents();
            toast.success(response.data);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div>
                <Helmet>
                    <title>
                        Danh sách sinh viên | {process.env.REACT_APP_NAME}
                    </title>
                </Helmet>
                <h1>Danh sách sinh viên</h1>
                <NavLink to="/create" className="btn btn-info">Add</NavLink>
                <Search handleSearch={handleSearch} search={search} />
                {
                    !isLoaded ? <Loading /> : <StudentList items={items} handleConfirmDialog={handleConfirmDialog} />
                }

                <div>
                    <span>Số lượng: {totalItem}</span>
                </div>
                <Pagination pagination={pagination} handlePage={handlePage} />
            </div>

        </>
    );
}
