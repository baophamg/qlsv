import axios from "axios";

// newParams là object
export const updateParam = (searchParams, setSearchParams, newParams) => {
    let params = {}
    // searchParams chứa param hiện tại trên thanh địa chỉ web
    for (const [key, value] of searchParams.entries()) {
        // key là tên param, value là giá trị của param đó
        // vd: page=2&search=ty thì tên param là page, giá trị là 2
        params[key] = value;
    }

    // thêm mới param, dùng es6 (spread)
    // searchParams = {page: 2, conga: 3}
    // newParams = {search: 'Ty', concho: 4}
    // params = {page: 2, conga: 3, search: 'Ty', concho: 4}
    params = { ...params, ...newParams };

    // cập nhật param trên thanh địa chỉ
    setSearchParams(params);
}

export const getAuthInfo = () => {
    const authInfo = localStorage.getItem('authInfo');
    let initialState;
    if (!authInfo) {
        initialState = { isLogin: false, access_token: null, loggedUser: null };
    }
    else {
        // chuyển ngược lại từ chuỗi thành object
        initialState = JSON.parse(authInfo);
    };
    return initialState;
}

export const axiosAuthInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `Bearer ${getAuthInfo().access_token}`
    }
})

export const axiosNonAuthInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL
})