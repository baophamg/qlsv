// newParams là object
// export const updateParam = (searchParams, setSearchParams, newParams) => {
//     const params = {};
//     // param cũ ở thanh địa chỉ web
//     for (const [key, value] of searchParams.entries()) {
//         // key là tên param, value là giá trị của param đó
//         // vd: page=2&search=ty thì tên param là page, giá trị là 2
//         params[key] = value;
//     }


//     // thêm mới param
//     for (const key in newParams) {
//         params[key] = newParams[key];
//     }
//     // params.search = search;
//     // cập nhật param trên thanh địa chỉ
//     setSearchParams(params);
// }


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